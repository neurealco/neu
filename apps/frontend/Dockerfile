# Etapa de construcción
FROM node:18-bookworm AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm@10.13.1

# Configurar directorio de trabajo
WORKDIR /app

# Copiar solo lo necesario para instalar dependencias
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# Instalar dependencias (incluyendo devDependencies)
RUN pnpm install --frozen-lockfile

# Copiar solo los archivos del frontend
COPY apps/frontend ./apps/frontend

# Construir el frontend
RUN pnpm --filter frontend build

# Etapa de producción final
FROM node:18-bookworm-slim

WORKDIR /app

# Copiar solo los archivos construidos y dependencias de producción
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Configurar variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]