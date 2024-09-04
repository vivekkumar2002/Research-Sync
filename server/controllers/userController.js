import User from "../models/userModel.js";
import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import Project from "../models/listProjectModel.js";

//register user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, 201, "user created successfully");
  } catch (error) {
    next(error);
  }
};

//login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return next(new ErrorHandler("Please enter Email and password", 401));
    let user = await User.findOne({ email }).select("+password");

    //401=unauthoraizes
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return next(new ErrorHandler("Invalid email or password", 401));

    sendCookie(user, res, 200, `Hello ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const storeProjectDetails = async (req, res, next) => {
  try {
    const { projectName, projectId, email } = req.body;
    await Project.create({
      projectName,
      projectId,
      email,
    });
    res.status(200).json(projectId);
  } catch (error) {
    next(error);
  }
};

export const getProjectDetails = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await Project.find({ email });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
