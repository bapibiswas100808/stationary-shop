import { ObjectId } from 'mongoose';
export type order = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
};
