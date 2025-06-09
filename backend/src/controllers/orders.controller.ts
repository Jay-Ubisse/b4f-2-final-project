import { Request, Response } from "express";
import Orders from "../models/orders.models.ts";

//atualizar status do pedido
export const patchOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Orders.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
