import express from 'express';
import { ProductControllers } from './products.controller';

const router = express.Router();

// will call controller
router.post('/create-product', ProductControllers.createProduct);
router.get('/all-products', ProductControllers.getAllProduct);
router.get('/:productId', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
