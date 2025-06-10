import mongoose, { Document, Schema } from "mongoose";
import { CategoryProps, ProductProps, UserProps } from "../types/user.js";

/* ================== USER =============== */

const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

export const User = mongoose.model<UserProps>("User", userSchema);

/* ================== CATEGORY =============== */

const categorySchecma = new Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model<CategoryProps>(
  "Category",
  categorySchecma
);

/* ================== PRODUCT =============== */

const productSchema = new Schema<ProductProps>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  stock: { type: Number, required: true, default: 0 },
});

export const Product = mongoose.model<ProductProps>("Product", productSchema);
