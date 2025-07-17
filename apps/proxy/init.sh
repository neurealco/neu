#!/bin/bash

# Start nginx in background
nginx

# Get SSL certificate if not exists
if [ ! -f "/etc/letsencrypt/live/neureal.site/fullchain.pem" ]; then
    echo "Requesting initial SSL certificate..."
    certbot --nginx -d neureal.site --non-interactive --agree-tos --email admin@neureal.site
fi

# Setup cron job for renewal
echo "0 0 * * * certbot renew --quiet" | crontab -
crond

# Monitor nginx and restart if needed
while true; do
    if ! pgrep nginx > /dev/null; then
        echo "Nginx is not running. Restarting..."
        nginx
    fi
    sleep 60
done