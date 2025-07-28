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

# Construye específicamente el backend
RUN pnpm --filter backend run build

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app

# Copia los archivos necesarios
COPY --from=builder /app/apps/backend/package.json ./package.json
COPY --from=builder /app/apps/backend/dist ./dist

# Instala dependencias de producción
RUN npm install --omit=dev

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]