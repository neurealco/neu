# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps

RUN npm install -g pnpm@10.13.1
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Backend ----------
FROM deps AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y build-essential

RUN pnpm --filter backend build
RUN pnpm prune --prod

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app

# Copia package.json solo para referencia, no para instalación
COPY --from=builder /app/apps/frontend/package.json ./package.json

# Copia carpeta dist con el build resultante de Astro
COPY --from=builder /app/apps/frontend/dist ./dist

# Copia el node_modules completo con las dependencias instaladas y resueltas por pnpm
COPY --from=builder /app/node_modules ./node_modules

# Opcional: copia el pnpm-lock.yaml para referencia (no obligatorio en runner)
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

ARG PUBLIC_API_BASE_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_BASE_URL=https://neureal.site/api
ENV PUBLIC_SITE_URL=https://neureal.site

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]
