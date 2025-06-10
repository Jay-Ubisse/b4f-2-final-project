import express from "express";
import { getProducts } from "../controllers/products.controller.ts";


export const router = express.Router();

router.get("/", getProducts);
