#!/bin/bash

# Crear certificados autofirmados de emergencia
mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/privkey.pem \
  -out ssl/fullchain.pem \
  -subj "/CN=neureal.site"

# Crear estructura de directorios para Certbot
mkdir -p certbot/conf certbot/www

# Configuración inicial
docker-compose up -d nginx

# Intentar obtener certificados Let's Encrypt
docker-compose run --rm certbot certonly --webroot \
  --webroot-path /var/www/certbot \
  -d neureal.site -d www.neureal.site \
  --email mohamedyassinebnsalem@gmail.com \
  --agree-tos --non-interactive --force-renewal || echo "Certbot falló, usando certificados autofirmados"

# Reiniciar servicios
docker-compose down
docker-compose up -d