import api from "./axios-instance";


export async function getProduct({id}: {id:String}) {
  try {
    const response = await api.get(`/products/${id}`); 
    return response.data;
  
  } catch (error) {}
}
export interface products extends Document{
  _id:string
  name:string,
        colors:string[];
        sizes:string[];
        price:Number;
        description:string;
        imageUrl:string;
        stock:number;
}