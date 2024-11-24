import { ProductModel } from '../products/products.model';
import { OrderModel } from './orders.model';

const createNewOrderToDb = async (
  email: string,
  productId: string,
  quantity: number,
  totalPrice: number,
) => {
  // find product by id
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

  const result = await OrderModel.create({
    email,
    product: productId,
    quantity,
    totalPrice,
  });

  //   reduce quntity
  product.quantity -= quantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();
  return result;
};

const getRevenueFromDB = async () => {
  const result = await OrderModel.aggregate([
    // stage 1
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    // stage 2
    { $unwind: '$productDetails' },
    // stage 3
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', '$productDetails.price'],
          },
        },
      },
    },
    // stage 4
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createNewOrderToDb,
  getRevenueFromDB,
};
