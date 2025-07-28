FROM node:18-bookworm

# Instalar dependencias globales
RUN apt-get update && apt-get install -y python3 make g++ git

# Configurar directorio de trabajo
WORKDIR /app

# Copiar TODO el proyecto
COPY . .

# Instalar pnpm y dependencias
RUN npm install -g pnpm@10.13.1
RUN pnpm install --frozen-lockfile

# Construir el frontend
RUN pnpm --filter frontend build

# Configurar variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000

# Exponer puerto y ejecutar
EXPOSE 3000
CMD ["node", "apps/frontend/dist/server/entry.mjs"]