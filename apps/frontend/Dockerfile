# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps
RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Frontend ----------
FROM deps AS builder
COPY apps/frontend apps/frontend
RUN pnpm --filter frontend build

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
ARG PUBLIC_API_BASE_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_BASE_URL=https://neureal.site/api
ENV PUBLIC_SITE_URL=https://neureal.site
EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]