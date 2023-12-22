import mongoose from "mongoose";





const productSchema =new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    userId:{
    type:mongoose.Types.ObjectId,
    ref:"user"
    }
},{timestamps:true})

export const productModel = mongoose.model('product',productSchema);