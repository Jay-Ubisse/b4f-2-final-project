import mongoose, { Document} from "mongoose";

export interface ProductsProps extends Document{
  name:String,
        colors:string[];
        sizes:string[];
        price:number;
        description:String;
        imageUrl:String;
        category:mongoose.Types.ObjectId;
        categoryId:String;
        stock:number;
}






