import { Schema, model } from 'mongoose';
import { Product } from './products.interface';

const productsSchema = new Schema<Product>({
  name: { type: String, required: [true, 'Name is Required'] },
  brand: { type: String, required: [true, 'Brand is Required'] },
  price: { type: Number, required: [true, 'Price is Required'] },
  category: {
    type: String,
    enum: {
      values: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      message: 'Category id Required',
    },
    required: true,
  },

  description: { type: String, required: [true, 'Description is Required'] },
  quantity: { type: Number, required: [true, 'Quantity is Required'] },
  inStock: {
    type: Boolean,
    required: [true, 'Stock Status must be true or false'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// query middleware
productsSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productsSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const ProductModel = model<Product>('Product', productsSchema);
