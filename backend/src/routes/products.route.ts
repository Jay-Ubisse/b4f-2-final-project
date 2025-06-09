import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";

export const router = Router();

router.get("/", getProducts);