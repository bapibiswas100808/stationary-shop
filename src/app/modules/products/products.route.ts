import express from 'express';
import { ProductControllers } from './products.controller';

const router = express.Router();

// products route
router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updateSingleProduct);
router.delete('/:productId', ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
