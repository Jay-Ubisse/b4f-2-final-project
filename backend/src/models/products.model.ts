import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String },
  color: { type: String },
  size: { type: String, enum: ["XS", "S", "L", "XL", "XXL"] },
  price: { type: Number },
  description: { type: String },
  category: {
    type: String,
    enum: ["T-shirt", "Hoodies", "Sweatpants", "Crewnecks"],
  },
});
const Products = mongoose.model("products", productSchema);
export default Products;
