import Category from "../models/category.model.ts";
import Product from "../models/products.model.ts";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name || typeof name !== "string" || name.trim() === "") {
            res.status(400).json({ message: "Invalid category name" });
            return;
        }

        if (
            !description ||
            typeof description !== "string" ||
            description.trim() === ""
        ) {
            res.status(400).json({ message: "Invalid category description" });
            return;
        }

        const existingCategory = await Category.findOne({ name });

        if (!existingCategory) {
            await Category.create({
                name: name.trim(),
                description: description.trim(),
            });
            res.status(201).json({ message: "Created successfully" });
            return;
        }
        res.status(400).json({ message: "Category already exists" });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            console.log("Nao foram encontradas categorias");
            res.status(404).json({ message: "No Categories Found" });
        } else {
            res.status(200).json(categories);
        }
    } catch (error) {
        console.log("nao foram encontrados produtos:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};

export const getProductByCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            res.status(404).json({ message: "Category Not Found" });
            return;
        }

        const products = await Product.find({ category: id });
        if (products.length === 0) {
            console.log("Não foram encontrados produtos nesta categoria");
            res.status(404).json({ message: "No Products Found in this Category" });
        }

        res.status(200).json({existingCategory: existingCategory.name,products});
        return;
    } catch (error) {
        console.error("Erro ao buscar produtos por categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (name && typeof name !== "string") {
       res.status(400).json({ message: "Invalid name format" });
       return;
    }
    
        const existingCategory = await Category.findByIdAndUpdate(
            id.trim(),
            { $set: { name, description } },
            { new: true, runValidators: true }
        );

        if (!existingCategory) {
            console.log("Categoria não encontrada");
            res.status(404).json({ message: "Category Not Found" });
            return;
        }

        res.status(200).json({message: "Category Updated Successfully",category: existingCategory,});
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingCategory = await Category.deleteOne({ _id: id });

        if (!existingCategory) {
            console.log("Categoria não encontrada");
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        res.status(200).json({ message: "Category Deleted Successfully" });
    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};
