import express from 'express';
import { ProductControllers } from './products.controller';
import auth from '../../middlewars/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

// products route

// post a product
router.post('/', auth(USER_ROLE.admin), ProductControllers.createProduct);

// get all products
router.get('/', ProductControllers.getAllProduct);

// get single product
router.get('/:productId', ProductControllers.getSingleProduct);

// put update of a product
router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductControllers.updateSingleProduct,
);

// delete a product
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductControllers.deleteSingleProduct,
);

export const ProductRoutes = router;
