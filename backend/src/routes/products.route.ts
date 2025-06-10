import express from "express";
import { getProducts } from "../controllers/products.controller.ts";
import { listCategory } from "../controllers/category.controller.ts";
import { searchProducts } from "../controllers/search.controller.ts";


export const router = express.Router();

router.get("/", getProducts);
router.get("/:categoryName", listCategory)
router.get("/search", searchProducts);