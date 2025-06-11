import mongoose from "mongoose";
import { productsProps, CategoryProps } from "../types/products.types.ts";
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


