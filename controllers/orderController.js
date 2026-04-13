const orderService = require("../services/orderService");


exports.createOrder = async (req, res) => {
    try {
        const data = await orderService.createOrder(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const data = await orderService.getOrders();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const data = await orderService.getOrderById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const data = await orderService.updateOrder(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.patchOrder = async (req, res) => {
    try {
        const data = await orderService.patchOrder(
            req.params.id,
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const data = await orderService.deleteOrder(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};