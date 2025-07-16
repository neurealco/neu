FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copiar archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instalar pnpm globalmente
RUN npm install -g pnpm

# 3. Instalar todas las dependencias
RUN pnpm install --frozen-lockfile

# 4. Copiar todo el código fuente
COPY . .

# 5. Construir backend
RUN cd apps/backend && pnpm run build

# 6. Construir frontend usando la ruta completa al binario de astro
RUN cd apps/frontend && ./node_modules/.bin/astro build

# Imagen de producción para backend
FROM node:18-alpine
WORKDIR /app

# Copiar solo lo necesario para el backend
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]