import { Request, Response } from "express";  
import { Product } from "../models/products.model.ts";

export const getProducts = async (req: Request, res: Response) => {
   try {
      res.status(200).json({
         message: "ok", Product
      })
   } catch (error) {
      console.error("Erro da MAudlyn")
      res.status(500).json({
         message: "Erro ao buscar produtos"
      })
   }
}

