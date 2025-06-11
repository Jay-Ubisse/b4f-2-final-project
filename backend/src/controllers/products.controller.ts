import Products from "../models/products.model.ts";
import { productsProps } from "../types/products.types.ts";
import { Response, Request, NextFunction } from "express";

const authorizeRole =async (role: string) => {
 (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      res.status(403).json({ mensagem: "Access denied: insufficient permission." });
    }

    next();
  };
};
export const createProduct = async (req: Request, res: Response) => {
authorizeRole;
  try {
    const body: productsProps = req.body;
    const {
      name,
      price,
      category,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;
    Products.create({
      name,
      price,
      category,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    });
    res.status(201).json({ message: "Product created successfully", body });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const getProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Products.findById(productId).select({});
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", existingProduct });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const deletedProduct = (req: Request, res: Response) => {
  authorizeRole("admin");
  
  const { id } = req.params;
  Products.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
         res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "An internal server error occurred", error });
    });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body: productsProps = req.body;
    const {
      name,
      price,
      category,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;

    const product = await Products.findByIdAndUpdate(id, {
      name,
      price,
      colors,
      sizes,
      description,
      category,
      imageUrl,
      stock,
      categoryId,
    });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "error when editing a product", error });
  }
};
