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
