import Products from "../models/products.model.ts";
import { productsProps } from "../types/products.types.ts";
import { Response, Request } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body: productsProps = req.body;
    const {name, color,sizes,price,description, category, stock
}=body;
    Products.create({name,color,sizes,price,description, category,stock});
    res.status(201).json({ message: "Product created successfully",body});
    
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

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

