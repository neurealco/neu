# Etapa de construcción
FROM node:18-bookworm AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm@10.13.1

# Configurar directorio de trabajo
WORKDIR /app

# 1. Copiar archivos de configuración de pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Crear estructura de directorios para el frontend
RUN mkdir -p apps/frontend

# 3. Copiar package.json del frontend
COPY apps/frontend/package.json ./apps/frontend/package.json

# 4. Instalar dependencias usando filtro de pnpm
RUN pnpm install --frozen-lockfile --filter frontend

# 5. Copiar el resto del código del frontend
COPY apps/frontend ./apps/frontend

# 6. Construir el frontend
RUN pnpm --filter frontend build

# Etapa de producción final
FROM node:18-bookworm-slim

WORKDIR /app

# Copiar solo los archivos construidos
COPY --from=builder /app/apps/frontend/dist ./dist

# Instalar solo dependencias de producción
COPY apps/frontend/package.json .
RUN npm install --omit=dev

# Configurar variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]