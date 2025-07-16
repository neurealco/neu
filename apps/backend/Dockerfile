FROM node:18-alpine AS builder
WORKDIR /app

# 1. Copiar archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instalar pnpm globalmente y configurar el almacenamiento
RUN npm install -g pnpm
RUN pnpm config set store-dir /pnpm-store

# 3. Instalar todas las dependencias (incluyendo las del frontend)
RUN pnpm install --frozen-lockfile

# 4. Copiar todo el código fuente
COPY . .

# 5. Construir ambas aplicaciones (usando npx para acceder a los binarios)
RUN pnpm exec --recursive build

# Imagen de producción
FROM node:18-alpine
WORKDIR /app

# Copiar solo lo necesario para producción
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]