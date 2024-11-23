import { Schema, model } from 'mongoose';
import { Product } from './products.interface';

const productsSchema = new Schema<Product>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: [
      'Writing',
      'Office Supplies',
      'Art Supplies',
      'Educational',
      'Technology',
    ],
    required: true,
  },

  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

export const ProductModel = model<Product>('Product', productsSchema);
