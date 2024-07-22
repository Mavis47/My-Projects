import  Express  from "express";
import multer from "multer";
import { createProductController, deleteController, getAllProductController, getSingleProductController, UpdateProductController } from "../controllers/product.controller";

const router = Express.Router();

const upload = multer({
    storage: multer.diskStorage({
})})

router.post('/create-product', upload.single("Product_Image"),createProductController);
router.get("/get-product",getAllProductController)
router.get("/get-singleproduct/:slug",getSingleProductController)
router.delete("/delete-product/:pid",deleteController)
router.put("/update-product/:slug",upload.single("Product_Image"), UpdateProductController)

export default router;

