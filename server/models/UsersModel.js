import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        role: {
            type: String,
            enum: ['seller', 'customer'],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        password_confirm: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        // cart: {
        //     type: Array,
        // },
        cart: [{ _id: false, prodId: String, prodNumber: Number }],
    },
    { timestamps: true }
);

export const UsersModel = mongoose.model('Users', schema);
