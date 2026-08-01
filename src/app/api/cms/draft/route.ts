import { NextResponse } from "next/server";
import { commitDraft, guardLocalCmsAction } from "@/lib/cms-git";

export async function POST() {
  const blocked = guardLocalCmsAction();
  if (blocked) return blocked;

  try {
    const result = await commitDraft("CMS draft: content updates (not published).");
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: err instanceof Error ? err.message : "Failed to save draft.",
      },
      { status: 500 }
    );
  }
}
