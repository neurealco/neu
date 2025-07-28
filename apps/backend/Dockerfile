# ---------- Etapa 1: Builder ----------
FROM node:18-bookworm AS builder

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia todo el proyecto
COPY . .

# Instala pnpm
RUN npm install -g pnpm@10.13.1

# Instala dependencias y construye el backend
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend build

# ---------- Etapa 2: Imagen Final ----------
FROM node:18-alpine
WORKDIR /app

# Copia solo lo necesario
COPY --from=builder /app/apps/backend/package.json ./
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]