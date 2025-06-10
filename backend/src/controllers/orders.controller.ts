import { Request, Response } from "express";
import { Order } from "../models/orders.models.ts";

// Criar novo pedido (POST /orders)

// Listar pedidos do usuário autenticado (GET /orders/me)

// Listar todos os pedidos (GET /orders) [Apenas admin]
export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find().populate("user").populate("items");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pedidos." });
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

// Atualizar status do pedido (PATCH /orders/:id) [Apenas admin]
// export async function updateOrderStatus(req: Request, res: Response) {
//   try {
//     const orderId = req.params.id;
//     const { status } = req.body;

//     const validStatus = ["pendente", "enviado", "entregue", "cancelado"];
//     if (!validStatus.includes(status)) {
//       return res.status(400).json({ error: "Status inválido!" });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder)
//       return res.status(404).json({ error: "Pedido não encontrado." });

//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: "Erro ao atualizar status do pedido." });
//   }
// }
