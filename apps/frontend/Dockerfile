# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copiar solo los archivos esenciales del frontend
COPY apps/frontend/package.json ./package.json
COPY apps/frontend/pnpm-lock.yaml ./pnpm-lock.yaml

# 2. Instalar pnpm globalmente
RUN npm install -g pnpm

# 3. Instalar dependencias locales del frontend
RUN pnpm install --frozen-lockfile

# 4. Copiar todo el código del frontend
COPY apps/frontend/ ./

# 5. Crear enlaces simbólicos para resolver problemas de módulos
RUN rm -rf node_modules/astro
RUN pnpm install astro@latest --save-exact

# 6. Construir el frontend usando la ruta local
RUN npx astro build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido
COPY --from=builder /app/dist ./dist

# Instalar un servidor estático ligero
RUN npm install -g http-server

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]