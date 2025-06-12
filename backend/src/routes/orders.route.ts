import express from "express";
import {
  patchOrders,
  getAllOrders,
  getMyOrders,
  createOrder,
} from "../controllers/orders.controller.ts";
import { authentionToken } from "../middleware/auth.Middleware.ts";

export const orderRoute = express.Router();

orderRoute.post("/", authentionToken, createOrder);
orderRoute.get("/:id", authentionToken, getMyOrders);
orderRoute.get("/", authentionToken, getAllOrders);
orderRoute.patch("/:id", authentionToken, patchOrders);

export default orderRoute;