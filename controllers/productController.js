const productService = require("../services/productService");

exports.createProduct = async (req, res) => {
    try {
        const data = await productService.createProduct(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const data = await productService.getProducts();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const data = await productService.getProductById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const data = await productService.updateProduct(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.patchProduct = async (req, res) => {
    try {
        const data = await productService.patchProduct(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const data = await productService.deleteProduct(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};