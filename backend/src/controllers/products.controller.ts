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
    res.status(500).json({ message: "An internal server error occurred" });}}

export const getProductId = async (req:Request, res: Response) =>{
    try {
      const productId = req.params.id;
      const existingProduct =  Products.findById(productId);
      if(!existingProduct) {
     res.status(404).json({message: "Produto não encontrado"});
      }
      res.status(200).json({message :"Produto encontrado com sucesso", existingProduct});
    } catch(error){
      res.status(500).json({message: "Ocorreu um erro interno no servidor"});
    }

  }


export const deletedProduct = (req: Request, res: Response) => {
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

export const updateProduct = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { name, color,sizes,price,description, category, stock } = body;

    const product = await Products.findById(id);
if(!product){
  return res.status(404).json({message:"product not found"})
}
product.name=name
product.price=price
product.color=color
product.sizes=sizes
product.description=description
product.category=category
product.stock=stock
res.status(200).json({message:"product changed successfully"})
  } catch (error) {
   res.status(500).json({message:"error when editing a product",error})
  }
};

