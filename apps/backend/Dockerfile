# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copiar solo package.json y lockfile primero
COPY package.json pnpm-lock.yaml ./

# Instalar versión fija de pnpm compatible con lockfileVersion 9
RUN npm install -g pnpm@10.13.1

# Instalar dependencias respetando lockfile
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Backend ----------
FROM deps AS builder
COPY . .

# Diagnóstico y build
RUN pwd && ls -la && ls -la apps/backend
RUN apt-get update && apt-get install -y build-essential
RUN pnpm --filter backend build --reporter=append-only

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8000
CMD ["node", "dist/server.js"]