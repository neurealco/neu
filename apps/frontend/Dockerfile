# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copia solo los archivos de dependencias para caché eficiente
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# 2. Instala dependencias
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 3. Copia todo el resto del código
COPY . .

# 4. Compila el frontend Astro (SSR)
RUN pnpm --filter ./apps/frontend... build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copia sólo los artefactos y dependencias necesarios
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/apps/frontend/package.json .

# Cambia la ruta al adaptador (server) según la configuración de Astro
# En SSR, normalmente es dist/server/entry.mjs
COPY --from=builder /app/apps/frontend/dist/server ./dist/server

EXPOSE 3000

# Cambia este comando si tu server principal es diferente
CMD ["node", "dist/server/entry.mjs"]
