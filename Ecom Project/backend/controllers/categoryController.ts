import categoryModel from "../model/CategoryModel";
import { ExpressRequest, ExpressResponse } from "../utils/ReqRes";
import sendResponse from "../utils/Response";
import  slugify  from 'slug';

export const createCategoryController = async(req: ExpressRequest,res: ExpressResponse) =>{
    try {
        const {categoryName} = req.body;
        const existingCategory = await categoryModel.findOne({categoryName})
        if(existingCategory){
            sendResponse(res,200,"Category Already Exists",existingCategory)
        }
        const category = await new categoryModel({
            categoryName,
            slug: slugify(categoryName),
        }).save()

        if(category){
            sendResponse(res,201,"Category Created Successfully",category);
        }

    } catch (error) {
        sendResponse(res,400,"Error In Creating Category",error);
    }
}

export const getAllCategoryController = async(req: ExpressRequest,res: ExpressResponse) => {
    try {
        const category = await categoryModel.find({});
        if(category.length > 0){
            sendResponse(res,200,"All Categories Found",category);
        }

    } catch (error) {
        sendResponse(res,404,"Category Not found",error);
    }
}

export const getSingleCategory = async(req: ExpressRequest,res: ExpressResponse) => {
    try {
        const singleCategory = await categoryModel.findById(req.params.id)
        console.log("Single Category",singleCategory);
        if(singleCategory) {
            sendResponse(res,200,"Category Found",singleCategory)
        }
    } catch (error) {
        sendResponse(res,404,"Error Fetching Category",error);
    }
}


export const updateCategory = async(req: ExpressRequest,res: ExpressResponse) => {
    try {
       const {categoryName } = req.body;
       console.log("New Category Name",categoryName );
       const {id} = req.params;
       if(!categoryName ){
        return sendResponse(res,400,"Invalid Category",null)
       }
       const updateCategory = await categoryModel.findByIdAndUpdate(id,{categoryName: categoryName ,slug: slugify(categoryName )},{new: true})
       if(updateCategory){
        return sendResponse(res,200,"Category Updated Successfully",updateCategory)
       }else {
        return sendResponse(res, 404, "Category Not Found", null);
        }
    } catch (error) {
        return sendResponse(res,404,"Error updating Category",error);
    }
}

export const deleteCategoryController = async(req: ExpressRequest,res: ExpressResponse) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        return res.status(201).send({message : "Category Deleted Successfully",success: true})
    } catch (error) {
        return res.status(400).send({
          message: "Problem In Deleting Category",
          success: false,
          error,
        })
    }
  }
  