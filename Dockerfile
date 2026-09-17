# syntax=docker/dockerfile:1

# A versão do pnpm vem do campo `packageManager` do package.json via corepack.
# Antes era `pnpm@latest`, o que tornava a imagem não reproduzível: dois builds
# do mesmo commit podiam resolver dependências com resolvers diferentes.
FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# -----------------------------------------------------------------------------
# Stage 1: dependências
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack install && pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 2: build
# -----------------------------------------------------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# TODA variável NEXT_PUBLIC_* é inlinada no bundle JavaScript em tempo de
# build — não adianta passá-la só no runtime. O Dockerfile anterior declarava
# apenas a do reCAPTCHA, então a imagem saía com a configuração do Firebase
# client indefinida e o login do painel (/admin) não funcionava.
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID

RUN pnpm build

# -----------------------------------------------------------------------------
# Stage 3: imagem de produção
# -----------------------------------------------------------------------------
FROM base AS runner

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Um container que subiu mas cujo servidor Next morreu continuava marcado como
# saudável para o orquestrador. `/robots.txt` é uma rota estática e barata.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
