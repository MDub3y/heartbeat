import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../../packages/store/index.js";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),

  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001",

  trustedOrigins: [
    "http://localhost:3000",
    ...(process.env.VERCEL_URL
      ? [`https://${process.env.VERCEL_URL}`]
      : [])
  ],

  secret: process.env.BETTER_AUTH_SECRET,
});