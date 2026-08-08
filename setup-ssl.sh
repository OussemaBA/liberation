#!/bin/bash
# -----------------------------------------------------------------------------
# Setup SSL Certificate via Certbot for Custom Domain
# Usage: ./setup-ssl.sh yourdomain.com admin@yourdomain.com
# -----------------------------------------------------------------------------

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Usage: ./setup-ssl.sh <domain_name> <email_address>"
    echo "Example: ./setup-ssl.sh example.com admin@example.com"
    exit 1
fi

echo "==> Requesting SSL Certificate for $DOMAIN..."

docker compose run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    -d $DOMAIN -d www.$DOMAIN \
    --email $EMAIL --agree-tos --no-eff-email

if [ $? -eq 0 ]; then
    echo "==> SSL Certificate acquired successfully!"
    echo "==> Updating Nginx configuration for HTTPS..."
    sed -i "s/yourdomain.com/$DOMAIN/g" nginx/conf.d/app.conf
    sed -i 's/# server {/server {/g' nginx/conf.d/app.conf
    sed -i 's/#     /    /g' nginx/conf.d/app.conf
    sed -i 's/# }/}/g' nginx/conf.d/app.conf
    
    echo "==> Reloading Nginx..."
    docker compose exec nginx nginx -s reload
    echo "==> Setup complete! Your website is live at https://$DOMAIN"
else
    echo "==> Failed to obtain SSL Certificate. Make sure DNS A record points to this server IP."
fi
