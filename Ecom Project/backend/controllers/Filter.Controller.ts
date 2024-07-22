import { ExpressRequest, ExpressResponse } from '../utils/ReqRes';
import Product from '../model/ProductModel';
import sendResponse from '../utils/Response';

export const FilterCategoryName = async(req: ExpressRequest,res: ExpressResponse) => {

    try {
        const {productID} = req.params;
        const filterCategory = await Product.findById(productID);
        if(filterCategory){
            return sendResponse(res,200,"Product Fetched Successfully",filterCategory);
        }
    } catch (error) {
        console.log("Error",error);
    }
}
