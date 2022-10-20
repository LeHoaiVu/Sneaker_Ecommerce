import express from 'express';
import {
    getMenShoes,
    getShoesFromCart,
    publishMenShoes,
} from '../../controllers/shoes.js';
import { authenToken } from '../../utilities/helpers/handleToken.js';

const router = express.Router();

// router.get('/', authenToken, getMenShoes);
router.get('/', getMenShoes);
router.post('/', publishMenShoes);
router.post('/:slug', authenToken, getShoesFromCart);
export default router;
