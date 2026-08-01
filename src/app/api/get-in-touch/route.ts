import { NextResponse } from "next/server";
import {
  asString,
  createInCollection,
  requireNameEmail,
} from "@/lib/create-submission";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { name, email, error } = requireNameEmail(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const doc = await createInCollection("get-in-touch", {
      name,
      email,
      phone: asString(body.phone, 80) || undefined,
      subject: asString(body.subject, 300) || undefined,
      message: asString(body.message, 8000) || undefined,
      status: "new",
    });

    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("Get in Touch submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 }
    );
  }
}
