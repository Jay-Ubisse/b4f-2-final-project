import Products from "../models/products.model.ts";
import Category from "../models/products.model.ts";
import { productsProps } from "../types/products.types.ts";
import { Response, Request, NextFunction } from "express";


const authorizeRole = async (role: string) => {
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const body: productsProps = req.body;
    const {
      name,
      price,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;
    const category = await Category.findById(categoryId).populate("Categories");
    const product = Products.create({
      name,
      price,
      imageUrl,
      category: category,
      description,
      colors: colors ||[],
      sizes: sizes || [],
      stock,
      categoryId,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred",error});
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
  authorizeRole;
  try {
    const id = req.params.id;
    const body: productsProps = req.body;
    const {
      name,
      price,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;
    const categoryData = await Category.findById(categoryId).populate(
      "Category"
    );
    const product = await Products.findByIdAndUpdate(id, {
      name,
      price,
      category: categoryData,
      imageUrl,
      description,
      colors: colors,
      sizes: sizes || [],
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

export const getProducts = async (req: Request, res: Response) => {
   try {
      const products = await Products.find().populate("category");

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
