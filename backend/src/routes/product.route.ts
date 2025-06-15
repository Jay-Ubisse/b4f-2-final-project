import express from "express";
import {
  createProduct,
  getProductId,
  deletedProduct,
  updateProduct,
  getProducts,
  getProductsBySearch,
  getProductsByQueryCategory,
} from "../controllers/products.controller.ts";
import { authentionToken } from "../middleware/auth.Middleware.ts";
import { authorizeRole } from "../controllers/products.controller.ts";

export const productRoute = express.Router();


productRoute.post("/", createProduct);
productRoute.get("/:id", getProductId);
productRoute.delete("/:id", authentionToken, deletedProduct);
productRoute.put("/:id", authentionToken,authorizeRole, updateProduct);
productRoute.get("/", getProducts);
productRoute.get("/search", getProductsBySearch);
productRoute.get("/category", getProductsByQueryCategory);


