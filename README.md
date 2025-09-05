# Template API 🚀

API backend en **Node.js + Express + Sequelize** con **MariaDB/MySQL**.  
Preparada para correr tanto en desarrollo como en producción usando **Docker Compose**.

---

## 📂 Estructura del proyecto

```bash

├── conection/ # Configuración de conexión con la DB
│ └── database.js
├── models/ # Inicialización de Sequelize y carga de modelos
│ └── index.js
├── modules/ # Módulos organizados por tablas
│ └── auth/
│ ├── auth.model.js
│ ├── auth.service.js
│ ├── auth.controller.js
│ └── auth.routes.js
├── routes/ # Cargador dinámico de rutas
│ └── index.js
├── docker-compose.yml
├── Dockerfile
├── .env # Variables de entorno
├── .env.prod # Variables de entorno para producción
├── run-api-prod.sh # Script para despliegue en producción
└── app.js # Punto de entrada de la aplicación
```

---

## ⚙️ Configuración

### 1. Variables de entorno `.env`

Ejemplo para **desarrollo**:

```env
DB_URL=mysql://tuUsuario:tuClave@tuHost:tuPuerto/tuBaseDeDatos

DOCKER_APP=template-api
DOCKER_FILE=Dockerfile
DOCKER_IMAGE=${DOCKER_APP}-image
DOCKER_CONTAINER_NAME=${DOCKER_APP}-container
DOCKER_NETWORKS=${DOCKER_APP}-net
DOCKER_PORT=3700
DOCKER_COMMAND=npx nodemon --legacy-watch app.js
```

### 2. Ejecutar en desarrollo

```bash
docker-compose up --build
```

### 3. Ejecutar en producción
Para ejecutar en producción, se debe usar el script `run-api-prod.sh`. para correr en la vps se debe usar el workflow de github actions. Se debe crear un secret en github actions con el nombre de `VPS_USER`, `VPS_HOST`, `VPS_SSH_KEY` y el valor de la llave privada de la vps.

```bash
name: Deploy API App

on:
  push:
    branches:
      - master
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: prod

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v0.1.6
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: 22222
          command_timeout: 20m
          script: |
            cd ruta/del/proyecto 
            git fetch origin master --force
            echo "✅ Cambios detectados en master"
            git checkout master
            git reset --hard origin/master
            chmod +x ./run-api-prod.sh
            ./run-api-prod.sh
```


