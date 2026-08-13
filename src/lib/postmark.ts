type SendEmailInput = {
  to: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
  tag?: string;
};

export type PostmarkSendResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string };

function getConfig() {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const fromEmail = process.env.POSTMARK_FROM_EMAIL?.trim();
  const fromName = process.env.POSTMARK_FROM_NAME?.trim() || "Inspire Oman Team";
  const replyTo = process.env.POSTMARK_REPLY_TO?.trim();
  const messageStream = process.env.POSTMARK_MESSAGE_STREAM?.trim() || "outbound";

  if (!token) {
    return { error: "POSTMARK_SERVER_TOKEN is not set" as const };
  }
  if (!fromEmail) {
    return { error: "POSTMARK_FROM_EMAIL is not set" as const };
  }

  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  return { token, from, replyTo, messageStream };
}

export async function sendPostmarkEmail(
  input: SendEmailInput,
): Promise<PostmarkSendResult> {
  const config = getConfig();
  if ("error" in config) {
    console.error("[postmark]", config.error);
    return { ok: false, error: config.error };
  }

  const payload: Record<string, unknown> = {
    From: config.from,
    To: input.to,
    Subject: input.subject,
    TextBody: input.textBody,
    HtmlBody: input.htmlBody ?? textToHtml(input.textBody),
    MessageStream: config.messageStream,
  };
  if (config.replyTo) payload.ReplyTo = config.replyTo;
  if (input.tag) payload.Tag = input.tag;

  try {
    const res = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": config.token,
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ErrorCode?: number;
      Message?: string;
      MessageID?: string;
    };

    if (!res.ok || (typeof data.ErrorCode === "number" && data.ErrorCode !== 0)) {
      const error = data.Message || `Postmark HTTP ${res.status}`;
      console.error("[postmark] send failed:", error);
      return { ok: false, error };
    }

    return { ok: true, messageId: data.MessageID };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Postmark request failed";
    console.error("[postmark] send error:", error);
    return { ok: false, error };
  }
}

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const withBreaks = escaped.replace(/\n/g, "<br />\n");
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;line-height:1.6;color:#1c1917">${withBreaks}</body></html>`;
}
