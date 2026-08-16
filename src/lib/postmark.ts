import https from "node:https";

export type PostmarkAttachment = {
  Name: string;
  Content: string;
  ContentType: string;
  ContentID?: string;
};

type SendEmailInput = {
  to: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
  /** Required for app-originated mail so Postmark traffic is attributable. */
  tag: string;
  /** Overrides POSTMARK_REPLY_TO when set (e.g. registrant email). */
  replyTo?: string;
  /** Inline/related attachments (e.g. CID logo). */
  attachments?: PostmarkAttachment[];
};

export type PostmarkSendResult =
  | { ok: true; messageId?: string }
  | { ok: false; error: string };

type PostmarkApiResponse = {
  ErrorCode?: number;
  Message?: string;
  MessageID?: string;
};

/** Soft hourly cap for this Node process (single app container). */
const HOURLY_CAP = Math.max(
  5,
  Number.parseInt(process.env.POSTMARK_HOURLY_CAP || "40", 10) || 40,
);

/** Hard burst: max sends in a short window. */
const BURST_LIMIT = Math.max(
  2,
  Number.parseInt(process.env.POSTMARK_BURST_LIMIT || "8", 10) || 8,
);
const BURST_WINDOW_MS = 60_000;

const sendTimestamps: number[] = [];

let insecureTlsWarningLogged = false;

function pruneAndCount(now: number, windowMs: number): number {
  const cutoff = now - windowMs;
  while (sendTimestamps.length && sendTimestamps[0]! < cutoff) {
    sendTimestamps.shift();
  }
  return sendTimestamps.filter((t) => t >= now - windowMs).length;
}

function allowSend(): PostmarkSendResult | null {
  const now = Date.now();
  const lastHour = pruneAndCount(now, 60 * 60 * 1000);
  if (lastHour >= HOURLY_CAP) {
    console.error("[postmark] hourly send cap reached");
    return { ok: false, error: "Email send rate limit exceeded (hourly)" };
  }
  const lastMinute = pruneAndCount(now, BURST_WINDOW_MS);
  if (lastMinute >= BURST_LIMIT) {
    console.error("[postmark] burst send cap reached");
    return { ok: false, error: "Email send rate limit exceeded (burst)" };
  }
  return null;
}

function getConfig():
  | { error: string }
  | { token: string; from: string; replyTo?: string; messageStream: string } {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const fromEmail = process.env.POSTMARK_FROM_EMAIL?.trim();
  const fromName = process.env.POSTMARK_FROM_NAME?.trim() || "Inspire Oman Team";
  const replyTo = process.env.POSTMARK_REPLY_TO?.trim() || undefined;
  const messageStream = process.env.POSTMARK_MESSAGE_STREAM?.trim() || "outbound";

  if (!token) {
    return { error: "POSTMARK_SERVER_TOKEN is not set" };
  }
  if (!fromEmail) {
    return { error: "POSTMARK_FROM_EMAIL is not set" };
  }

  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  return { token, from, replyTo, messageStream };
}

function allowInsecureTls(): boolean {
  return process.env.POSTMARK_ALLOW_INSECURE_TLS === "1";
}

/** Flatten Error + nested cause (e.g. SELF_SIGNED_CERT_IN_CHAIN) for logs. */
function formatFetchError(err: unknown): string {
  if (!(err instanceof Error)) {
    return "Postmark request failed";
  }

  const parts: string[] = [err.message];
  let current: unknown = (err as Error & { cause?: unknown }).cause;
  for (let depth = 0; current && depth < 5; depth += 1) {
    if (current instanceof Error) {
      const code = (current as NodeJS.ErrnoException).code;
      if (code && !parts.includes(code)) parts.push(code);
      if (current.message && !parts.includes(current.message)) {
        parts.push(current.message);
      }
      current = (current as Error & { cause?: unknown }).cause;
      continue;
    }
    const asString = String(current);
    if (asString && !parts.includes(asString)) parts.push(asString);
    break;
  }

  return parts.join(" | ");
}

/**
 * Scoped HTTPS POST to Postmark. When insecureTls is true, only this request
 * skips certificate verification (corporate TLS interception) — never global.
 */
function postmarkHttpsRequest(
  token: string,
  body: string,
  insecureTls: boolean,
): Promise<{ status: number; data: PostmarkApiResponse }> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.postmarkapp.com",
        path: "/email",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": token,
          "Content-Length": Buffer.byteLength(body),
        },
        rejectUnauthorized: !insecureTls,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let data: PostmarkApiResponse = {};
          try {
            data = JSON.parse(text) as PostmarkApiResponse;
          } catch {
            data = {};
          }
          resolve({ status: res.statusCode ?? 0, data });
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function postmarkSendRequest(
  token: string,
  payload: Record<string, unknown>,
): Promise<{ status: number; data: PostmarkApiResponse }> {
  const body = JSON.stringify(payload);
  const insecure = allowInsecureTls();

  if (insecure) {
    if (!insecureTlsWarningLogged) {
      insecureTlsWarningLogged = true;
      console.warn(
        "[postmark] POSTMARK_ALLOW_INSECURE_TLS=1 — TLS verification disabled for api.postmarkapp.com only",
      );
    }
    return postmarkHttpsRequest(token, body, true);
  }

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body,
  });

  const data = (await res.json().catch(() => ({}))) as PostmarkApiResponse;
  return { status: res.status, data };
}

export async function sendPostmarkEmail(
  input: SendEmailInput,
): Promise<PostmarkSendResult> {
  const tag = input.tag?.trim();
  if (!tag) {
    console.error("[postmark] refused send without Tag");
    return { ok: false, error: "Email tag is required" };
  }

  const throttled = allowSend();
  if (throttled) return throttled;

  const config = getConfig();
  if ("error" in config) {
    // Never log env or token material.
    console.error("[postmark]", config.error);
    return { ok: false, error: config.error };
  }

  const to = input.to?.trim();
  if (!to || !to.includes("@")) {
    return { ok: false, error: "Invalid recipient" };
  }

  const payload: Record<string, unknown> = {
    From: config.from,
    To: to,
    Subject: input.subject,
    TextBody: input.textBody,
    HtmlBody: input.htmlBody ?? textToHtml(input.textBody),
    MessageStream: config.messageStream,
    Tag: tag,
  };
  const replyTo = input.replyTo?.trim() || config.replyTo;
  if (replyTo) payload.ReplyTo = replyTo;
  if (input.attachments?.length) {
    payload.Attachments = input.attachments;
  }

  try {
    const { status, data } = await postmarkSendRequest(config.token, payload);

    if (!status || status >= 400 || (typeof data.ErrorCode === "number" && data.ErrorCode !== 0)) {
      const error = data.Message || `Postmark HTTP ${status}`;
      const code =
        typeof data.ErrorCode === "number" ? ` ErrorCode=${data.ErrorCode}` : "";
      console.error(`[postmark] send failed:${code}`, error);
      return { ok: false, error };
    }

    sendTimestamps.push(Date.now());
    console.info(
      "[postmark] send ok",
      data.MessageID ? `MessageID=${data.MessageID}` : "",
    );
    return { ok: true, messageId: data.MessageID };
  } catch (err) {
    const error = formatFetchError(err);
    // Do not stringify err objects that might embed fetch headers.
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
