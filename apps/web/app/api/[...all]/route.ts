/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "api";
import { NextRequest } from "next/server";
import { createServer } from "http";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return handle(req);
}
export async function POST(req: NextRequest) {
  return handle(req);
}
export async function PUT(req: NextRequest) {
  return handle(req);
}
export async function DELETE(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  const server = createServer(app);
  return new Promise((resolve) => {
    server.emit("request", req as any, resolve as any);
  });
}
