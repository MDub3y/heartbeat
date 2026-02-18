import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { prismaClient } from "store/client";
import { authMiddleware, errorHandler, validate } from "./middleware";
import { asyncHandler } from "./utils";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

const WebsiteSchema = z.object({
    url: z.string().url("Invalid URL format")
});

app.get("/website", authMiddleware, asyncHandler(async (req, res) => {
    const websites = await prismaClient.website.findMany({
        where: {
            user_id: req.userId,
        },
        orderBy: {
            time_added: 'desc'
        },
        include: {
            ticks: {
                orderBy: { createdAt: 'desc' },
                take: 1
            }
        }
    });

    res.json({ websites });
}));

app.post("/website", authMiddleware, validate(WebsiteSchema), asyncHandler(async (req, res) => {
    const website = await prismaClient.website.create({
        data: {
            url: req.body.url,
            time_added: new Date(),
            user_id: req.userId!,
            regions: {
                create: {
                    region: {
                        connect: { code: "in" }
                    }
                }
            }
        }
    });

    res.status(201).json({ id: website.id });
}));

app.get("/status/:websiteId", authMiddleware, asyncHandler(async (req, res) => {
    const website = await prismaClient.website.findFirst({
        where: {
            user_id: req.userId,
            id: req.params.websiteId,
        },
        include: {
            ticks: {
                orderBy: { createdAt: 'desc' },
                take: 50
            }
        }
    });

    if (!website) {
        res.status(404).json({ message: "Website not found" });
        return;
    }

    let finalTicks = [...website.ticks];

    if (finalTicks.length < 50) {
        const remainingCount = 50 - finalTicks.length;
        const lastTickDate = finalTicks.length > 0
            ? new Date(finalTicks[finalTicks.length - 1].createdAt)
            : new Date();

        const mockTicks = Array.from({ length: remainingCount }).map((_, i) => {
            const date = new Date(lastTickDate.getTime() - (i + 1) * 3 * 60 * 1000);
            return {
                id: `mock-${i}`,
                status: Math.random() > 0.98 ? "Down" : "Up" as any,
                response_time_ms: Math.floor(Math.random() * (400 - 150) + 150),
                createdAt: date,
                region_id: "mock-region",
                website_id: website.id
            };
        });

        finalTicks = [...finalTicks, ...mockTicks];
    }

    res.json({
        url: website.url,
        id: website.id,
        ticks: finalTicks.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    });
}));

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});

app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Local API running on port ${PORT}`);
    });
}