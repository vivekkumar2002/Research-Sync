import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";


export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
 

  if (!token) return next(new ErrorHandler("Login First", 404));

  const decoded = jwt.verify(token, process.env.JWT);

  req.user = await User.findById(decoded.id);

  next();
};

