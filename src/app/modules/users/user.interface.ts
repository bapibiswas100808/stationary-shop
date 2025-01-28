import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
  email: string;
  status: 'active' | 'blocked';
  phone?: { type: string; default: 'N/A' };
  address?: { type: string; default: 'N/A' };
  city?: { type: string; default: 'N/A' };
};

export type TUserRole = keyof typeof USER_ROLE;
