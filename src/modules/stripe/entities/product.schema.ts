import mongoose from 'mongoose';
import { Product } from './product.entity';

export const ProductSchema = new mongoose.Schema<Product>({
  testStock: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'usd' },
    description: { type: String, required: true, default: 'teststock1' },
  },
  testStock2: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'usd' },
    description: { type: String, required: true, default: 'teststock2' },
  },
  testStock3: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'usd' },
    description: { type: String, required: true, default: 'teststock3' },
  },
});
