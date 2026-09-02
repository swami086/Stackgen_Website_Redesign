# syntax=docker/dockerfile:1.7
FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time env so Next can compile Payload routes (real secrets at runtime).
ENV PAYLOAD_SECRET=build-time-placeholder
ENV DATABASE_URL=postgresql://postgres@127.0.0.1:5432/payload
RUN pnpm build \
 && cp -a node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/. \
      .next/standalone/node_modules/.pnpm/@swc+helpers@*/node_modules/@swc/helpers/ || true

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs \
 && mkdir -p /app/media && chown nextjs:nodejs /app/media
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# prodMigrations JSON sidecars (Payload 3.x standalone)
COPY --from=builder --chown=nextjs:nodejs /app/payload/migrations ./payload/migrations
USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
