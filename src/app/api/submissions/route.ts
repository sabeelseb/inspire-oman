import { NextResponse } from "next/server";

/**
 * Back-compat shim: older clients POSTed `{ type, ... }` to /api/submissions.
 * New forms hit dedicated endpoints; this forwards by type.
 */
const TARGET: Record<string, string> = {
  contact: "/api/get-in-touch",
  message: "/api/get-in-touch",
  summit: "/api/summit-registrations",
  partner: "/api/partner-applications",
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const type = typeof body.type === "string" ? body.type.trim() : "";
    const path = TARGET[type];
    if (!path) {
      return NextResponse.json({ error: "Invalid submission type." }, { status: 400 });
    }

    const { type: _ignored, ...rest } = body;
    const url = new URL(path, req.url);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });
    const json = await res.json().catch(() => ({}));
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.error("Legacy submissions forward failed:", err);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 }
    );
  }
}
