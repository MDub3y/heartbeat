import axios from "axios";
import { xAckBulk, xReadGroup } from "redisstream/client";
import { prismaClient } from "store/client";

const REGION_CODE = process.env.REGION_CODE?.toLowerCase()!;
// const WORKER_ID = process.env.WORKER_ID || `worker-local-${REGION_CODE}`;
const WORKER_ID = `worker-fresh-start`;

if (!REGION_CODE) {
    throw new Error("REGION_CODE not provided (e.g. 'in', 'us')");
}

async function waitForDatabase() {
    console.log(`🏥 Worker (${REGION_CODE}): Checking Database Health...`);
    for (let i = 0; i < 10; i++) {
        try {
            await prismaClient.$queryRaw`SELECT 1`;
            console.log("✅ Worker: Database connected!");
            return true;
        } catch (e) {
            console.log(`⏳ Worker waiting for DB...`);
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    return false;
}

async function main() {
    const isDbReady = await waitForDatabase();
    if (!isDbReady) {
        console.error("💀 Worker could not connect to DB. Exiting.");
        process.exit(1);
    }

    console.log(`Worker started for region: ${REGION_CODE}`);

    const regionDb = await prismaClient.region.findUnique({
        where: { code: REGION_CODE }
    });

    if (!regionDb) throw new Error(`Region ${REGION_CODE} not found in DB`);

    while (true) {
        try {
            process.stdout.write(".");
            const response = await xReadGroup(REGION_CODE, WORKER_ID);

            if (!response || response.length === 0) {

                await new Promise(r => setTimeout(r, 1000));
                continue;
            }

            console.log(`Processing ${response.length} jobs...`);

            const promises = response.map(({ message }) =>
                fetchWebsite(message.url, message.id, regionDb.id)
            );

            await Promise.all(promises);

            await xAckBulk(REGION_CODE, response.map(({ id }) => id));

        } catch (error) {
            console.error("Worker Loop Error:", error);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}

async function fetchWebsite(url: string, websiteId: string, regionDbId: string) {
    const startTime = Date.now();
    try {
        await axios.get(url, { timeout: 5000 });
        const endTime = Date.now();

        await prismaClient.website_tick.create({
            data: {
                response_time_ms: endTime - startTime,
                status: "Up",
                region_id: regionDbId,
                website_id: websiteId
            }
        });
    } catch (e) {
        const endTime = Date.now();
        await prismaClient.website_tick.create({
            data: {
                response_time_ms: endTime - startTime,
                status: "Down",
                region_id: regionDbId,
                website_id: websiteId
            }
        });
    }
}

main();