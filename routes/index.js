const fs = require("fs");
const path = require("path");
/**
 * Carga las rutas de los módulos
 * 
 */
function loadRoutes(app) {
  const modulesPath = path.join(__dirname, "../modules");

  fs.readdirSync(modulesPath).forEach((moduleName) => {
    const routePath = path.join(modulesPath, moduleName, `${moduleName}.routes.js`);

    if (fs.existsSync(routePath)) {
      const router = require(routePath);
      app.use(`/api/${moduleName}`, router);
    }
  });
}

module.exports = loadRoutes;
