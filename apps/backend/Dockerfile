# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy lock files first for better caching
COPY package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json

# Install dependencies (incluye devDependencies)
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend

# Build the app usando el filtro de pnpm
RUN pnpm --filter ./apps/backend... run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .

# Environment variables (will be set in Akash SDL)
ENV NODE_ENV=production
ENV PORT=8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
    CMD wget --spider http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["node", "dist/server.js"]