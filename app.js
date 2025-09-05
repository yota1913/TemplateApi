const express = require("express");
const models = require("./models");
const loadRoutes = require("./routes");

const app = express();
app.use(express.json());

models.sequelize.sync()
  .then(() => {
    console.log("✅ Conexión establecida con MariaDB");
    
    loadRoutes(app);

    const PORT = process.env.DOCKER_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
  });

