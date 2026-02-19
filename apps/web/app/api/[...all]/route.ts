/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "api";
import { NextRequest } from "next/server";
import { createServer } from "http";
import { Readable } from "stream";

export const runtime = "nodejs";

async function runExpress(req: NextRequest): Promise<Response> {
  return new Promise((resolve, reject) => {
    const server = createServer((nodeReq, nodeRes) => {
      const chunks: Buffer[] = [];

      nodeRes.on("data", (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      nodeRes.on("end", () => {
        const body = Buffer.concat(chunks);

        resolve(
          new Response(body, {
            status: nodeRes.statusCode || 200,
            headers: nodeRes.getHeaders() as HeadersInit,
          })
        );
      });

      app(nodeReq, nodeRes);
    });

    const bodyStream =
      req.body ? Readable.fromWeb(req.body as any) : undefined;

    const nodeReq: any = {
      method: req.method,
      url: req.nextUrl.pathname + req.nextUrl.search,
      headers: Object.fromEntries(req.headers),
    };

    server.emit("request", nodeReq, bodyStream);
  });
}

export async function GET(req: NextRequest) {
  return runExpress(req);
}
export async function POST(req: NextRequest) {
  return runExpress(req);
}
export async function PUT(req: NextRequest) {
  return runExpress(req);
}
export async function DELETE(req: NextRequest) {
  return runExpress(req);
}
