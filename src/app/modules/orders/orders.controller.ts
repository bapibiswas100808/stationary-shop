import { Request, Response } from 'express';
import { OrderServices } from './orders.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
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
};
