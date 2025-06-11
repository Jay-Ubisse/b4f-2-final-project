import express from "express";
import {
  createProduct,
  getProductId,
  deletedProduct,
  updateProduct,
} 
from "../controllers/products.controller.ts";
import { authentionToken }
from "../middleware/auth.middleware.ts";
export const productRoute=express.Router();
productRoute.post("/", createProduct);
productRoute.get("/:id",getProductId);
productRoute.delete("/:id",authentionToken, deletedProduct);
productRoute.put("/:id", authentionToken, updateProduct);
  createProduct,} from "../controllers/products.controller.ts"

export const productRoute = express.Router();
productRoute.post("/", createProduct);

