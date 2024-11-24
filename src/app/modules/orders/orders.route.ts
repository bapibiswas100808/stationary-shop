import express from 'express';
import { OrderControllers } from './orders.controller';

const router = express.Router();

router.post('/create-order', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.getRevenue);

export const OrderRoutes = router;
