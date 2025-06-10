import Products from "../models/products.model.ts";
import { productsProps } from "../types/products.types.ts";
import { Response, Request } from "express";

export const getProductId = async (req:Request, res: Response) =>{
    try {
      const productId = req.params.id;
      const existingProduct = await Products.findById(productId);
      if(!existingProduct) {
        return res.status(404).json({message: "Produto não encontrado"});
      }
      res.status(200).json({message :"Produto encontrado com sucesso", existingProduct});
    } catch(error){
      res.status(500).json({message: "Ocorreu um erro interno no servidor"});
    }
  }

export const createProduct=async (req:Request, res:Response)=>{
    try {
      let body=req.body
      body={};
       const newProduct= await Products.create();
        res.status(201).json({message:"Product created successfully", newProduct});
    } catch (error) {
      res.status(500).json({message:"An internal server error occurred"})  
    }
}

export const deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    Products.findByIdAndDelete(id)
      .then((deletedProduct) => {
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "An internal server error occurred" });
      });
}