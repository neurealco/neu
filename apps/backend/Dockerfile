FROM node:18-alpine AS builder
WORKDIR /app

# Instalar dependencias
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Construir aplicación
COPY . .
RUN pnpm build

# Imagen de producción
FROM node:18-alpine
WORKDIR /app

# Copiar dependencias de producción
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

# Copiar aplicación construida
COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000
CMD ["node", "dist/server.js"]