import express from "express";
import { createProduct } from "../controllers/products.controller.ts";
import { deleteProduct } from "../controllers/products.controller.ts";

export const productRoute=express.Router();
productRoute.post("/",createProduct);

export const deletedProduct = express.Router();
deletedProduct.delete("/:id", deleteProduct);
