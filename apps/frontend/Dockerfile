# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar archivos esenciales de la raíz
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instalar pnpm globalmente
RUN npm install -g pnpm

# 3. Instalar dependencias globales
RUN pnpm install --frozen-lockfile

# 4. Copiar todo el código del frontend
COPY apps/frontend ./apps/frontend

# 5. Construir usando el ejecutable de Astro directamente
RUN cd apps/frontend && node ../node_modules/astro/astro.js build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido
COPY --from=builder /app/apps/frontend/dist ./dist

# Instalar un servidor estático (http-server)
RUN npm install -g http-server

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]