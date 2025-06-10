import express from "express";
import {
  patchOrders,
  getAllOrders,
  getMyOrders,
  createOrder,
} from "../controllers/orders.controller.ts";

export const orderRoute = express.Router();

orderRoute.post("/orders", createOrder);
orderRoute.get("/orders/me", getMyOrders);
orderRoute.get("/orders", getAllOrders);
orderRoute.patch("/:id", patchOrders);

export default orderRoute;
