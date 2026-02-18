import { Redis } from "@upstash/redis";

export const client = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    enableAutoPipelining: false,
});

type WebsiteEvent = { url: string; id: string; region_code: string; };

const getStreamName = (regionCode: string) => `betteruptime:website:${regionCode}`;

export async function xAddBulk(websites: WebsiteEvent[]) {
    const promises = websites.map((w) => {
        const streamKey = getStreamName(w.region_code);
        return client.xadd(streamKey, '*', {
            url: w.url,
            id: w.id,
            region_code: w.region_code
        });
    });

    await Promise.all(promises);
}

export async function xReadGroup(regionCode: string, workerId: string) {
    const streamKey = getStreamName(regionCode);
    const consumerGroup = `group-${regionCode}`;

    try {
        const idsToTry = ["0", ">"];

        for (const id of idsToTry) {
            const response = await client.xreadgroup(
                consumerGroup,
                workerId,
                streamKey,
                id,
                { count: 1 }
            );

            if (!response || response.length === 0) continue;

            const streamData = response[0] as unknown as [string, [string, Record<string, any>][]];
            if (!streamData || !streamData[1] || streamData[1].length === 0) continue;

            const messages = streamData[1];

            const validMessages = messages.map((msg: any) => {
                const messageId = msg[0];
                const rawData = msg[1];

                const messageObj: any = {};
                for (let i = 0; i < rawData.length; i += 2) {
                    messageObj[rawData[i]] = rawData[i + 1];
                }

                return { id: messageId, message: messageObj };
            }).filter((item: any) => item.message.url && item.message.id);

            console.log(`\n✅ Redis: Found ${messages.length} msgs, ${validMessages.length} valid.`);

            if (validMessages.length === 0 && messages.length > 0) {
                // @ts-ignore
                await client.xack(streamKey, consumerGroup, ...messages.map(m => m[0]));
                continue;
            }

            if (validMessages.length > 0) return validMessages as { id: string, message: { url: string, id: string, region_code: string; }; }[];
        }

        return null;
    } catch (e) {
        return null;
    }
}

export async function xAckBulk(regionCode: string, eventIds: string[]) {
    if (eventIds.length === 0) return;
    const streamKey = getStreamName(regionCode);
    const consumerGroup = `group-${regionCode}`;

    // @ts-ignore: Spread operator is valid at runtime
    await client.xack(streamKey, consumerGroup, ...eventIds);
}