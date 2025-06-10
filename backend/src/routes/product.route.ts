import express from "express";
import { getProductId } from "../controllers/products.controller.ts";
import { createProduct } from "../controllers/products.controller.ts";
import { deleteProduct } from "../controllers/products.controller.ts";

export const getProductIdRoute = express.Router();
getProductIdRoute.get("/:id", getProductIdRoute);

export const productRoute=express.Router();
productRoute.post("/",createProduct);

export const deletedProduct = express.Router();
deletedProduct.delete("/:id", deleteProduct);
