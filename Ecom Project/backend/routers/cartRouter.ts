import  express  from "express"
import { requireSignin } from "../middlewares/authmiddleware";
import { addtoCart, DecrementQuantity, deleteCartItem, fetchCartItems, IncrementQuantity } from "../controllers/cart.controller";

const router = express.Router();
router.use(requireSignin)
router.route("").post(addtoCart).get(fetchCartItems) 

router.patch('/increment-quantity/:_id', IncrementQuantity);
router.patch('/decrement-quantity/:_id', DecrementQuantity);
router.delete('/delete-cartItems/:productID', deleteCartItem);

export default router;