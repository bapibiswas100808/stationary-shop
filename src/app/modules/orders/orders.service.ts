/* eslint-disable @typescript-eslint/no-explicit-any */
import Cart from '../cart/cart.model';
import { ProductModel } from '../products/products.model';
import { User } from '../users/user.model';
import { orderUtils } from './order.utils';
import { OrderModel } from './orders.model';

const createOrderFromCart = async (userEmail: string, ip: string) => {
  // Fetch the cart of the logged-in user
  const cart = await Cart.findOne({ email: userEmail });
  const user = await User.findOne({ email: userEmail });
  // console.log(user, cart);

  const order = await OrderModel.create({
    email: user?.email,
    product: cart?._id,
    quantity: cart?.cartItems.length || 0,
    totalPrice: cart?.totalPrice,
    status: 'pending',
  });

  const shurjoPayPayload = {
    amount: cart?.totalPrice,
    order_id: cart?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip: ip,
  };
  const payment = await orderUtils.makePayment(shurjoPayPayload);
  if (payment?.transactionStatus) {
    await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
    await Cart.updateOne(
      { email: userEmail },
      { $set: { cartItems: [], totalPrice: 0 } },
    );
  }

  return { payment, order };
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPayment(order_id);
  // const id= await OrderModel.findOne({})
  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      { 'transaction.id': order_id },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'shipping'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

// create order
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

// get all order

const getAllOrder = async () => {
  const orders = await OrderModel.find().populate({
    path: 'product', // First populate the cart
    populate: {
      path: 'cartItems.productId', // Inside the cart
      model: 'Product',
    },
  });
  const activeOrders = orders.filter((item) => item.isDeleted === false);
  return activeOrders;
};

// delete order
const deleteOrder = async (id: string) => {
  const result = await OrderModel.updateOne(
    { _id: id },
    { isDeleted: true },
  ).populate({
    path: 'product', // First populate the cart
    populate: {
      path: 'cartItems.productId', // Inside the cart
      model: 'Product',
    },
  });
  return result;
};

// get single order
const getSingleOrder = async (id: string) => {
  const result = await OrderModel.findOne({ _id: id }).populate({
    path: 'product', // First populate the cart
    populate: {
      path: 'cartItems.productId', // Inside the cart
      model: 'Product',
    },
  });
  if (result?.isDeleted === true) {
    throw new Error('Order has been Deleted');
  }
  return result;
};

// change status
const changeOrderStatus = async (id: string, currentStatus: string) => {
  const newStatus = currentStatus === 'pending' ? 'shipping' : 'pending';
  const result = await OrderModel.updateOne({ _id: id }, { status: newStatus });
  return result;
};

// update order
const updateOrder = async (id: string, updateData: any) => {
  // Validate allowed fields
  const allowedFields = ['quantity', 'totalPrice'];
  const updateKeys = Object.keys(updateData);

  const invalidFields = updateKeys.filter(
    (key) => !allowedFields.includes(key),
  );
  if (invalidFields.length > 0) {
    throw new Error(
      `Invalid fields for update: ${invalidFields.join(', ')}. Only 'quantity' and 'totalPrice' can be updated.`,
    );
  }

  // Update the order
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!updatedOrder) {
    throw new Error('Order not found');
  }

  return updatedOrder;
};

// generate revenue
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
  createOrderFromCart,
  verifyPayment,
  getAllOrder,
  deleteOrder,
  getSingleOrder,
  changeOrderStatus,
  updateOrder,
};
