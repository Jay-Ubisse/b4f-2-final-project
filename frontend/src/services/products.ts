
import api from "./axios-instance";
import type { Product } from "../types/products";

// Buscar produto por ID 
export async function getProductsById(id: string): Promise<Product | undefined> {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data.existingProduct;
  } catch (error) {
    console.error("Erro ao buscar produto por ID", error);
    return undefined;
  }
}

// Buscar todos os produtos
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get("/products");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching the products", error);
    return [];
  }
}
