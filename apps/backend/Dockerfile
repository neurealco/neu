FROM node:18.20.8-bookworm

# 1. Instalar dependencias globales
RUN apt-get update && apt-get install -y python3 make g++ git

# 2. Activar Corepack y configurar pnpm
RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

# 3. Configurar directorio de trabajo
WORKDIR /app

# 4. Copiar archivos de bloqueo
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# 5. Copiar el resto del proyecto
COPY . .

# 6. Instalar dependencias
RUN pnpm install -r --offline --frozen-lockfile

# 7. Construir el backend
RUN pnpm --filter backend build

# 8. Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=8000

# 9. Exponer puerto y ejecutar
EXPOSE 8000
CMD ["node", "apps/backend/dist/server.js"]