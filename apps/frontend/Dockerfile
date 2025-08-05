FROM node:18-bookworm

# 1. Instalar dependencias globales
RUN apt-get update && apt-get install -y python3 make g++ git

# 2. Activar Corepack y configurar pnpm
RUN corepack enable
RUN corepack prepare pnpm@10.13.1 --activate

# 3. Configurar directorio de trabajo
WORKDIR /app

# 4. Copiar archivos de bloqueo para optimizar caché
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# 5. Copiar el resto del proyecto
COPY . .

# 6. Instalar dependencias
RUN pnpm install -r --offline --frozen-lockfile

# 7. Construir el frontend
RUN pnpm --filter frontend build

# 8. Configurar variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000

# 9. Exponer puerto y ejecutar
EXPOSE 3000
CMD ["node", "apps/frontend/dist/server/entry.mjs"]