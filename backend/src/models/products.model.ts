
import mongoose, {Schema} from "mongoose";
<<<<<<< HEAD
import { ProductsProps} from "../types/products.types.ts";
=======
import { ProductsProps} from "../types/products.ts";
>>>>>>> b0bc113ba43df0ee0e742125a7f3f6424ce8a73e

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
<<<<<<< HEAD
const Products = mongoose.model<ProductsProps>("products", productSchema);
export default Products;
=======

export const Product = mongoose.model<ProductsProps>("product", productSchema);

>>>>>>> b0bc113ba43df0ee0e742125a7f3f6424ce8a73e
