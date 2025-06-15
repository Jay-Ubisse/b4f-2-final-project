import express from "express";
import {
  createProduct,
  getProductId,
  deletedProduct,
  updateProduct,
  getProducts,
  authorizeRole,
} from "../controllers/products.controller.ts";
import { authentionToken } from "../middleware/auth.Middleware.ts";

export const productRoute = express.Router();

productRoute.get("/", getProducts); 
productRoute.get("/:id", getProductId);
productRoute.delete("/:id", authentionToken, deletedProduct);
productRoute.put("/:id", authentionToken, authorizeRole, updateProduct);
productRoute.post("/", createProduct);
