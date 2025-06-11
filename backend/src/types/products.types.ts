import mongoose, { Document, Types} from "mongoose";

export interface productsProps extends Document{
  name:String,
        colors:String[];
        sizes:String[];
        price:Number;
        description:String;
        imageUrl:String;
        category:mongoose.Types.ObjectId;
        categoryId:String;
        stock:number;
}

export interface CategoryProps extends Document {
  name: string;
  description?: string;
}

export interface productsProps extends Document{
        name:String,
        color:String[],
        sizes:String[],
        price:Number,
        description:String,
        category:Types.ObjectId[],
        stock:number;
}

