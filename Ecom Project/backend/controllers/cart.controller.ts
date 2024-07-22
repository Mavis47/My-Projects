import express from "express";
import Cart from "../model/CartModel";
import { ExpressRequest, ExpressResponse } from "../utils/ReqRes";
import Product from "../model/ProductModel";
import sendResponse from "../utils/Response";
import type { User } from "../utils/express";
import UserModel from "../model/UserModel";
import mongoose from "mongoose";

const router = express.Router();

export const addtoCart = async (req: ExpressRequest, res: ExpressResponse) => { 

    const userID = req.user!._id as User;
    const {productID} = req.body;

    try {
        const product = await Product.findById(productID);
        if(!product){
          return sendResponse(res, 404, "Product not found");
        }

        const cartItem = await Cart.findOne({userID,product: productID})
        console.log("cartItems Controller",cartItem);

        if(cartItem){
          cartItem.quantity +=1;
          await cartItem.save();
        }else{
          const newCartItem = new Cart({
            userID,
            product: productID,
          });
          await newCartItem.save();
        }
        sendResponse(res,201,"Item added to cart Successfully")   
    } catch (error) {
      console.log("Failed", error);
      sendResponse(res, 500, "Failed to add item to cart");
    }
};

export const fetchCartItems = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {

  const userID = req.user!._id;
  // console.log("User ID",userID);
  try {
    const cartItems = await Cart.find({ userID }).populate("product");
    // console.log("cartItems",cartItems);
  
    if (!cartItems) {
      return sendResponse(res, 404, "No Cart Items Found");
    }

    const grandTotal = cartItems.reduce((total, { product, quantity }) => {
      return total + product.Price * quantity;
    }, 0);

    sendResponse(res, 200,  "Cart Items Fetched Successfully", {
      cartItems,
      grandTotal,
    });


  } catch (error) {
    console.log("Failed", error);
    sendResponse(res, 500,  "Cant Fetch items");
  }
};

// /**
//  * Update the quantity of a product in the user's cart.
//  * If the new quantity is greater than zero, update the quantity.
//  * If the new quantity is zero or less, remove the product from the cart.
//  * @param {ExpressRequest} req - Express request object.
//  * @param {ExpressResponse} res - Express response object.
//  */
// export async function UpdateCartItem(
//   req: ExpressRequest,
//   res: ExpressResponse,
// ) {
//   try {
//     // Validate and parse the user and request body
//     const  userId  = req.user?._id;
//     const { productId, operation } = req.body;

//     // Check if the product exists in the user's cart
//     const existingCartItem = await Cart.findById({userId,productId});

//     if (!existingCartItem) {
//       return sendResponse(res,404,'Cart item does not exist') 
//     }

//     // Calculate the new quantity
//     let newQuantity;
//     switch (operation) {
//       case "INCREASE_QUANTITY":
//         newQuantity = existingCartItem.quantity + 1;
//         if (newQuantity > 10) {
//           return res.status(400).json({
//             message: `Quantity cannot exceed ${10}`,
//             success: false,
//           });
//         }
//         break;
//       case "DECREASE_QUANTITY":
//         newQuantity = existingCartItem.quantity - 1;
//         break;
//       default:
//         return res.status(400).json("Invalid operation.");
//     }

//     if (newQuantity <= 0) {
//       // Remove the product from the cart if the new quantity is zero or less
//       await Cart.findByIdAndDelete({id: existingCartItem.id});
//     } else {
//       // Update the quantity in the database
//       await Cart.findByIdAndUpdate({id: existingCartItem.id},data: {quantity: newQuantity});

//     }
//     res.sendStatus(200);
//   } catch (error) {
    
//   }
// }

export const IncrementQuantity = async(req: ExpressRequest,res: ExpressResponse) => {
    const userID = req.user?._id;
    const {_id} = req.params;
    console.log("userID",userID);
    console.log("ProductID Controller",_id);

    const existingCartItem = await Cart.findOne({userID,_id})
    console.log("Existing CartItems",existingCartItem);
    if (!existingCartItem) {
      return sendResponse(res,404,'Cart item does not exist')
    }
    const newQuantity = existingCartItem.quantity + 1;
    existingCartItem.quantity = newQuantity;
    await existingCartItem.save();
  
    if(newQuantity){
      return sendResponse(res,201,"Increment Successfull",{ quantity: newQuantity,_id: _id  });
    }
    if (newQuantity > 10) {
      return sendResponse(res,200,"Cart Item cannot Exceed to this limit")
    }
    // await Cart.findByIdAndUpdate({id: existingCartItem.id},{quantity: newQuantity})
}

export const DecrementQuantity = async(req: ExpressRequest,res: ExpressResponse) => {
  const userID = req.user?._id;
    const {_id} = req.params;
    console.log("ProductID Controller",_id);

  const existingCartItem = await Cart.findOne({userID,_id})
  console.log("Existing CartItems",existingCartItem);

  if (!existingCartItem) {
    return sendResponse(res,404,'Cart item does not exist')
  }
  const newQuantity = existingCartItem.quantity - 1;
  

  if (newQuantity <= 0) {
    await Cart.findByIdAndDelete(existingCartItem._id);
    return sendResponse(res, 200, 'Cart item deleted');
  }
  if (newQuantity > 10) {
    return sendResponse(res,200,"Cart Item cannot Exceed to this limit")
  }

  existingCartItem.quantity = newQuantity;
  await existingCartItem.save();

  return sendResponse(res, 200, 'Decrement successful', { quantity: newQuantity,_id: _id });
  
}

export const deleteCartItem = async(req: ExpressRequest,res: ExpressResponse)=>{
  const userID = req.user?._id;
  const {productID} = req.params;

  try {
    const existingCartItem = await Cart.findOne({userID,productID});
  if(!existingCartItem){
      return sendResponse(res,404,'Cart item does not exist')
  }
  if(existingCartItem){
    await Cart.findByIdAndDelete(existingCartItem._id);
    return sendResponse(res,201,"CartItem Deleted",existingCartItem);
  }
  } catch (error) {
    console.log("Error In deleting CartItems",error);
    return sendResponse(res,500,"Cannot Deleted CartItems,error");
  }
  
}