/** Simple process-local rate limiter for single-node deploys. */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

/**
 * Sliding fixed-window limiter.
 * @param key e.g. `forms:summit:1.2.3.4`
 * @param limit max hits per window
 * @param windowMs window length
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { ok: true, remaining: Math.max(0, limit - bucket.count) };
}

/** Best-effort client IP from proxy headers (Caddy / Cloudflare). */
export function clientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  return "unknown";
}

/** Reject bodies larger than maxBytes (reads Content-Length when present). */
export function assertBodyWithinLimit(
  req: Request,
  maxBytes: number,
): string | null {
  const raw = req.headers.get("content-length");
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return "Invalid Content-Length.";
  if (n > maxBytes) return `Request body too large (max ${maxBytes} bytes).`;
  return null;
}

/** Periodic cleanup so the Map cannot grow forever. */
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}, 60_000).unref?.();
