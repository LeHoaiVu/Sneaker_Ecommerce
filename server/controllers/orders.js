import { OrdersModel } from '../models/OrdersModel.js';

export const addNewOrder = async (req, res, next) => {
    try {
        const newOrder = new OrdersModel(req.body);
        await newOrder.save();
        res.status(200).json({ newOrder });
    } catch (error) {
        res.status(500).json({ msg: 'Can not add new order', error });
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const myOrders = await OrdersModel.find();
        res.status(200).json(myOrders);
    } catch (error) {
        res.status(500).json({ message: 'Can not get orders', error });
    }
};
