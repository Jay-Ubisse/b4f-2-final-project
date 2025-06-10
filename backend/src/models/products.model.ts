import mongoose from "mongoose";
import { productsProps } from "../types/products.types.ts";
const productSchema = new mongoose.Schema<productsProps>({
  id:{String, unique:true},
  name: {String, required:true, min:5},
  color: {String, required:true },
  size: {String, enum: ["XS", "S", "L", "XL", "XXL"], required: true},
  price: { type: Number, required:true },
  description: {String, min:10 },
  category: {String,
    enum: ["T-shirt", "Hoodies", "Sweatpants", "Crewnecks"],
  },
});
const Products = mongoose.model("products", productSchema);
export default Products;
