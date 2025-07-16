FROM node:18-alpine AS builder

WORKDIR /app

# Copiar los archivos esenciales
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend
RUN pnpm build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/apps/frontend/dist ./dist

WORKDIR /app/apps/frontend

EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
