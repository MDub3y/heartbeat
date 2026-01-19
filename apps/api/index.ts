import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prismaClient } from "store/client";
import { AuthInput } from "./types";
import { authMiddleware, errorHandler, validate } from "./middleware";
import { z } from "zod";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
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

app.post("/user/signup", validate(AuthInput), async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await prismaClient.user.findFirst({
        where: { username }
    });

    if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
        data: { username, password: hashedPassword }
    });

    res.status(201).json({ id: user.id });
});

app.post("/user/signin", validate(AuthInput), async (req, res) => {
    const { username, password } = req.body;

    const user = await prismaClient.user.findFirst({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "24h"
    });

    res.json({ jwt: token });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API Running on port ${PORT}`);
});