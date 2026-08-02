import { NextResponse } from "next/server";
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { isKeystaticEnabled } from "@/lib/cms-flags";

const handler = makeRouteHandler({ config });

async function guard(method: "GET" | "POST", request: Request) {
  if (!isKeystaticEnabled()) {
    return NextResponse.json(
      { error: "Keystatic is disabled in this environment. Use /admin (Payload)." },
      { status: 404 }
    );
  }
  return handler[method](request as never);
}

export async function GET(request: Request) {
  return guard("GET", request);
}

export async function POST(request: Request) {
  return guard("POST", request);
}
