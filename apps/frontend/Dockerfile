# ---------- Etapa 1: Instalación de dependencias ----------
FROM node:18-bookworm AS deps

# 1. Configurar entorno y herramientas
RUN apt-get update && apt-get install -y python3 make g++ git

# 2. Crear directorio de trabajo
WORKDIR /app

# 3. Copiar SOLO archivos necesarios para dependencias
COPY package.json pnpm-lock.yaml .npmrc ./

# 4. Instalar PNPM y dependencias básicas
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# ---------- Etapa 2: Build del Frontend ----------
FROM deps AS builder

# 1. Copiar solo lo necesario para el frontend
COPY apps/frontend apps/frontend
COPY libs libs  # Si tienes librerías compartidas

# 2. Instalar dependencias específicas del frontend
RUN pnpm --filter frontend install

# 3. Construir aplicación
RUN pnpm --filter frontend build

# ---------- Etapa 3: Imagen Final ----------
FROM node:18-alpine AS runner
WORKDIR /app

# 1. Copiar artefactos de construcción
COPY --from=builder /app/apps/frontend/dist ./dist

# 2. Copiar dependencias necesarias
COPY --from=builder /app/node_modules ./node_modules

ARG PUBLIC_API_BASE_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_BASE_URL=https://neureal.site/api
ENV PUBLIC_SITE_URL=https://neureal.site

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]