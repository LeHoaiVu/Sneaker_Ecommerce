import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        attachment: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const ShoesModel = mongoose.model('Shoes', schema);
