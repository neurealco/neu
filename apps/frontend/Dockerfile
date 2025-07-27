# Usar imagen base con soporte completo
FROM node:18-bullseye AS builder

WORKDIR /app
COPY . .

# Instalar PNPM y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter frontend build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist ./dist

# Variables públicas
ARG PUBLIC_API_BASE_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_BASE_URL=https://neureal.site/api
ENV PUBLIC_SITE_URL=https://neureal.site

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]