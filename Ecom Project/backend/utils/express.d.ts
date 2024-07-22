import type { Request } from "express";

type User = {
  _id?: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
