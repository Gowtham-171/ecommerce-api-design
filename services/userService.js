const { User } = require("../dao/models");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;


exports.createUser = async (data) => {

  if (!data) {
    throw new Error("Request body required");
  }

  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("name, email, password required");
  }

  const exist = await User.findOne({ where: { email } });
  if (exist) {
    throw new Error("email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return await User.create({
    name,
    email,
    password: hashedPassword
  });
};


exports.getUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] }
  });
};


exports.getUserById = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


exports.updateUser = async (id, data) => {

  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Request body required for update");
  }

  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("name, email, password required for full update");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  const exist = await User.findOne({
    where: { email }
  });

  if (exist && exist.id != id) {
    throw new Error("email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await User.update(
    { name, email, password: hashedPassword },
    { where: { id } }
  );

  return await User.findByPk(id, {
    attributes: { exclude: ["password"] }
  });
};


exports.patchUser = async (id, data) => {

  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("At least one field required for patch update");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (data.email) {
    const exist = await User.findOne({ where: { email: data.email } });

    if (exist && exist.id != id) {
      throw new Error("email already exists");
    }
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  await User.update(data, {
    where: { id }
  });

  return await User.findByPk(id, {
    attributes: { exclude: ["password"] }
  });
};


exports.deleteUser = async (id) => {

  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  const deleted = await User.destroy({
    where: { id }
  });

  if (!deleted) {
    throw new Error("User not found");
  }

  return {
    message: "User deleted successfully"
  };
};