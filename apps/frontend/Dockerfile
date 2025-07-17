# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar TODOS los archivos del workspace
COPY . .

# Instalar dependencias globales y de workspace
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Build específico del backend
RUN cd apps/backend && pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .

EXPOSE 8000
CMD ["node", "dist/server.js"]