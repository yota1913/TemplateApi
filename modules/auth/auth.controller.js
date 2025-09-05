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
