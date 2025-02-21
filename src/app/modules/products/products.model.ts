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
  image: { type: String, required: [true, 'Image is Required'] },
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
productsSchema.pre('save', function (next) {
  // inStock is must false when quantity<=0
  if (this.quantity <= 0 && this.inStock === true) {
    return next(
      new Error(
        'inStock cannot be true if quantity is less than or equal to 0',
      ),
    );
  }
  // inStock is must be true when quantity>0
  if (this.quantity > 0 && this.inStock === false) {
    return next(
      new Error('inStock cannot be false if quantity is greater than 0'),
    );
  }
  next();
});

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
