FROM nginx:1.25-alpine

# Instalar Certbot y dependencias
RUN apk add --no-cache certbot certbot-nginx bash curl && \
    mkdir -p /var/www/certbot

# Eliminar configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar script de inicialización
COPY init.sh /init.sh
RUN chmod +x /init.sh

# Directorio para certificados SSL
VOLUME /etc/letsencrypt

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:80 || exit 1

EXPOSE 80 443
CMD ["/init.sh"]