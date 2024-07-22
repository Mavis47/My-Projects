import {loginController, registerUserController,forgotPasswordController,updateUserController, getAllUsersController} from "../controllers/auth.controller";
import  express  from 'express';
import { requireSignin } from './../middlewares/authmiddleware';

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginController);
router.post("/forget-password", forgotPasswordController);
router.put("/update/:id", requireSignin,updateUserController);
router.get("/getUsers",getAllUsersController);

export default router;