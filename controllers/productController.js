const { Product, Category } = require("../models");

exports.createProduct = async (req, res) => {
    const data = await Product.create(req.body);
    res.status(201).json(data);
};

exports.getProducts = async (req, res) => {
    const data = await Product.findAll({
        include: {
            model: Category,
            as: "category"
        }
    });

    res.json(data);
};