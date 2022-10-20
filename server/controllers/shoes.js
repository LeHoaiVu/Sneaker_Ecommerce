import { ShoesModel } from '../models/ShoesModel.js';

export const getMenShoes = async (req, res) => {
    try {
        // const shoes = new ShoesModel({
        //     name: 'vu',
        //     price: 100,
        // });
        // shoes.save();
        const menShoes = await ShoesModel.find();
        res.status(200).json(menShoes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const publishMenShoes = async (req, res) => {
    try {
        const newShoes = req.body;
        const shoes = new ShoesModel(newShoes);
        shoes.save();
        res.status(200).json(shoes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getShoesFromCart = async (req, res, next) => {
    try {
        const cart = req.body;
        let userCartShoes = [];
        for (let i = 0; i < cart.length; i++) {
            let userCartShoesItem = await ShoesModel.findOne({
                _id: cart[i].prodId,
            });
            userCartShoes = [...userCartShoes, userCartShoesItem];
        }
        res.status(200).json(userCartShoes);
    } catch (error) {
        res.status(500).json({ message: 'Error in get item from cart', error });
    }
};
