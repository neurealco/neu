# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias primero (cache n capas de Docker)
COPY apps/frontend/package.json apps/frontend/pnpm-lock.yaml ./

# Instala pnpm global y dependencias del frontend
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copia el código fuente de tu frontend
COPY apps/frontend ./apps/frontend

# Ejecuta el build de Astro (usa SSR)
WORKDIR /app/apps/frontend
RUN pnpm build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copia los archivos necesarios SOLO de producción
COPY apps/frontend/package.json apps/frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

# Copia el resultado del build desde el builder
COPY --from=builder /app/apps/frontend/dist ./dist

WORKDIR /app/apps/frontend

EXPOSE 3000

# Ejecuta el server SSR de Astro
CMD ["node", "./dist/server/entry.mjs"]
