import { NextResponse } from "next/server";
import { guardLocalCmsAction, publishLive } from "@/lib/cms-git";

export async function POST() {
  const blocked = guardLocalCmsAction();
  if (blocked) return blocked;

  try {
    const result = await publishLive();
    return NextResponse.json(result, { status: result.ok ? 200 : 500 });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        message: err instanceof Error ? err.message : "Failed to publish.",
      },
      { status: 500 }
    );
  }
}
