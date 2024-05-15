import mongoose from 'mongoose';
import { Payment } from './payment.entity';

export const PaymentSchema = new mongoose.Schema<Payment>({
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
