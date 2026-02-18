import { prismaClient } from "store/client";
import { xAddBulk } from "redisstream/client";

const RETRY_DELAY = 5000;
const MAX_RETRIES = 12;

async function waitForDatabase() {
    console.log("🏥 Pusher: Checking Database Health...");

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            await prismaClient.$queryRaw`SELECT 1`;
            console.log("✅ Pusher: Database connected!");
            return true;
        } catch (e) {
            console.warn(`⏳ Pusher waiting for DB... (${i + 1}/${MAX_RETRIES})`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
    return false;
}

async function main() {
    console.log("🚀 Pusher cycle starting...");

    try {
        const websites = await prismaClient.website.findMany({
            select: {
                url: true,
                id: true,
                regions: {
                    select: {
                        region: {
                            select: { code: true }
                        }
                    }
                }
            }
        });

        const jobs = websites.flatMap(site =>
            site.regions.map(r => ({
                url: site.url,
                id: site.id,
                region_code: r.region.code
            }))
        );

        if (jobs.length > 0) {
            await xAddBulk(jobs);
            console.log(`✅ Queued ${jobs.length} checks.`);
        } else {
            console.log(" No websites found to check.");
        }
    } catch (error) {
        console.error("❌ Pusher Cycle Error:", error);
    }
}

// 🏁 Startup Logic
(async () => {
    const isDbReady = await waitForDatabase();

    if (!isDbReady) {
        console.error("💀 CRITICAL: Could not connect to DB. Exiting.");
        process.exit(1);
    }

    // Run immediately once healthy
    await main();

    // Schedule the loop (3 minutes)
    setInterval(async () => {
        await main();
    }, 3 * 60 * 1000);
})();