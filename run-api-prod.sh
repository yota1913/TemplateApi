#!/bin/bash
set -e

echo "🚀 Deployando API en PRODUCCIÓN..."

docker compose --env-file .env.prod up --build -d

echo "✅ API corriendo en producción"
