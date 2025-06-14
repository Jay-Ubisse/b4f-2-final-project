import api from "./axios-instance";
import type { Products } from "../types/products";

export async function getProducts({
  id,
}: {
  id: string;
}): Promise<Products | undefined> {
  try {
    const res = await fetch(`/products/`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
  }
}
export async function getProducts({
  data,
}: {
  data:{ name:string;
  colors:[];
  sizes:[];
  price:number;
  description:string;
  imageUrl:string;
  categoryId:string;
  stock:number;};
}): Promise<Products | undefined> {
  try {
    const res = await api.get(`/products`, data);
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar produto :", err);
  }
}
