const { Product } = require("../dao/models");


exports.createProduct = async (data) => {
    if (!data) {
        throw new Error("Request body required");
    }

    const { name, price, description, stock } = data;

    if (!name || !price || !stock) {
        throw new Error("name, price, stock");
    }

    if (price <= 0) {
        throw new Error("price must be greater than 0");
    }

    if (stock < 0) {
        throw new Error("stock cannot be negative");
    }

    return await Product.create({
        name, price, description, stock
    });
};


exports.getProducts = async () => {
    return await Product.findAll();
};


exports.getProductById = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product id");
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


exports.updateProduct = async (id, data) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("Request body required for update");
    }

    const { name, price, description, stock } = data;

    if (!name || !price || !stock ) {
        throw new Error("name, price, stock required for full update");
    }

    if (price <= 0) {
        throw new Error("price must be greater than 0");
    }

    if (stock < 0) {
        throw new Error("stock cannot be negative");
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await Product.update(
        { name, price, description, stock},
        { where: { id } }
    );

    return await Product.findByPk(id);
};


exports.patchProduct = async (id, data) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("At least one field required for patch update");
    }

    if (data.price && data.price <= 0) {
        throw new Error("price must be greater than 0");
    }

    if (data.stock && data.stock < 0) {
        throw new Error("stock cannot be negative");
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await Product.update(data, {
        where: { id }
    });

    return await Product.findByPk(id);
};


exports.deleteProduct = async (id) => {
    if (!id || isNaN(id)) {
        throw new Error("Invalid product id");
    }

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.destroy();

    return true;
};