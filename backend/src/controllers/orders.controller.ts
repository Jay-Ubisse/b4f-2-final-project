import { Request, Response } from "express";
import { Order } from "../models/orders.models.ts";
import { Product } from "../models/products.model.ts";
import { User } from "../models/user.model.ts";

export async function createOrders(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { items } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const foundProducts = await Product.find({ _id: { $in: items } });

    if (foundProducts.length !== items.length) {
      res.status(400).json({ error: "Um ou mais produtos são inválidos." });
    }

    const total = foundProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const newOrder = await Order.create({
      user: user._id,
      userId: (user._id as string | { toString(): string }).toString(),
      items,
      total,
      status: "pendente",
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
}

// Listar pedidos do usuário autenticado (GET /orders/me)
export async function getMyOrders(req: Request, res: Response) {
  try {
    const user = (req as any).user;

    if (!user || !user.id) {
      res.status(401).json({ error: "Usuário não autenticado." });
    }

    const orders = await Order.find({ user: user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: "items",
        select: "name price imageUrl",
      });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Erro ao buscar pedidos do usuário:", err);
    res.status(500).json({ error: "Erro ao buscar seus pedidos." });
  }
}

// Listar todos os pedidos (GET /orders) [Apenas admin]
export async function getAllOrders(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
      res.status(403).json({
        error:
          "Acesso negado. Apenas administradores podem visualizar pedidos.",
      });
    }
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "name email role",
      })
      .populate({
        path: "items",
        select: "name price imageUrl",
      });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
}

//atualizar status do pedido Patch /orders/:id [Apenas admin]
export const patchOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ error: "Status é obrigatório." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items", "name price imageUrl");

    if (!updatedOrder) {
      res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.status(200).json({
      message: "Status do pedido atualizado com sucesso.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};
