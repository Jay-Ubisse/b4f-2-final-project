import { Product } from "../models/products.model.ts";
import { Category } from "../models/category.model.ts";
import { ProductProps } from "../types/product.types.ts";
import { Response, Request, NextFunction } from "express";

export const authorizeRole = async (role: string) => {
const authorizeRole = async (role: string) => {

  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};}
export const createProduct = async (req: Request, res: Response) => {
    authorizeRole("admin");
  try {
    const body: ProductProps = req.body;
    const {
      name,
      price,
      imageUrl,
      category,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;
    const categoryData = await Category.findById(categoryId).populate("Categories");
    const product = Product.create({
      name,
      price,
      imageUrl,
      category: categoryData,
      description,
      colors: colors ||[],
      sizes: sizes || [],
      stock,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred",error});
  }
};

export const getProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId).select({});
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Ok", existingProduct });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const deletedProduct = (req: Request, res: Response) => {
  authorizeRole("admin");
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Ok" });
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
    const body: ProductProps = req.body;
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
    const product = await Product.findByIdAndUpdate(id, {
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
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    if (search) {
      const filter = { name: { $regex: search, $options: "i" } };
      const products = await Product.find(filter).populate("category");

       res.status(200).json({
        message: products.length > 0 ? "Found" : "No matching products",
        total: products.length,
        data: products,
      });
    }

    if (category) {
      const normalized = String(category).trim().toLowerCase();

      const foundCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${normalized}$`, "i") },
      });

      if (!foundCategory) {
        const all = await Category.find();
         res.status(404).json({
          message: "Category not found",
          availableCategories: all.map((cat) => cat.name),
        });return;
      }

      const products = await Product.find({ category: foundCategory._id }).populate("category");

       res.status(200).json({
        category: foundCategory.name,
        total: products.length,
        data: products,
      });return;
    }

    const products = await Product.find().populate("category");
    res.status(200).json({
      message: "All products",
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({
      message: "An internal server error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



