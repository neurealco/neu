# ---------- Etapa 1: Builder ----------
FROM node:18-bookworm AS builder

RUN apt-get update && apt-get install -y python3 make g++ git
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json apps/frontend/package.json

# Instala pnpm
RUN npm install -g pnpm@10.13.1

# Instala dependencias
RUN pnpm install --frozen-lockfile

# Copia el resto del código
COPY . .

# Construye el frontend
RUN pnpm --filter frontend build

# ---------- Etapa 2: Imagen Final ----------
FROM node:18-alpine
WORKDIR /app

# Copia dependencias y código construido
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/apps/frontend/package.json ./

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]