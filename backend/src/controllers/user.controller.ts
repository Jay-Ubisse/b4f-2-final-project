import { Request, Response } from "express";
import { Category } from "../models/Category.js";
export function createUser(req: Request, res: Response) {}


export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    return res.json({
      message: 'Categoria atualizada com sucesso',
      category
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
};

module.exports = {
  updateCategory,
};