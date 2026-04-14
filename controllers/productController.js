const productService = require("../services/productService");

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.patchProduct = async (req, res) => {
    try {
        const product = await productService.patchProduct(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Product patched successfully",
            data: product
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};