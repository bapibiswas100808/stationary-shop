import { Product } from './products.interface';
import { ProductModel } from './products.model';

// create product
const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get product
const getAllProductToDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new Error('Product not found or it has been deleted');
  }
  return result;
};

// update a product
const updateSingleProductToDB = async (
  id: string,
  updateData: Partial<Product>,
) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true },
  );
  return result;
};

// delete a product
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductToDB,
  getSingleProductFromDB,
  updateSingleProductToDB,
  deleteSingleProductFromDB,
};
