import mongoose from "mongoose";
import { productsProps,} from "../types/products.types.ts";

const productSchema = new mongoose.Schema<productsProps>({
  name: { type: String, required: true },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  category: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  stock: { type: Number, required: true, default: 0 },
});
const Products = mongoose.model<productsProps>("products", productSchema);
export default Products;
