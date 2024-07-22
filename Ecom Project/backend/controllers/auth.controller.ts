import type { ExpressRequest, ExpressResponse } from "../utils/ReqRes";
import UserModel from "../model/UserModel";
import sendResponse from "../utils/Response";
import { comparePassword, hashPassword } from "../encryptions/authEncryptions";
import jwt from "jsonwebtoken";

export const registerUserController = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    if (user) {
      sendResponse(res, 201, "User Added Successfully");
    }
  } catch (error) {
    console.log("Error In Adding User", error);
    sendResponse(res, 400, "Error Occured");
  }
};

export const loginController = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      sendResponse(res, 404, "Bad Request");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      sendResponse(res, 404, "Email Not Registered");
    } else {
      const match = await comparePassword(password, user.password);
      if (!match) {
        sendResponse(res, 401, "Invalid Password");
      }
    }

    const token = jwt.sign(
      { _id: user?.id },
      process.env.JWT_SECRET ?? "default-secret",
      { expiresIn: "7d" }
    );
    sendResponse(res, 200, "Login Successfull", {
      user: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        role: user?.role,
      },
      token,
    });
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error");
  }
};

export const forgotPasswordController = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      sendResponse(res,400,"Email is Required")
    }
    if (!answer) {
      sendResponse(res,400,"Answer is Required")
    }
    if (!newPassword) {
      sendResponse(res,400,"New Password is required")
    }

    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      sendResponse(res,400,"Your Email Or Password is Invalid")
    }

    const hashedPassword = await hashPassword(newPassword);
    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(200).send({
      message: "Password Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went Wrong",
      error,
    });
  }
};

export const updateUserController = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  try {
    console.log("Req User :- ", req.user)

    const userId = req.user?._id as string;
    const { name, email, password, phone, address, answer } = req.body;

    const user = await UserModel.findById(userId);
    
    if (password && password.length < 6) {
      return res.json({ message: "Password is Required and 6 Character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name || user?.name,
        email: email || user?.email,
        password: hashedPassword || user?.password,
        phone: phone || user?.phone,
        address: address || user?.address,
        answer: answer || user?.answer,
      },
      { new: true }
    );
    

    return res.status(200).send({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      message: "There is error in Updating",
      error,
    });
  }
};

export const getAllUsersController = async(req: ExpressRequest,res: ExpressResponse) => {
  try {
    const usersData = await UserModel.find({});
    if(usersData){
      sendResponse(res,200,"Users Fetched",usersData);
    }
  } catch (error) { 
    console.log(error);
      sendResponse(res,400,"Error Fetching Users",error)
  }
    
}


// const deleteProductController = () => {

// }