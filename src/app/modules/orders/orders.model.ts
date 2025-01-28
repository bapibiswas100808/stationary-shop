import { Schema, model } from 'mongoose';
import { Order } from './orders.interface';

const orderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: [true, 'Product is Required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is Required'],
      min: [1, 'You should select at least one product'],
    },
    totalPrice: { type: Number, required: [true, 'Total Price is Required'] },
    status: {
      type: String,
      enum: ['pending', 'shipping', 'cancelled'],
      required: true,
      default: 'pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const OrderModel = model<Order>('Order', orderSchema);
