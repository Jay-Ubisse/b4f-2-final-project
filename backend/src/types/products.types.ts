import mongoose from 'mongoose';

export interface ProductProps{
    name:string;
    price:number;
    category:mongoose.Types.ObjectId;
}


