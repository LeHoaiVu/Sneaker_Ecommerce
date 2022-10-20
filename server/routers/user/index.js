import express from 'express';
import {
    login,
    register,
    addToCart,
    removeFromCart,
    updateToCart,
} from '../../controllers/users.js';
import { authenToken } from '../../utilities/helpers/handleToken.js';
// import { UserValidator } from '../../validators/userValidator.js';
const router = express.Router();

// router.post('/register', UserValidator, register);
router.post('/register', register);
router.post('/login', login);
router.post('/add-to-cart', authenToken, addToCart);
router.put('/update-to-cart', authenToken, updateToCart);
router.put('/remove-from-cart', authenToken, removeFromCart);

export default router;
