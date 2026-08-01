import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

const ALLOWED_TYPES = new Set(["contact", "partner", "summit", "message"]);

function asString(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const type = asString(body.type, 40);
    if (!ALLOWED_TYPES.has(type)) {
      return NextResponse.json({ error: "Invalid submission type." }, { status: 400 });
    }

    const email = asString(body.email, 320);
    const name =
      asString(body.name, 200) ||
      asString(body.contactPerson, 200) ||
      asString(body.companyName, 200);

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Name and a valid email are required." },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "submissions",
      data: {
        type: type as "contact" | "partner" | "summit" | "message",
        name,
        email,
        phone: asString(body.phone, 80) || undefined,
        subject: asString(body.subject, 300) || undefined,
        message: asString(body.message, 8000) || undefined,
        organization: asString(body.organization, 300) || undefined,
        companyName: asString(body.companyName, 300) || undefined,
        contactPerson: asString(body.contactPerson, 200) || undefined,
        designation: asString(body.designation, 200) || undefined,
        address: asString(body.address, 1000) || undefined,
        tier: asString(body.tier, 200) || undefined,
        paymentMethod: asString(body.paymentMethod, 200) || undefined,
        role: asString(body.role, 200) || undefined,
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("Submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 }
    );
  }
}
