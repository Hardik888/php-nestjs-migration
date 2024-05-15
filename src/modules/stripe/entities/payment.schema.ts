import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true,
  },
});
