import mongoose from "mongoose";
import { ExpressRequest, ExpressResponse } from "../utils/ReqRes";
import {uploadImage} from "../utils/cloudfunction";
import multer from 'multer';
import slugify from "slug";
import ProductModel from "../model/ProductModel";
import sendResponse from "../utils/Response";
import categoryModel from "../model/CategoryModel";


export const createProductController = async(req: ExpressRequest,res: ExpressResponse) => {
    try {
        const {Product_name,slug,Description,Price,category,quantity,shipping} = req.body;
        let Product_Image = " ";
        
        if(req.file){
            Product_Image = req.file.originalname;
            const result = await uploadImage(req.file.path);
            Product_Image = result.secure_url;
        }

         // Validation checks
    if (!Product_name) {
        return res.status(500).send({ error: "Name is Required" });
      }
      if (!Description) {
        return res.status(500).send({ error: "Description is Required" });
      }
      if (!Price) {
        return res.status(500).send({ error: "Price is Required" });
      }
      if (!category || !mongoose.Types.ObjectId.isValid(category)) {
        return res.status(500).send({ error: "Valid Category is Required" });
      }
      if (!quantity) {
        return res.status(500).send({ error: "Quantity is Required" });
      }
      if (!Product_Image || (req.file && req.file.size > 5000000)) {
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1MB" });
      }

      const product = await new ProductModel({
        Product_name,
        slug: slugify(Product_name),
        Description,
        Price,
        category,
        quantity,
        shipping,
        Product_Image,
      }).save();
      res
        .status(201)
        .json({ message: "Product created successfully",productIs: product });

    } catch (error) {
      console.log("error in controller",error)
        sendResponse(res,500,"Product Not Created")
    }   
}

export const getAllProductController = async(req: ExpressRequest,res: ExpressResponse) => {
  try {
     const products = await ProductModel.find({}).populate("category").limit(12).sort({createdAt: -1});
     if(products.length > 0){
        sendResponse(res,200,"Fetched Product Successfully",products);
     }
  } catch (error) {
    sendResponse(res,400,"Unable To fetch Product")
  }
}

export const getSingleProductController = async(req: ExpressRequest,res: ExpressResponse) => {
  try {
    const singleProduct = await ProductModel.find({slug: req.params.slug}).select("-Product_Image").populate("category");
    if(singleProduct.length > 0){
      sendResponse(res,200,"Fetched Product Successfully",singleProduct);
    }
  } catch (error) {
    sendResponse(res,400,"Unable To fetch Product");
  } 
}

export const deleteController = async(req: ExpressRequest,res: ExpressResponse) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-Product_Image");
    sendResponse(res,201,"Product Deleted");
  } catch (error) {
    console.log(error);
    sendResponse(res,500,"Error In deleting Product");
  }
}

export const UpdateProductController = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const {
      Product_name,
      Description,
      Price,
      category,
      quantity,
      shipping,
    } = req.body;
    console.log("req",req.body);

    const productSlug = req.params.slug;
    console.log("PRoductslug",productSlug);
    console.log("Product name",Product_name)
    
    const cat_id = categoryModel.findOne({categoryName: category});

    let Product_Image = "";

    if(req.file){
      Product_Image = req.file.originalname;
      const result = await uploadImage(req.file.path);
      Product_Image = result.secure_url;
    }

    const updatedFields = {
      Product_name,
      slug: slugify(Product_name),
      Description,
      Price,
      category: cat_id!._id,
      quantity,
      shipping: shipping.toLowerCase() === "false" ? false : true,
      Product_Image,
    };
    console.log("Category",category);
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { slug: productSlug },
      updatedFields,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.log("Error",error);
    res.status(500).send({
      message: "Error in Updating Product",
      error,
    });
  }
};

