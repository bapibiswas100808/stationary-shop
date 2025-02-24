import express from 'express';
import { OrderControllers } from './orders.controller';
import auth from '../../middlewars/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

// create order
router.post('/', auth(USER_ROLE.user), OrderControllers.createOrder);
// router.post('/addToCart', auth(USER_ROLE.user), OrderControllers.addToCart);

// generate revenue
router.get('/revenue', OrderControllers.getRevenue);
router.post(
  '/createOrder',
  auth(USER_ROLE.user, USER_ROLE.admin),
  OrderControllers.createOrderCart,
);
router.get(
  '/verifyPayment',
  auth(USER_ROLE.user),
  OrderControllers.verifyPayment,
);
router.put(
  '/deleteOrder/:id',
  auth(USER_ROLE.user),
  OrderControllers.deleteOrder,
);
router.get(
  '/singleOrder/:id',
  auth(USER_ROLE.user),
  OrderControllers.getSingleOrder,
);
router.put(
  '/changeStatus/:id',
  auth(USER_ROLE.user),
  OrderControllers.changeOrderStatus,
);
router.put(
  '/updateOrder/:id',
  auth(USER_ROLE.user),
  OrderControllers.updateOrder,
);
router.get('/getAllOrder', auth(USER_ROLE.admin), OrderControllers.getAllOrder);

export const OrderRoutes = router;
