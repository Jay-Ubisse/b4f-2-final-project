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
<<<<<<< HEAD
productRoute.put("/:id", authentionToken, updateProduct);
=======
productRoute.put("/:id", authentionToken,authorizeRole, updateProduct);
productRoute.get("/", getProducts);
productRoute.get("/search", getProductsBySearch);
productRoute.get("/category", getProductsByQueryCategory);


>>>>>>> b0bc113ba43df0ee0e742125a7f3f6424ce8a73e
