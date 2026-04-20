const { User } = require("../dao/models");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const removePassword = (user) => {
  const { password, ...userData } = user.toJSON();
  return userData;
};

const validateId = (id) => {
  const parsed = Number(id);
  if (!id || !Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid user id");
  }
};

const validateUserData = (data, isPatch = false) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Request body required");
  }

  const { name, email, password } = data;

  if (!isPatch && (!name || !email || !password)) {
    throw new Error("name, email, password are required");
  }

  if (name !== undefined) {
    if (name.trim().length < 3 || name.trim().length > 45) {
      throw new Error("Name must be between 3 and 45 characters");
    }
  }

  if (email !== undefined) {
    if (email.trim().length > 100) {
      throw new Error("Email too long");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("Invalid email format");
    }
  }

  if (password !== undefined) {
    if (password.length < 6 || password.length > 128) {
      throw new Error("Password must be between 6 and 128 characters");
    }
  }
};

const checkEmailExists = async (email, userId = null) => {
  if (!email) return;

  const existing = await User.findOne({ where: { email: email.trim() } });

  if (existing && existing.id !== userId) {
    throw new Error("Email already exists");
  }
};

const buildUpdatePayload = async (data) => {
  const payload = {};

  if (data.name !== undefined) payload.name = data.name.trim();
  if (data.email !== undefined) payload.email = data.email.trim();
  if (data.password !== undefined) payload.password = await bcrypt.hash(data.password, SALT_ROUNDS);

  return payload;
};


exports.createUser = async (data) => {
  validateUserData(data);

  const { name, email, password } = data;

  await checkEmailExists(email);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name: name.trim(),
    email: email.trim(),
    password: hashedPassword,
  });

  return removePassword(user);
};


exports.getUsers = async () => {
  const users = await User.findAll();
  return users.map(removePassword);
};


exports.getUserById = async (id) => {
  validateId(id);

  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  return removePassword(user);
};


exports.updateUser = async (id, data) => {
  validateId(id);
  validateUserData(data);

  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await checkEmailExists(data.email, user.id);

  const payload = await buildUpdatePayload(data);
  await user.update(payload);

  return removePassword(user);
};


exports.patchUser = async (id, data) => {
  validateId(id);
  validateUserData(data, true);

  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await checkEmailExists(data.email, user.id);

  const payload = await buildUpdatePayload(data);
  await user.update(payload);

  return removePassword(user);
};


exports.deleteUser = async (id) => {
  validateId(id);

  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.destroy();

  return true;
};