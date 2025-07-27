# Usar imagen base completa
FROM node:18-bullseye AS builder

WORKDIR /app
COPY . .

# Instalar PNPM y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist

# Puerto
EXPOSE 8000
CMD ["node", "dist/server.js"]