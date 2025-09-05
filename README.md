# Template API 🚀

API backend en **Node.js + Express + Sequelize** con **MariaDB/MySQL**.  
Preparada para correr tanto en desarrollo como en producción usando **Docker Compose**.

---

## 📂 Estructura del proyecto

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

#Para desarrollo

```bash
docker-compose up --build
```

