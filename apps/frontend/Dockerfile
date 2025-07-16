FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

# Instalar pnpm y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copiar aplicación
COPY . .

# Construir aplicación
RUN pnpm run build

# Imagen de producción
FROM node:18-alpine
WORKDIR /app

# Copiar solo lo necesario para producción
COPY --from=builder /app/apps/frontend/dist ./dist
COPY --from=builder /app/apps/frontend/package.json .
COPY --from=builder /app/node_modules ./node_modules

# Puerto y comando
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]