import { Document, Types } from "mongoose";
export interface productsProps extends Document{
        name:String,
        color:String[],
        sizes:String[],
        price:Number,
        description:String,
        category:Types.ObjectId[],
        stock:number;
}