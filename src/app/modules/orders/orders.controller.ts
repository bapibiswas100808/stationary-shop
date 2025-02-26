/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './orders.service';
import { OrderModel } from './orders.model';

// add to cart
// const addToCart = async (req: Request, res: Response) => {
//   try {
//     const { productId, quantity } = req.body;
//     const email = req.user.email;
//     const result = await OrderServices.addToCartToDb(
//       email,
//       productId,
//       quantity,
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Added to Cart Successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(200).json({
//       success: false,
//       message: error.message || 'Validation Error',
//       error: error,
//     });
//   }
// };
// Create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { product, quantity, totalPrice } = req.body;
    const email = req.user.email;
    const result = await OrderServices.createNewOrderToDb(
      email,
      product,
      quantity,
      totalPrice,
    );

    res.status(200).json({
      success: true,
      message: 'Order Created Successfully',
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
const createOrderCart = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;
    const result = await OrderServices.createOrderFromCart(email, req.ip!);

    res.status(200).json({
      success: true,
      message: 'Order Created Successfully',
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
const verifyPayment = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.verifyPayment(
      req.query.order_id as string,
    );

    res.status(200).json({
      success: true,
      message: 'Payment Verified Successfully',
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
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrder();

    res.status(200).json({
      success: true,
      message: 'All Order retrived  Successfully',
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
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await OrderServices.deleteOrder(id);

    res.status(200).json({
      success: true,
      message: 'Order deleted  Successfully',
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
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.getSingleOrder(id);

    res.status(200).json({
      success: true,
      message: 'Order retreived Successfully',
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
const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    const result = await OrderServices.changeOrderStatus(
      id,
      order?.status as string,
    );

    res.status(200).json({
      success: true,
      message: 'Status Changed Successfully',
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

// update order
const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity, totalPrice } = req.body;

  try {
    // Pass only the fields that are provided in the request
    const updateData: any = {};
    if (quantity !== undefined) updateData.quantity = quantity;
    if (totalPrice !== undefined) updateData.totalPrice = totalPrice;

    // Call service to update order
    const updatedOrder = await OrderServices.updateOrder(id, updateData);

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update order',
    });
  }
};

// generate revenue
const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getRevenueFromDB();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated Successfully',
      data: {
        totalRevenue: result,
      },
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
  createOrderCart,
  verifyPayment,
  getAllOrder,
  deleteOrder,
  getSingleOrder,
  changeOrderStatus,
  updateOrder,
};
