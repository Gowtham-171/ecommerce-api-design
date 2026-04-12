const { Order, Product } = require("../models");

exports.createOrder = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    const product = await Product.findByPk(product_id);

    const total = product.price * quantity;

    const order = await Order.create({
        user_id,
        product_id,
        quantity,
        total_price: total
    });

    res.status(201).json(order);
};