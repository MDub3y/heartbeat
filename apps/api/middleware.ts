import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import { ZodSchema } from "zod";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // This helper converts Express headers to standard Fetch headers for Better Auth
        const headers = fromNodeHeaders(req.headers);

        const session = await auth.api.getSession({
            headers: headers,
        });

        if (!session) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Attach the user ID from the session
        req.userId = session.user.id;
        next();
    } catch (e) {
        console.error("Auth Error:", e);
        res.status(500).json({ message: "Internal Server Error during auth" });
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