# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia archivos necesarios para pnpm y monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copia toda la carpeta apps (todas las apps, incluyendo backend y frontend)
COPY apps ./apps

# Instala pnpm con la versión que usas localmente
RUN npm install -g pnpm@10.13.1

RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Backend ----------
FROM deps AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential
RUN pnpm --filter backend build

# Etapa runner
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000
CMD ["node", "dist/server.js"]