import Products from "../models/products.model.ts";
import { productsProps } from "../types/products.types.ts";
import { User } from "../models/user.model.ts";
import { Response, Request } from "express";
export const createProduct = async (req: Request, res: Response) => {
  try {
    const body: productsProps = req.body;
    const id=req.params.id;
    const existProduct = await Products.findById(id);
    //const userRole=await User.findOne({role})
if (existProduct) {
      res
        .status(400)
        .json({ message: "There is already a product with this id" });
    }
    const newProduct = await Products.create(body);
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
 
    
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};
