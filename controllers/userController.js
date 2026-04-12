const { User } = require("../models");

exports.createUser = async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).json(data);
};

exports.getUsers = async (req, res) => {
    const data = await User.findAll();
    res.json(data);
};