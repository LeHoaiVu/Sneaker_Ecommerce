import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ['confirmed', 'delivering', 'delivered'],
        },
        shoes: [{ _id: false, prodId: String, prodNumber: Number }],
    },
    { timestamps: true }
);

export const OrdersModel = mongoose.model('Orders', schema);
