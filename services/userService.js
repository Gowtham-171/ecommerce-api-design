const { User } = require("../dao/models");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const removePassword = (user) => {
  const { password, ...userData } = user.toJSON();
  return userData;
};


exports.createUser = async (data) => {
  if (!data) {
    throw new Error("Request body required");
  }

  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("name, email, password required");
  }

  if (password.length < 6) {
    throw new Error("password must be at least 6 characters");
  }

  const exist = await User.findOne({ where: { email } });

  if (exist) {
    throw new Error("email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ name, email, password: hashedPassword });

  return removePassword(user);
};


exports.getUsers = async () => {
  const users = await User.findAll();

  return users.map(user => removePassword(user));
};


exports.getUserById = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return removePassword(user);
};


exports.updateUser = async (id, data) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Request body required");
  }

  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("name, email, password required");
  }

  if (password.length < 6) {
    throw new Error("password must be at least 6 characters");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await user.update({ name, email, password: hashedPassword });

  return removePassword(user);
};


exports.patchUser = async (id, data) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Request body required");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (data.password && data.password.length < 6) {
    throw new Error("password must be at least 6 characters");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  await user.update(data);

  return removePassword(user);
};


exports.deleteUser = async (id) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();

  return true;
};