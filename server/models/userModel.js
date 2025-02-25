import mongoose from "mongoose"
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Enter the name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      //validate uses regular expression to check format of email
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
   
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

const User = mongoose.model("User",userSchema);

export default User;