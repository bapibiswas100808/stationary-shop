import { Schema, model } from 'mongoose';
import { Order } from './orders.interface';

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, 'Email is Required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'ProductModel',
    required: [true, 'Product is Required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is Required'],
    min: [1, 'You should select at least one product'],
  },
  totalPrice: { type: Number, required: [true, 'Total Price is Required'] },
});

export const OrderModel = model<Order>('Order', orderSchema);
