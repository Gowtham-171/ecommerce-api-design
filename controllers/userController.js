const userService = require("../services/userService");

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.patchUser = async (req, res) => {
    try {
        const user = await userService.patchUser(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "User patched successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};