//import mongoose from "mongoose";
import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: Array<{ product: mongoose.Types.ObjectId; quantity: number }>;
  address: string;
  status: "pendente" | "enviado" | "entregue" | "cancelado";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["pendente", "enviado", "entregue", "cancelado"],
    default: "pendente",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);

// const OrdersSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   articleValue: { type: Number, required: true },
//   discountValue: { type: Number, required: true },
//   status: { type: Boolean, default: false },
// });

// export default mongoose.model("Orders", OrdersSchema);
