const { Product } = require("../dao/models");

const sanitizeProduct = (product) => {
    if (!product) return null;

    const { createdAt, updatedAt, ...productData } = product.toJSON();
    return productData;
};


const validateId = (id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        throw new Error("Invalid product id");
    }

    return parsedId;
};


const validateProductData = (data, isPatch = false) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Request body required");
    }

    const { name, price, stock } = data;

    const trimmedName = name?.trim();
    const parsedPrice = price !== undefined ? Number(price) : undefined;
    const parsedStock = stock !== undefined ? Number(stock) : undefined;

    if (!isPatch && (!trimmedName || parsedPrice === undefined || parsedStock === undefined)) {
        throw new Error("name, price, stock are required");
    }

    if (name !== undefined) {
        if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 45) {
            throw new Error("Name must be between 2 and 45 characters");
        }
    }

    if (price !== undefined) {
        if (String(price).trim() === "") {
            throw new Error("Price is required");
        }

        if (!Number.isFinite(parsedPrice)) {
            throw new Error("Price must be a number");
        }

        if (parsedPrice <= 0) {
            throw new Error("Price must be greater than 0");
        }
    }

    if (stock !== undefined) {
        if (String(stock).trim() === "") {
            throw new Error("Stock is required");
        }

        if (!Number.isFinite(parsedStock)) {
            throw new Error("Stock must be a number");
        }

        if (!Number.isInteger(parsedStock)) {
            throw new Error("Stock must be an integer");
        }

        if (parsedStock < 0) {
            throw new Error("Stock cannot be negative");
        }
    }

    return { name: trimmedName, price: parsedPrice, stock: parsedStock, description: data.description };
};


const buildUpdatePayload = (data) => {
    const payload = {};

    if (data.name !== undefined) payload.name = data.name;
    if (data.price !== undefined) payload.price = data.price;
    if (data.description !== undefined) payload.description = data.description;
    if (data.stock !== undefined) payload.stock = data.stock;

    return payload;
};


exports.createProduct = async (data) => {
    const cleaned = validateProductData(data);

    const product = await Product.create({
        name: cleaned.name,
        price: cleaned.price,
        description: cleaned.description,
        stock: cleaned.stock
    });

    return sanitizeProduct(product);
};


exports.getProducts = async () => {
    return await Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });
};


exports.getProductById = async (id) => {
    const parsedId = validateId(id);

    const product = await Product.findByPk(parsedId, {
        attributes: { exclude: ["createdAt", "updatedAt"] }
    });

    if (!product) throw new Error("Product not found");

    return product;
};


exports.updateProduct = async (id, data) => {
    const parsedId = validateId(id);

    const cleaned = validateProductData(data);

    const product = await Product.findByPk(parsedId);
    if (!product) throw new Error("Product not found");

    const payload = buildUpdatePayload(cleaned);
    await product.update(payload);

    return sanitizeProduct(product);
};


exports.patchProduct = async (id, data) => {
    const parsedId = validateId(id);

    const cleaned = validateProductData(data, true);

    const product = await Product.findByPk(parsedId);
    if (!product) throw new Error("Product not found");

    const payload = buildUpdatePayload(cleaned);
    await product.update(payload);

    return sanitizeProduct(product);
};


exports.deleteProduct = async (id) => {
    const parsedId = validateId(id);

    const product = await Product.findByPk(parsedId);
    if (!product) throw new Error("Product not found");

    await product.destroy();

    return true;
};