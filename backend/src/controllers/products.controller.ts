import Products from "../models/products.model.ts";
import { Response, Request } from "express";
export const createProduct=async (req:Request, res:Response)=>{
    try {
        const newProduct= await Products.create(req.body);
        res.status(201).json({message:"product created successfully", newProduct});
    } catch (error) {
      res.status(500).json({message:"An internal server error occurred"})  
    }

}