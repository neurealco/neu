# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia los archivos raíz del monorepo.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copia TODA la carpeta apps (¡todas las apps! No solo frontend sino backend también si tienes).
COPY apps ./apps

RUN npm install -g pnpm@10.13.1

RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Frontend ----------
FROM deps AS builder
WORKDIR /app
RUN pnpm --filter frontend build --reporter=append-only

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/package.json ./package.json
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

ARG PUBLIC_API_BASE_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_BASE_URL=https://neureal.site/api
ENV PUBLIC_SITE_URL=https://neureal.site

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]
