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