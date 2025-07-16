# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar solo los archivos esenciales primero para caché
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instalar pnpm globalmente
RUN npm install -g pnpm

# 3. Instalar dependencias específicas del frontend
RUN cd apps/frontend && pnpm install --frozen-lockfile

# 4. Copiar todo el código del frontend
COPY apps/frontend ./apps/frontend

# 5. Construir el frontend - solución alternativa
RUN cd apps/frontend && pnpm exec astro build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido
COPY --from=builder /app/apps/frontend/dist ./dist

# Instalar un servidor estático (lite-server)
RUN npm install -g lite-server

EXPOSE 3000
CMD ["lite-server", "--baseDir", "dist"]