
import Category  from "../models/category.model.ts";
import Product from "../models/products.model.ts";
import { NextFunction, Request, Response } from "express";

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
        console.log("Acesso negado, somente admin")
       res.status(403).json({ mensagem: "Access Denied, Unauthorized access" });
       return;
    }

    next();
  };
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        
         const existingCategory = await Category.findOne({name});
          if (existingCategory){
            res.status(400).json({message:"Category exists"});
            return;
        }

    Category.create({name, description});
    res.status(201).json({message:"Created successfully", category: { name, description }});
      
    } catch (error) {
        console.log("error creating category:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};

export const getAllCategories = async (req: Request, res: Response)=> {
    try {
         const categories =await Category.find();

        if(categories.length === 0){
            console.log("Nao foram encontradas categorias");
             res.status(404).json({message:"Not Found"});
                
            }else{
                res.status(200).json({message:"OK",categories});    
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

         res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos por categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};


export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: { name, description } },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            console.log("Categoria não encontrada");
            res.status(404).json({ message: "Category Not Found" });
            return;
        
        }

     res.status(200).json({ message: "Category Updated Successfully", category: updatedCategory });
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
    }
};


export const deleteCategory = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;

        const existingCategory = await Category.deleteOne({ _id: id });

        if (!existingCategory) {
            console.log("Categoria não encontrada");
            res.status(404).json({ message: "Category Not Found" });
            return;
        }
        await Category.deleteOne({ id });
        res.status(200).json({ message: "Category Deleted Successfully" });
        
    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};