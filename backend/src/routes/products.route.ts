import {Router} from "express";
import { getProducts } from "../controllers/products.controller.ts";
import { getCategory } from "../controllers/category.controller.ts";

export const router = Router();

router.get("/", getProducts);
router.get("/:categoryName", getCategory)