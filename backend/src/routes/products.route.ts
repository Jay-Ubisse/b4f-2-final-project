import express from "express";
import { getProducts } from "../controllers/products.controller.js";
import { getCategory } from "../controllers/category.controller.js";

export const router = express.Router();

router.get("/", getProducts);
router.get('/category/categoryName:', getCategory)