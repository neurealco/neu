# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter frontend build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]