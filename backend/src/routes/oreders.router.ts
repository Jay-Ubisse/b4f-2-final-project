import express from "express";
import { patchOrders } from "../controllers/orders.controller.ts";
export const Router = express.Router();
//Orders routes
Router.patch("/:id", patchOrders);

export default Router;
