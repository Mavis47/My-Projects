import  Express  from "express";
import { isAdmin, requireSignin } from "../middlewares/authmiddleware";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategory, updateCategory } from "../controllers/categoryController";

const router = Express.Router();

router.post("/create-category",requireSignin,isAdmin,createCategoryController)
router.put("/update-category/:id",requireSignin,isAdmin,updateCategory);
router.get("/getCategory", getAllCategoryController)
router.get("/getSingleCategory/:id",requireSignin,isAdmin, getSingleCategory)
router.delete("/deleteCategory/:id",requireSignin,isAdmin, deleteCategoryController)

export default router;

