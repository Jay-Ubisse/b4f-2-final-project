import express from "express";
import { createProduct } from "../controllers/products.controller.ts";
export const productRoute=express.Router();
productRoute.post("/",createProduct);