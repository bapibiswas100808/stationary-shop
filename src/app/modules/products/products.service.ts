import { Product } from './products.interface';
import { ProductModel } from './products.model';

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductToDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductToDB,
  getSingleProductFromDB,
};
