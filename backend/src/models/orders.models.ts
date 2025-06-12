import mongoose, { Schema } from "mongoose";
import { OrderProps } from "../types/order.ts";

/* ===================== ORDER =================== */

const orderSchema = new Schema<OrderProps>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: { type: String, required: true },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["pendente", "enviado", "entregue", "cancelado"],
    default: "pending",
  },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<OrderProps>("Order", orderSchema);
