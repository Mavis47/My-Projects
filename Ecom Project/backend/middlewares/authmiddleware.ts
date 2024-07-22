import jwt, { type JwtPayload } from "jsonwebtoken";
import type {
  ExpressRequest,
  ExpressResponse,
  NextFunction,
} from "../utils/ReqRes";
import type { User } from "../utils/express";
import UserModel from "../model/UserModel";

export const requireSignin = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const decode = jwt.verify(
      req?.headers?.authorization!?.split?.(' ')?.at(1) as string,
      process.env.JWT_SECRET as string
    );
    if (!decode) return res.status(400).send({ message: "Token is Required" });
    req.user = decode as User;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Invalid Token",
      error,
    });
  }
};

export const isAdmin = async (
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    const userId = req.user as User;
    const user = await UserModel.findById(userId._id);
    if (user?.role === 0) {
      return res.status(400).send({ message: "Unauthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).send({
      message: "Error in Admin Middleware",
      error,
    });
  }
};
