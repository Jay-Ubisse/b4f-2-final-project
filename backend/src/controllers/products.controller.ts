import { Request, Response } from "express";  


import { products } from "../models/products.model.js";
import type { productsProps } from "../types/products.ts";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productsList: productsProps[] = products;

        res.status(200).json(productsList);
    } catch (error) {
        res
        .status(401)
        .json({ message: "Nenhum produto encontrado." });
        
    }
}