FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

COPY apps/backend/package.json ./apps/backend/package.json

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec tsc -p apps/backend/tsconfig.json

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .

ENV NODE_ENV=production
ENV PORT=8000

HEALTHCHECK --interval=30s --timeout=5s CMD wget --spider http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["node", "dist/server.js"]
