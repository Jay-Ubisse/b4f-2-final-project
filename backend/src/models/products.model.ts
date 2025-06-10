import mongoose from "mongoose";
import { productsProps } from "../types/products.types.ts";
const productSchema = new mongoose.Schema<productsProps>({
  name: {type: String, required:true},
  color: {type: [String], default:[]},
  sizes: {type:[String], default:[]},
  price: { type: Number},
  description: {type: String, default:""},
  category: {type:[]},
  stock:{type:Number, require:true, default:0}

});
const Products = mongoose.model<productsProps>("products", productSchema);
export default Products;
