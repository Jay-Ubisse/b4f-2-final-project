import mongoose from "mongoose";
import { Document } from "mongoose";
import { productsProps, CategoryProps } from "../types/products.types.ts";
const categorySchema = new mongoose.Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model<CategoryProps>(
  "Category",
  categorySchema
);
const productSchema = new mongoose.Schema<productsProps>({
 name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
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
const Products = mongoose.model<productsProps>("products", productSchema);
export default Products;


