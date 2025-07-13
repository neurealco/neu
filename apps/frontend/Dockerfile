FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

# Solo necesario para SSR
EXPOSE 3000

# Comando inteligente
CMD ["node", "./dist/server/entry.mjs"]