import  express  from "express"
import { FilterCategoryName } from './../controllers/Filter.Controller';

const router = express.Router();

router.get("/getCategory/:productID",FilterCategoryName);

export default router;