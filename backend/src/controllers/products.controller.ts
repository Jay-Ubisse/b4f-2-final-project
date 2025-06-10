import { Request, Response } from "express";  
import { Product } from "../models/products.model.ts";

export const getProducts = async (req: Request, res: Response) => {
   try {
      const products = await Product.find()

      res.status(200).json({
         message: "Produtos encontrados", 
         deta: products
      })
   } catch (error) {
      console.error("Erro da MAudlyn")
      res.status(500).json({
         message: "Erro ao buscar produtos"
      })
   }
}

