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
