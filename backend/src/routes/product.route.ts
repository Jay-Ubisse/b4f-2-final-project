import express from "express";
import {
  createProduct,
  getProductId,
  deletedProduct,
  updateProduct,
} from "../controllers/products.controller.ts";

export const productRoute = express.Router();
productRoute.post("/", createProduct);
productRoute.get("/:id", getProductId);
productRoute.delete("/:id", deletedProduct);
productRoute.put("/:id", updateProduct);
