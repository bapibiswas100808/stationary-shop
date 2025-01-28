import { Types } from 'mongoose';

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  subTotal: number;
}

export interface ICart {
  email: string;
  cartItems: ICartItem[];
  totalPrice: number;
}
