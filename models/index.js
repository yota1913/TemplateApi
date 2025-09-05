const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../conection/database");

/**
 * Carga los modelos de los módulos
 * 
 */
const db = {};

const modulesPath = path.join(__dirname, "../modules");

fs.readdirSync(modulesPath).forEach((moduleName) => {
  const modelPath = path.join(modulesPath, moduleName, `${moduleName}.model.js`);

  if (fs.existsSync(modelPath)) {
    const modelDefiner = require(modelPath);
    const model = modelDefiner(sequelize, DataTypes);
    db[model.name] = model;
    console.log(`✅ Modelo cargado: ${model.name}`);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
