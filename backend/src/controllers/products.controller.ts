import { Request, Response } from "express";  
import { Product } from "../models/products.model.ts";

export const getProducts = async (req: Request, res: Response) => {
   try {
      const products = await Product.find().populate("category");

      res.status(200).json({
         message: "Produtos encontrados", 
         deta: products
      })
   } catch (error) {
      res.status(500).json({
         message: "Erro ao buscar produtos"
      })
   }
}

