import mongoose from 'mongoose';

export type StripeType = {
  userID: string;
  productID: mongoose.Types.ObjectId;
  quantity: number;
};
