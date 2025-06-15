import api from "./axios-instance";
import type { Product } from "../types/products";
// export async function getProductsById({ _id }: { _id: string }) {
//   try {
//     const res = await fetch(`/products${_id}`);
//     if (!res.ok) throw new Error("Produto não encontrado");
//     console.log(res)
//     return await res.json();



export async function getProductsById({
  id,
}: {
  id: string;
}): Promise<Product[] | undefined> {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching the products", error);
    return [];
  }
}
export async function getProducts({
}): Promise<Product [] | undefined> {
  try {
    const res = await api.get("/products");
     //console.log(res.data)
    return res.data.data;
   
  } catch (error) {
    console.error("Error fetching the products", error);
    return [];
  }
}
