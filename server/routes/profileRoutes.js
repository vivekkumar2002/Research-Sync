import express from "express";
import { updateProfile } from "../controllers/profileController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
import { getProfile } from "../controllers/profileController.js";
const profileRoute = express.Router()


 profileRoute
            .post('/profile',isAuthenticated,updateProfile)
            .get('/getProfile',isAuthenticated,getProfile)
            



 export default profileRoute