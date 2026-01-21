import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { prismaClient } from "store/client";
import { authMiddleware, errorHandler, validate } from "./middleware";
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

app.post("/website", authMiddleware, validate(WebsiteSchema), async (req, res) => {
    const website = await prismaClient.website.create({
        data: {
            url: req.body.url,
            time_added: new Date(),
            user_id: req.userId!
        }
    });

    res.status(201).json({ id: website.id });
});

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
    const website = await prismaClient.website.findFirst({
        where: {
            user_id: req.userId,
            id: req.params.websiteId,
        },
        include: {
            ticks: {
                orderBy: { createdAt: 'desc' },
                take: 5
            }
        }
    });

    if (!website) {
        res.status(404).json({ message: "Website not found" });
        return;
    }

    res.json({
        url: website.url,
        id: website.id,
        ticks: website.ticks
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});