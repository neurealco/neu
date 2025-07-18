FROM node:18-alpine AS builder

WORKDIR /app

# Copia TODO lo necesario para la instalación y compilación
COPY . .

# Instala todas las dependencias, incluidas las de desarrollo
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Compila el backend usando el binario de la raíz
RUN pnpm exec tsc -p apps/backend/tsconfig.json

# Production stage (solo copia los artefactos y node_modules necesarios)
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
