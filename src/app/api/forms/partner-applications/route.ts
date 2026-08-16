import { NextResponse } from "next/server";
import {
  asString,
  createInCollection,
  requireNameEmail,
} from "@/lib/create-submission";
import {
  assertBodyWithinLimit,
  clientIp,
  rateLimit,
} from "@/lib/rate-limit";

const MAX_BODY = 32_768;
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 5;

/** Public form endpoint — kept off `/api/partner-applications` so Payload admin REST works. */
export async function POST(req: Request) {
  try {
    const tooBig = assertBodyWithinLimit(req, MAX_BODY);
    if (tooBig) {
      return NextResponse.json({ error: tooBig }, { status: 413 });
    }

    const ip = clientIp(req);
    const limited = rateLimit(`forms:partner:${ip}`, LIMIT, WINDOW_MS);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const body = (await req.json()) as Record<string, unknown>;
    const { name, email, error } = requireNameEmail(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const doc = await createInCollection("partner-applications", {
      name,
      email,
      phone: asString(body.phone, 80) || undefined,
      companyName: asString(body.companyName, 300) || undefined,
      contactPerson: asString(body.contactPerson, 200) || undefined,
      designation: asString(body.designation, 200) || undefined,
      address: asString(body.address, 1000) || undefined,
      tier: asString(body.tier, 200) || undefined,
      paymentMethod: asString(body.paymentMethod, 200) || undefined,
      message: asString(body.message, 8000) || undefined,
      status: "new",
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("Partner application failed:", err instanceof Error ? err.message : "error");
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 },
    );
  }
}
