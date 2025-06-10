import { Request, Response } from "express";  
import { products } from "../models/products.model.js";

export const getProducts = async (req: Request, res: Response) => {
   try {
      res.status(200).json({
         message: "Todos os Nossos Productos", products
      })
   } catch (error) {
      res.status(500).json({
         message: "Erro ao buscar produtos"
      })
   }
}