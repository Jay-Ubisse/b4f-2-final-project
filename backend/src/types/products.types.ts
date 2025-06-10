import { Document } from "mongoose";
export interface productsProps{
  name:String,
        color:String[],
        sizes:String[],
        price:Number,
        description:String,
        category:String[]
        stock:number;
}
