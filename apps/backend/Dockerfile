# ---------- Etapa 1: Dependencias ----------
FROM node:18-bookworm AS deps

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia archivos necesarios para pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps

# Instala pnpm globalmente
RUN npm install -g pnpm@10.13.1

# Instala todas las dependencias del monorepo
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build Backend ----------
FROM deps AS builder
WORKDIR /app

# Construye el backend
RUN pnpm --filter backend build

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app/backend

# Instala pnpm en la imagen final
RUN npm install -g pnpm@10.13.1

# Copia los archivos necesarios
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/pnpm-lock.yaml ./

# Instala solo dependencias de producción usando pnpm
RUN pnpm install --prod --frozen-lockfile

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]