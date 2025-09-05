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

## 📝 Ejemplos Modelo, Controlador, Servicio y Ruta

### 1. Ejemplo de modelo

```bash
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false,field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, allowNull: false,field: 'updated_at' },
    },
    {
      timestamps: true,
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
  
    return Users;
  };
```
### 2. Ejemplo de controlador

```bash
const service = require("./auth.service");

async function getUsers(req, res) {
  try {
    res.json(await service.getAll());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}

async function getUser(req, res) {
  try {
    const user = await service.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

async function createUser(req, res) {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await service.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
}

async function deleteUser(req, res) {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };

```

### 3. Ejemplo de servicio

```bash
const { Users } = require("../../models/index");

async function getAll() {
  return await Users.findAll();
}

async function getById(id) {
  return await Users.findByPk(id);
}

async function create(data) {
  return await User.create(data);
}

async function update(id, data) {
  const user = await User.findByPk(id);
  return user ? await user.update(data) : null;
}

async function remove(id) {
  const user = await User.findByPk(id);
  return user ? await user.destroy() : null;
}

module.exports = { getAll, getById, create, update, remove };
```

### 4. Ejemplo de Rutas

```bash
const express = require("express");
const controller = require("./auth.controller");

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
```

--

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

### 2. Ejecutar en producción
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

---

## Desarrollo

### Ejecutar en desarrollo

```bash
docker-compose up --build
```


