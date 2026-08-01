# Inspire Oman — production image (Next.js + Payload)
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
COPY scripts/patch-payload-loadenv.mjs ./scripts/patch-payload-loadenv.mjs
RUN npm ci --legacy-peer-deps

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prefer Postgres in image builds (compose overrides at runtime)
ENV DATABASE_URI=postgresql://payload:payload@postgres:5432/inspire_oman
ENV PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Payload media uploads (persisted via volume in compose)
RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
