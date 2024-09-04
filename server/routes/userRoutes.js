import express from "express";
import { registerUser,loginUser,storeProjectDetails,getProjectDetails} from "../controllers/userController.js";


const userRoute = express.Router()


 userRoute
        .post('/signup',registerUser)
        .post('/login',loginUser)
        .post('/storeProject',storeProjectDetails)
        .post('/getProject',getProjectDetails)


 export default userRoute