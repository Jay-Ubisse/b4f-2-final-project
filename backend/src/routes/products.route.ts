import express from "express";
import { getProducts } from "../controllers/products.controller.ts";
import { listCategory } from "../controllers/category.controller.ts";

export const router = express.Router();

router.get("/", getProducts);
router.get("/categories/:categoryName", listCategory)