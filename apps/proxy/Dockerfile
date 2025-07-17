FROM nginx:1.25-alpine

# Install Certbot and cron
RUN apk add --no-cache certbot certbot-nginx bash curl && \
    mkdir -p /var/www/certbot

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy init script
COPY init.sh /init.sh
RUN chmod +x /init.sh

# SSL certificates directory
VOLUME /etc/letsencrypt

# Health check
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:80 || exit 1

EXPOSE 80 443
CMD ["/init.sh"]