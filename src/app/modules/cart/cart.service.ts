import { Types } from 'mongoose';
import Cart from './cart.model';
import { ProductModel } from '../products/products.model';
import { User } from '../users/user.model';

const getCartFromDb = async (userEmail: string) => {
  // fet cart data
  const cart = await Cart.findOne({ email: userEmail }).populate(
    'cartItems.productId',
  );

  // Fetch the user
  const user = await User.findOne({ email: userEmail });

  // Return the cart and user data
  return { cart, user };
};

const addToCart = async (
  userEmail: string,
  productId: Types.ObjectId,
  price: number,
  quantity: number,
) => {
  const subTotal = price * quantity;

  const product = await ProductModel.findById(productId);

  //   if product not found
  if (!product) {
    throw new Error('Product not found');
  }
  // if product quantity is 0
  if (!product.inStock) {
    throw new Error('Stock out');
  }
  // if product quantity is less
  if (product.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  // Fetch cart by email
  let cart = await Cart.findOne({ email: userEmail });

  if (!cart) {
    // Create a new cart if it doesn't exist
    cart = new Cart({
      email: userEmail, // Explicitly set "email" field
      cartItems: [{ productId, quantity, price, subTotal }],
      totalPrice: subTotal,
    });
  } else {
    // Check if the product already exists
    const existingItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (existingItem) {
      // Update quantity and subTotal of the existing product
      existingItem.quantity += quantity;
      existingItem.subTotal += subTotal;
    } else {
      // Add new product to cart
      cart.cartItems.push({ productId, quantity, price, subTotal });
    }

    // Recalculate the totalPrice
    cart.totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0,
    );
  }

  // Save cart
  await cart.save();
  return cart;
};

export const CartServices = { addToCart, getCartFromDb };
