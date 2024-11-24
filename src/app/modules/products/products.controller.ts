import { Request, Response } from 'express';
import { ProductServices } from './products.service';

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.createProductToDB(product);
    // send response
    res.status(200).json({
      success: true,
      message: 'Product Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

// get all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductToDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'Product Found Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

// get single product
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateSingleProductToDB(
      productId,
      updateData,
    );
    // send response
    res.status(200).json({
      success: true,
      message: 'Specific Product Updated Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};
// delete single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    // send response
    res.status(200).json({
      success: true,
      message: 'Specific Product deleted Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Validation Error',
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
