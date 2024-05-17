import { Document } from 'mongoose';

export class Product extends Document {
  testStock: {
    amount: number;
    currency: string;
    description: string;
  };
  testStock2: {
    amount: number;
    currency: string;
    description: string;
  };
  testStock3: {
    amount: number;
    currency: string;
    description: string;
  };
}
