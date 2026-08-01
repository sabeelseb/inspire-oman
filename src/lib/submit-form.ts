export type SubmissionType = "contact" | "partner" | "summit" | "message";

export async function submitToAdmin(
  type: SubmissionType,
  data: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...data }),
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      return { ok: false, error: json.error || "Submission failed." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
