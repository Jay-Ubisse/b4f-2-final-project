import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  articleValue: { type: Number, required: true },
  discountValue: { type: Number, required: true },
  status: { type: Boolean, default: false },
});

export default mongoose.model("Orders", OrdersSchema);
