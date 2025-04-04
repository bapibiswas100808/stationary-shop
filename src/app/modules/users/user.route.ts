import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewars/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.get('/allUser', auth(USER_ROLE.admin), UserControllers.getALlUser);
router.post(
  '/changeStatus/:email',
  auth(USER_ROLE.admin),
  UserControllers.changeStatus,
);
router.get(
  '/allUser/:email',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getSingleUser,
);
router.put(
  '/updateAddress/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.updateUserAddress,
);

export const UserRoutes = router;
