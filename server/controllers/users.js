import { check } from 'express-validator';
import { UsersModel } from '../models/UsersModel.js';
import { createToken } from '../utilities/helpers/handleToken.js';
import { removeFirst } from '../utilities/helpers/index.js';

export const register = async (req, res, next) => {
    try {
        let user = await UsersModel.findOne({ email: req.body.email });
        if (user) {
            res.status(500).json({ error: 'Email has been used' });
            return;
        }
        const newUser = new UsersModel(req.body);
        await newUser.save();
        res.status(200).json({ newUser });
    } catch (error) {
        res.status(500).json({ msg: 'Error in register', error });
    }
};

// Check if the user exists in database
const isAuthenticated = async ({ email, password }) => {
    const checkUserExist = await UsersModel.exists({ email, password });
    return !!checkUserExist;
};

const refreshToken = async (req, res) => {};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if ((await isAuthenticated({ email, password })) === false) {
            res.status(400).json({ error: 'Incorrect email or password' });
            return;
        }
        const userInfo = await UsersModel.findOne({ email, password });
        const access_token = createToken({ email, password }, false);
        // const refresh_token = createToken({ email, password }, true);
        const { _id, username, role, createdAt, updatedAt, cart } = userInfo;
        res.status(200).json({
            userInfo: {
                username,
                role,
                createdAt,
                updatedAt,
                email,
                _id,
                cart,
            },
            access_token,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error in login', error });
    }
};

export const updateToCart = async (req, res, next) => {
    try {
        const updatedCart = req.body;
        const userInfo = await UsersModel.findOne({
            _id: updatedCart._id,
        });
        if (!userInfo) {
            res.status(400).json({ err: 'Can not find this user' });
            return;
        }
        userInfo['cart'] = updatedCart.cart;

        const { _id, email, username, role, createdAt, updatedAt, cart } =
            userInfo;
        await userInfo.save();
        res.status(200).json({
            userInfo: {
                username,
                role,
                createdAt,
                updatedAt,
                email,
                _id,
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error in update to cart', error });
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const updatedCart = req.body;
        const userInfo = await UsersModel.findOne({
            _id: updatedCart._id,
        });

        if (!userInfo) {
            res.status(500).json({ msg: 'User does not exist' });
            return;
        }

        const checkUserInfo = await UsersModel.findOne({
            _id: updatedCart._id,
            'cart.prodId': updatedCart.cart,
        });

        //prod has not exist in cart before
        if (!checkUserInfo) {
            const { _id, email, username, role, createdAt, updatedAt, cart } =
                userInfo;
            userInfo.cart.push({ prodId: updatedCart.cart, prodNumber: 1 });
            await userInfo.save();
            res.status(200).json({
                userInfo: {
                    username,
                    role,
                    createdAt,
                    updatedAt,
                    email,
                    _id,
                    cart,
                },
            });
            return;
        }

        //prod exists in cart
        await UsersModel.updateOne(
            {
                _id: updatedCart._id,
                'cart.prodId': updatedCart.cart,
            },
            { $inc: { 'cart.$.prodNumber': 1 } },
            { new: true }
        );

        const updatedUserInfo = await UsersModel.findOne({
            _id: updatedCart._id,
        });
        const { _id, email, username, role, createdAt, updatedAt, cart } =
            updatedUserInfo;
        res.status(200).json({
            userInfo: {
                username,
                role,
                createdAt,
                updatedAt,
                email,
                _id,
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error in add to cart', error });
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const { userId, cartDeleted } = req.body;
        const userInfo = await UsersModel.findOne({
            _id: userId,
        });
        if (!userInfo) {
            res.status(500).json({ msg: 'Can not find this account' });
            return;
        }
        cartDeleted.map((cartDeletedItem) => {
            userInfo.cart = userInfo.cart.filter((cartItem) => {
                return cartItem.prodId !== cartDeletedItem;
            });
        });
        const { _id, email, username, role, createdAt, updatedAt, cart } =
            userInfo;
        await userInfo.save();
        res.status(200).json({
            userInfo: {
                username,
                role,
                createdAt,
                updatedAt,
                email,
                _id,
                cart,
            },
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error in remove from cart', error });
    }
};
