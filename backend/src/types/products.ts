import mongoose, { Document } from "mongoose";

export interface ProductProps extends Document {
  name: string;
  price: number;
  category: mongoose.Types.ObjectId;
  categoryId: string;
  imageUrl: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
}