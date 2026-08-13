export type SubmissionKind = "contact" | "partner" | "summit" | "message";

const ENDPOINT_BY_KIND: Record<SubmissionKind, string> = {
  contact: "/api/forms/get-in-touch",
  message: "/api/forms/get-in-touch",
  summit: "/api/forms/summit-registrations",
  partner: "/api/forms/partner-applications",
};

export async function submitToAdmin(
  kind: SubmissionKind,
  data: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(ENDPOINT_BY_KIND[kind], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
