# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias del frontend
RUN pnpm install --frozen-lockfile

# Copiar el código del frontend
COPY apps/frontend ./apps/frontend

# Construir el frontend usando npx
RUN cd apps/frontend && npx astro build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido
COPY --from=builder /app/apps/frontend/dist ./dist

# Instalar un servidor estático (por ejemplo, serve)
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]