FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist

ENV PORT=8000
EXPOSE 8000
CMD ["node", "dist/server.js"]