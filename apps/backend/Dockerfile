FROM node:18-bookworm

RUN apt-get update && apt-get install -y ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Instalar dependencias globales
RUN apt-get update && apt-get install -y python3 make g++ git

# Configurar directorio de trabajo
WORKDIR /app

# Copiar TODO el proyecto
COPY . .

# Instalar pnpm y dependencias
RUN npm install -g pnpm@10.13.1
RUN pnpm install --frozen-lockfile

# Construir el backend
RUN pnpm --filter backend build

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

# Exponer puerto y ejecutar
EXPOSE 8000
CMD ["node", "apps/backend/dist/server.js"]