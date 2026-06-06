FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public

# Build-time env vars (defaults for Docker build)
ARG NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
ARG SUPABASE_URL=http://localhost:54321
ARG SUPABASE_ANON_KEY=placeholder-anon-key
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
