const { Category } = require("../models");

exports.createCategory = async (req, res) => {
    try {
        const data = await Category.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

exports.getCategories = async (req, res) => {
    const data = await Category.findAll();
    res.json(data);
};