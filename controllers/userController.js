const userService = require("../services/userService");

exports.createUser = async (req, res) => {
    try {
        const data = await userService.createUser(req.body);
        res.status(201).json(data);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const data = await userService.getUsers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const data = await userService.getUserById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const data = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.patchUser = async (req, res) => {
    try {
        const data = await userService.patchUser(req.params.id, req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const data = await userService.deleteUser(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};