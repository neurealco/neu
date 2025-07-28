# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia los archivos raíz del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps

RUN npm install -g pnpm@10.13.1
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Backend ----------
FROM deps AS builder
WORKDIR /app

# Instala dependencias específicas del backend
RUN cd apps/backend && pnpm install

RUN pnpm --filter backend build

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app

# Copia SOLO lo necesario para el backend
COPY --from=builder /app/apps/backend/package.json ./  # Corregido
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]