# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias del backend
RUN pnpm install --frozen-lockfile

# Copiar el código del backend
COPY apps/backend ./apps/backend

# Construir el backend
RUN cd apps/backend && pnpm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar el código construido y dependencias
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]