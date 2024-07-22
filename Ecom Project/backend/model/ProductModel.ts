import {Schema,model} from "mongoose";
import mongoose from "mongoose";

const ProductModel = new Schema({
    Product_name: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    Product_Image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Boolean,
    },
},{timestamps: true})

const Product = model('Product', ProductModel);
export default Product;



