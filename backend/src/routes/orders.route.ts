import express from "express";
import {
  patchOrders,
  getAllOrders,
  getMyOrders,
  createOrder,
} from "../controllers/orders.controller.ts";

export const orderRoute = express.Router();

orderRoute.post("/", createOrder);
orderRoute.get("/:id", getMyOrders);
orderRoute.get("/", getAllOrders);
orderRoute.patch("/:id", patchOrders);

export default orderRoute;
