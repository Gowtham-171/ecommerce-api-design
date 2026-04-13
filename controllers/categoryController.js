const categoryService = require("../services/categoryService");


exports.createCategory = async (req, res) => {
    try {
        const data = await categoryService.createCategory(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getCategories = async (req, res) => {
    try {
        const data = await categoryService.getCategories();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getCategoryById = async (req, res) => {
    try {
        const data = await categoryService.getCategoryById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const data = await categoryService.updateCategory(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.patchCategory = async (req, res) => {
    try {
        const data = await categoryService.patchCategory(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const data = await categoryService.deleteCategory(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};