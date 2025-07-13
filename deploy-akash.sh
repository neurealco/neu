#!/bin/bash

# Build and push Docker images
docker build -t ghcr.io/yourusername/neureal-backend:latest -f apps/backend/Dockerfile ./apps/backend
docker push ghcr.io/yourusername/neureal-backend:latest

docker build -t ghcr.io/yourusername/neureal-frontend:latest -f apps/frontend/Dockerfile ./apps/frontend
docker push ghcr.io/yourusername/neureal-frontend:latest

# Generate deployment manifest
cat > deploy.yml <<EOF
---
version: "2.0"

services:
  backend:
    image: ghcr.io/yourusername/neureal-backend:latest
    env:
      - SUPABASE_URL=your_supabase_url
      - SUPABASE_SECRET=your_supabase_secret_key
      - GOOGLE_CLIENT_ID=your_google_client_id
      - GOOGLE_CLIENT_SECRET=your_google_client_secret
      - THEOREM_API_KEY=your_theorem_api_key
      - THEOREM_SECRET=your_theorem_secret_key
      - JWT_SECRET=your_strong_jwt_secret
      - REDIS_URL=redis://redis:6379
      - SITE_URL=https://neureal.site
      - NODE_ENV=production
    expose:
      - port: 8000

  frontend:
    image: ghcr.io/yourusername/neureal-frontend:latest
    env:
      - PUBLIC_SUPABASE_URL=your_supabase_url
      - PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    expose:
      - port: 3000

  redis:
    image: redis:7-alpine
    expose:
      - port: 6379

  nginx:
    image: nginx:alpine
    depends:
      - backend
      - frontend
    expose:
      - port: 80
      - port: 443
    env:
      - DOMAIN=neureal.site
    params:
      storage:
        data:
          mount: /etc/nginx/certs
          readOnly: true

profiles:
  compute:
    backend:
      resources:
        cpu:
          units: 1.0
        memory:
          size: 1Gi
        storage:
          size: 10Gi
    frontend:
      resources:
        cpu:
          units: 0.5
        memory:
          size: 512Mi
        storage:
          size: 5Gi
    redis:
      resources:
        cpu:
          units: 0.3
        memory:
          size: 256Mi
        storage:
          size: 1Gi
    nginx:
      resources:
        cpu:
          units: 0.5
        memory:
          size: 512Mi
        storage:
          size: 5Gi

deployment:
  backend:
    compute: backend
  frontend:
    compute: frontend
  redis:
    compute: redis
  nginx:
    compute: nginx
EOF

# Deploy to Akash
akash tx deployment create deploy.yml --from neureal-wallet --chain-id akashnet-2 --node https://rpc.akash.network:443 -y

# Monitor deployment status
akash query deployment list --owner $(akash keys show neureal-wallet -a) \
  --node https://rpc.akash.network:443