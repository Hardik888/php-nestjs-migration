import mongoose from 'mongoose';
import { Product } from './product.entity';

export const ProductSchema = new mongoose.Schema<Product>({
  testStock: {
    amount: Number,
  },
  testStock2: {
    amount: Number,
  },
  testStock3: {
    amount: Number,
  },
});
