# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copia sólo los archivos de dependencias principales primero para aprovechar el cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copia TODOS los package.json de los workspaces (opcional, pero recomendado, para mejor cache)
COPY apps/backend/package.json ./apps/backend/package.json
# Si tienes más packages: COPY apps/otro/package.json ./apps/otro/package.json
# Si tienes libs: COPY libs/loquesea/package.json ./libs/loquesea/package.json

# Instala TODAS las dependencias (ahora sí PNPM puede resolver workspace correctamente)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copia el RESTO del monorepo que se requiere para build
COPY . .

# Compila usando pnpm exec, o pnpm --filter si lo necesitas explícito
RUN pnpm exec tsc -p apps/backend/tsconfig.json
# o
# RUN pnpm --filter "./apps/backend" run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copia solo los artefactos necesarios de build/producción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .

ENV NODE_ENV=production
ENV PORT=8000

HEALTHCHECK --interval=30s --timeout=5s CMD wget --spider http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["node", "dist/server.js"]
