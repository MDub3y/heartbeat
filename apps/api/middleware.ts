import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodSchema } from "zod";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const token = header.split(" ")[1] || header;
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        req.userId = decoded.sub as string;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors
        });
        return;
    }
    req.body = result.data;
    next();
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
};