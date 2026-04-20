const { Product } = require("../dao/models");

const validateId = (id) => {
    const parsed = Number(id);
    if (!id || !Number.isInteger(parsed) || parsed <= 0) {
        throw new Error("Invalid product id");
    }
};

const validateProductData = (data, isPatch = false) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Request body required");
    }

    const { name, price, stock } = data;

    if (!isPatch && (!name || price === undefined || stock === undefined)) {
        throw new Error("name, price, stock are required");
    }

    if (name !== undefined) {
        if (name.trim().length < 2 || name.trim().length > 45) {
            throw new Error("Name must be between 2 and 45 characters");
        }
    }

    if (price !== undefined) {
        const parsedPrice = Number(price);

        if (!Number.isFinite(parsedPrice)) {
            throw new Error("Price must be a number");
        }
        if (parsedPrice <= 0) {
            throw new Error("Price must be greater than 0");
        }
    }

    if (stock !== undefined) {
        const parsedStock = Number(stock);
        if (!Number.isInteger(parsedStock)) {
            throw new Error("Stock must be an integer");
        }
        if (parsedStock < 0) {
            throw new Error("Stock cannot be negative");
        }
    }
};

const buildUpdatePayload = (data) => {
    const payload = {};

    if (data.name !== undefined) payload.name = data.name.trim();
    if (data.price !== undefined) payload.price = data.price;
    if (data.description !== undefined) payload.description = data.description;
    if (data.stock !== undefined) payload.stock = data.stock;

    return payload;
};


exports.createProduct = async (data) => {
    validateProductData(data);

    const { name, price, description, stock } = data;

    return await Product.create({ name: name.trim(), price, description, stock });
};


exports.getProducts = async () => {
    return await Product.findAll();
};


exports.getProductById = async (id) => {
    validateId(id);

    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    return product;
};


exports.updateProduct = async (id, data) => {
    validateId(id);
    validateProductData(data);

    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    const payload = buildUpdatePayload(data);
    await product.update(payload);

    return product;
};


exports.patchProduct = async (id, data) => {
    validateId(id);
    validateProductData(data, true);

    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    const payload = buildUpdatePayload(data);
    await product.update(payload);

    return product;
};


exports.deleteProduct = async (id) => {
    validateId(id);

    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();

    return true;
};