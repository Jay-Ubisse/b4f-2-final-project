import { Request, Response } from "express";
import Order from "../models/orders.models.ts";

// Criar um novo pedido
export async function createOrder(req: Request, res: Response) {
  try {
  } catch (error) {}
}

// Buscar pedidos do usuário autenticado
export async function getMyOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .populate('products.product');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  
  
}

// Buscar todos os pedidos
export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar todos os pedidos" });
  }
}

//atualizar status do pedido
export const patchOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
