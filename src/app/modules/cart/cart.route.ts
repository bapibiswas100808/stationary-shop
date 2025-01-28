import express from 'express';
import { CartControllers } from './cart.controller';
import auth from '../../middlewars/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.user), CartControllers.getCartByUserEmail);
router.post(
  '/addToCart',
  auth(USER_ROLE.user),
  CartControllers.addProductToCart,
);

export const CartRoutes = router;
