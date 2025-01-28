/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';
import { CartServices } from './cart.service';

const getCartByUserEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user.email;
    const result = await CartServices.getCartFromDb(userEmail);
    res.status(200).json({
      success: true,
      message: 'Retrived Your Cart Succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

const addProductToCart = async (req: Request, res: Response) => {
  const userEmail = req.user.email;
  const { productId, price, quantity } = req.body;

  try {
    const cart = await CartServices.addToCart(
      userEmail,
      productId,
      price,
      quantity,
    );
    res.status(200).json({
      success: true,
      message: 'Product added to Your Cart Succesfully',
      data: cart,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

export const CartControllers = { getCartByUserEmail, addProductToCart };
