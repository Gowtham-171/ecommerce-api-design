const { Order, Product, User } = require("../dao/models");

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

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: { exclude: ["password"] }
                },
                {
                    model: Product,
                    as: "product"
                }
            ]
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json(error.message);
    }
};