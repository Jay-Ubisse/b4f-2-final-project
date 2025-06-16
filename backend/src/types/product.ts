import mongoose, { Document} from "mongoose";

export interface ProductProps extends Document{
  name:String,
        colors:String[];
        sizes:String[];
        price:number;
        description:String;
        imageUrl:String;
        category:mongoose.Types.ObjectId;
        categoryId:String;
        stock:number;
}




