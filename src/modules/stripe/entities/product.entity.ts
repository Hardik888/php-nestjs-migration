import { Document } from 'mongoose';

export class Product extends Document {
  testStock: {
    amount: number;
  };
  testStock2: {
    amount: number;
  };
  testStock3: {
    amount: number;
  };
}
