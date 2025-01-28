import { Types } from 'mongoose';

export type Order = {
  email: string;
  product: Types.ObjectId | object[];
  quantity: number;
  price?: number;
  totalPrice?: number;
  status: 'pending' | 'shipping' | 'cancelled';
  isDeleted: boolean;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};
