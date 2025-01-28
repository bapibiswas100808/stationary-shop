import { model, Schema } from 'mongoose';
import { ICart, ICartItem } from './cart.interface';

const CartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  subTotal: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>({
  email: {
    type: String,
    required: true,
    ref: 'User',
    unique: true,
  },
  cartItems: { type: [CartItemSchema], default: [] },
  totalPrice: { type: Number, default: 0 },
});

const Cart = model<ICart>('Cart', CartSchema);

export default Cart;
