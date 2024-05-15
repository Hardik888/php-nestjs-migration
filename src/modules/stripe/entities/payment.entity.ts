import { Document, ObjectId } from 'mongoose';

export class Payment extends Document {
  userID: number;
  productId: ObjectId;
  quantity: number;
  amount: number;
}
