import { z } from "zod";

export const AuthInput = z.object({
    username: z.string().min(3, "Username must be atleast 3 characters!"),
    password: z.string().min(8, "Password must be atleast 8 characters!")
});
