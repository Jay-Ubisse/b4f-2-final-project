import mongoose, { Document } from "mongoose";

export interface OrderProps extends Document {
  user: mongoose.Types.ObjectId;
  userId: string;
  items: mongoose.Types.ObjectId[];
  status: string; // e.g., 'pending', 'shipped', 'delivered'
  total: number;
  createdAt: Date;
}
