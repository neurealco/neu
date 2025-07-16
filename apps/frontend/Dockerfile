# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar archivos esenciales
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instalar pnpm globalmente
RUN npm install -g pnpm

# 3. Instalar dependencias globales
RUN pnpm install --frozen-lockfile

# 4. Instalar Astro como dependencia global adicional
RUN npm install -g astro

# 5. Copiar el código del frontend
COPY apps/frontend ./apps/frontend

# 6. Construir el frontend usando el comando global
RUN cd apps/frontend && astro build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido
COPY --from=builder /app/apps/frontend/dist ./dist

# Instalar un servidor estático (usaremos serve)
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]