<<<<<<< HEAD
import axios  from 'axios';


export interface ProductProps {
  _id?: string;
  name: string;
  color?: string[]; 
  colors?: string[];
  sizes?: string[];
  price?: number;
  description?: string;
  imageUrl?: string;
  category?: any;
  categoryId?: string;
  stock?: number;
=======
import api from "./axios-instance";
import type { Product } from "../types/products";


// export async function getProducts({
//   id,
// }: {
//   id: string;
// }): Promise<Products | undefined> {
//   try {
//     const res = await fetch(`/products/`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("Erro ao buscar produto por ID:", err);
//   }
// }

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
>>>>>>> 79a5aeb627154f2166ede9729a97e68b8136b766
}


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getAllProducts(): Promise<ProductProps[]> {
  try {
    const response = await api.get("/products");
    return response.data.data
  } catch (error) {
    console.error("Error to get products:", error);
    return [];
  }  
}