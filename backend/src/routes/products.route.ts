import express from "express";
import { getProductsBySearch } from './../controllers/search.controller.ts';
import { getProducts } from "../controllers/products.controller.ts";
import { getProductsByQueryCategory } from "../controllers/category.controller.ts";

export const router = express.Router();

// Rota para listar todos os produtos
router.get("/", getProducts);

// Rota para listar produtos por categoria (com query param: categoryId=...)
router.get("/category", getProductsByQueryCategory);

// Rota para pesquisa de produtos (com query param: query=cam)
router.get("/search", getProductsBySearch);