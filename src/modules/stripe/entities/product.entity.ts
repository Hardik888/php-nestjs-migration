import { Document } from 'mongoose';

export class Product extends Document {
  testStock: {
    amount: number;
    currency: string;
    desciption: string;
  };
  testStock2: {
    amount: number;
    currency: string;
    desciption: string;
  };
  testStock3: {
    amount: number;
    currency: string;
    desciption: string;
  };
}
