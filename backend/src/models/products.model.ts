
import mongoose, {Schema} from "mongoose";

import { ProductsProps} from "../types/products.types.ts";

//import { ProductsProps} from "../types/products.ts";


const productSchema = new Schema<ProductsProps>({
  name: { type: String, required: true },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  category: {
     type: Schema.Types.ObjectId, ref: "Categories", required: true
  },
  stock: { type: Number, required: true, default: 0 },
});

const Products = mongoose.model<ProductsProps>("products", productSchema);
export default Products;

export const Product = mongoose.model<ProductsProps>("product", productSchema);

