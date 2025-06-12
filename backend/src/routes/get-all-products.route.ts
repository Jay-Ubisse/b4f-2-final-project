import express from "express";
import { getProductsBySearch } from '../controllers/search.controller.ts';
import { getProducts } from "../controllers/products.controller.ts";
import { getProductByCategory } from "../controllers/category.controller.ts";

export const Getrouter = express.Router();

// Rota para listar todos os produtos
Getrouter.get("/", getProducts);

// Rota para listar produtos por categoria (com query param: categoryId=...)
Getrouter.get("/category", getProductByCategory);

// Rota para pesquisa de produtos (com query param: query=cam)
Getrouter.get("/search", getProductsBySearch);