import express from 'express';
import { addNewOrder, getOrders } from '../../controllers/orders.js';

const router = express.Router();

router.get('/', getOrders);
router.post('/add-new', addNewOrder);

export default router;
