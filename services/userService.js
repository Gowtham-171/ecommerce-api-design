const { User } = require("../dao/models");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const sanitizeUser = (user) => {
  if (!user) return null;

  const { password, createdAt, updatedAt, ...userData } = user.toJSON();
  return userData;
};


const validateId = (id) => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new Error("Invalid user id");
  }

  return parsedId;
};


const validateUserData = (data, isPatch = false) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Request body required");
  }

  const { name, email, password } = data;

  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedPassword = password?.trim();

  if (!isPatch && (!trimmedName || !trimmedEmail || !trimmedPassword)) {
    throw new Error("name, email, password are required");
  }

  if (name !== undefined) {
    if (!trimmedName || trimmedName.length < 3 || trimmedName.length > 45) {
      throw new Error("Name must be between 3 and 45 characters");
    }
  }

  if (email !== undefined) {
    if (!trimmedEmail) {
      throw new Error("Email cannot be empty");
    }

    if (trimmedEmail.length > 100) {
      throw new Error("Email too long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Invalid email format");
    }
  }

  if (password !== undefined) {
    if (!trimmedPassword) {
      throw new Error("Password cannot be empty");
    }

    if (trimmedPassword.length < 6 || trimmedPassword.length > 128) {
      throw new Error("Password must be between 6 and 128 characters");
    }
  }

  return { name: trimmedName, email: trimmedEmail, password: trimmedPassword };
};


const checkEmailExists = async (email, userId = null) => {
  if (email === undefined) return;

  if (!email) {
    throw new Error("Email cannot be empty");
  }

  const existing = await User.findOne({ where: { email } });

  if (existing && existing.id !== userId) {
    throw new Error("Email already exists");
  }
};


const buildUpdatePayload = async (data) => {
  const payload = {};

  if (data.name !== undefined) payload.name = data.name;
  if (data.email !== undefined) payload.email = data.email;

  if (data.password !== undefined) {
    payload.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  return payload;
};


exports.createUser = async (data) => {
  const cleaned = validateUserData(data);

  await checkEmailExists(cleaned.email);

  const hashedPassword = await bcrypt.hash(cleaned.password, SALT_ROUNDS);

  const user = await User.create({ name: cleaned.name, email: cleaned.email, password: hashedPassword });

  return sanitizeUser(user);
};


exports.getUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  });
};


exports.getUserById = async (id) => {
  const parsedId = validateId(id);

  const user = await User.findByPk(parsedId, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  });

  if (!user) throw new Error("User not found");

  return user;
};


exports.updateUser = async (id, data) => {
  const parsedId = validateId(id);

  const cleaned = validateUserData(data);

  const user = await User.findByPk(parsedId);
  if (!user) throw new Error("User not found");

  if (cleaned.email && cleaned.email !== user.email) {
    await checkEmailExists(cleaned.email, user.id);
  }

  const payload = await buildUpdatePayload(cleaned);
  await user.update(payload);

  return sanitizeUser(user);
};


exports.patchUser = async (id, data) => {
  const parsedId = validateId(id);
  const cleaned = validateUserData(data, true);

  const user = await User.findByPk(parsedId);
  if (!user) throw new Error("User not found");

  if (cleaned.email && cleaned.email !== user.email) {
    await checkEmailExists(cleaned.email, user.id);
  }

  const payload = await buildUpdatePayload(cleaned);
  await user.update(payload);

  return sanitizeUser(user);
};


exports.deleteUser = async (id) => {
  const parsedId = validateId(id);

  const user = await User.findByPk(parsedId);
  if (!user) throw new Error("User not found");

  await user.destroy();

  return true;
};