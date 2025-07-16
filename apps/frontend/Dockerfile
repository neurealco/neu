# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copia archivos esenciales de la raíz y configuración de pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copia el package.json del frontend (para workspaces)
COPY apps/frontend/package.json apps/frontend/package.json

# 3. Instalar pnpm y dependencias (resuelve TODAS las dependencias del workspace)
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 4. Copia el código fuente del frontend
COPY apps/frontend ./apps/frontend

# 5. Build de Astro (SSR)
WORKDIR /app/apps/frontend
RUN pnpm build

# Etapa 2: producción
FROM node:18-alpine

WORKDIR /app

# 1. Archivos esenciales y configuración para producción
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json apps/frontend/package.json

# 2. Instalar pnpm y SOLO las dependencias de producción
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

# 3. Copiar el build del SSR desde el builder
COPY --from=builder /app/apps/frontend/dist ./dist

WORKDIR /app/apps/frontend

EXPOSE 3000

# 4. Ejecuta el servidor SSR de Astro
CMD ["node", "./dist/server/entry.mjs"]
