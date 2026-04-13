const { Order, User, Product } = require("../dao/models");


exports.createOrder = async (data) => {

    if (!data || typeof data !== "object") {
        throw new Error("Request body required");
    }

    const { user_id, product_id, quantity, total_price, status } = data;

    if (!user_id || !product_id || !quantity || !total_price) {
        throw new Error("user_id, product_id, quantity, total_price required");
    }

    if (quantity <= 0) {
        throw new Error("quantity must be greater than 0");
    }

    if (total_price <= 0) {
        throw new Error("total_price must be greater than 0");
    }

    const user = await User.findByPk(user_id);
    if (!user) {
        throw new Error("User not found");
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
        throw new Error("Product not found");
    }

    return await Order.create({
        user_id,
        product_id,
        quantity,
        total_price,
        status
    });
};


exports.getOrders = async () => {
    return await Order.findAll({
        include: ["user", "product"]
    });
};


exports.getOrderById = async (id) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid order id");
    }

    const order = await Order.findByPk(id, {
        include: ["user", "product"]
    });

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};


exports.updateOrder = async (id, data) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid order id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("Request body required");
    }

    const { user_id, product_id, quantity, total_price, status } = data;

    if (!user_id || !product_id || !quantity || !total_price) {
        throw new Error("All fields required for full update");
    }

    const order = await Order.findByPk(id);

    if (!order) {
        throw new Error("Order not found");
    }

    await Order.update(
        { user_id, product_id, quantity, total_price, status },
        { where: { id } }
    );

    return await Order.findByPk(id);
};


exports.patchOrder = async (id, data) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid order id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("At least one field required");
    }

    const order = await Order.findByPk(id);

    if (!order) {
        throw new Error("Order not found");
    }

    await Order.update(data, {
        where: { id }
    });

    return await Order.findByPk(id);
};


exports.deleteOrder = async (id) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid order id");
    }

    const deleted = await Order.destroy({
        where: { id }
    });

    if (!deleted) {
        throw new Error("Order not found");
    }

    return {
        message: "Order deleted successfully"
    };
};