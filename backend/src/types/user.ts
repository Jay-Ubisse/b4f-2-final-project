import mongoose, { Document } from "mongoose";

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // e.g., 'admin', 'custimer'
}

// export interface CategoryProps extends Document {
//   name: string;
//   description?: string;
// }

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
