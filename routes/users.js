import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/checkauthentication" , verifyToken, (req,res,next)=> {
//     res.send("Hello User,You are loggedin")
// })

// router.get("/checkuser/:id", verifyUser , (req,res,next)=> {
//     res.send("Hello User,You are loggedin and u can delete ur account")
// })

// router.get("/checkadmin/:id", verifyAdmin , (req,res,next)=> {
//     res.send("Hello admin,You are loggedin and u can delete all accounts")
// })

//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser,getUser)
//GET ALL
router.get("/",verifyAdmin,getAllUser)

export default router;