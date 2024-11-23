import { Request, Response } from 'express';
import { ProductServices } from './products.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;
    const result = await ProductServices.createProductToDB(product);
    // send response
    res.status(200).json({
      success: true,
      message: 'Product Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductToDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'Product Found Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    // send response
    res.status(200).json({
      success: true,
      message: 'Specific Product Found Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
};
