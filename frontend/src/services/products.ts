import api from "./axios-instance";
import type { Product } from "../types/products";

export async function getProductsById({
  id,
}: {
  id: string;
}): Promise<Product | undefined> {
  try {
    const res = await api.get(`/products/`);

    return res.data;
  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
  }
}
export async function getProducts({

}): Promise<Product | undefined> {
  try {
    const res = await api.get(`/products`);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar produto :", err);
  }
}
