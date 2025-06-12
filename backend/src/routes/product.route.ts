import express from "express";
import {
  createProduct,
  getProductId,
  deletedProduct,
  updateProduct,
} from "../controllers/products.controller.ts";
import { authentionToken } from "../middleware/auth.Middleware.ts";

export const productRoute = express.Router();

productRoute.post("/", createProduct);
productRoute.get("/:id", getProductId);
productRoute.delete("/:id", authentionToken, deletedProduct);
productRoute.put("/:id", authentionToken, updateProduct);
