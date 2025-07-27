# Backend Dockerfile (/apps/backend/Dockerfile)
FROM node:18-bookworm AS builder

# Instalar herramientas esenciales
RUN apt-get update && apt-get install -y python3 make g++ git

WORKDIR /app

# Copiar TODO el proyecto
COPY ../.. .

# Configurar PNPM
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000
CMD ["node", "dist/server.js"]