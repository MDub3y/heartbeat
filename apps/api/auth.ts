import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "store/client";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  advanced: {
    cookies: {
      session_token: {
        attributes: {
          sameSite: "None",
          secure: true,
          httpOnly: true,
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
    "https://your-custom-domain.com"
  ],

  secret: process.env.BETTER_AUTH_SECRET,
});