import ErrorHandler from "../middlewares/error.js";
import Profile from "../models/profileModel.js";
import cloudinary from "cloudinary";
import dataUri from "../utils/dataUri.js";


//profile creation
export const updateProfile = async (req, res, next) => {
  try {

    const {
      bio,
      age,
      occupation,
      paperPublished,
      location,
      expertise,
      about,
      gamil,
      project,
      linkedin,
    } = req.body;
    
    
    
    const file = req.files;

    const fileUri = dataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "vvce",
      width: 150,
      crop: "scale",
    });


    let userId= req.user._id;
    console.log("USERID",userId);


    let parsedPaperPublished = parseInt(paperPublished);
    let parsedAge = parseInt(age);

    const profile = await Profile.create({
      bio,
      age: parsedAge,
      occupation,
      paperPublished:parsedPaperPublished,
      location,
      expertise,
      about,
      gamil,
      project,
      linkedin,
      user:userId,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    if (!profile) {
      return next(new ErrorHandler("profile not created", 500));
    }
    
    res.status(200).json({ 
      mssg:"profile sent",
      profile
    })

  } catch (error) {
    console.error("Error during user creation:", error);
    next(error);
  }
};


export const getProfile = async(req,res,next)=>{ 
  try {
  

    const user = await Profile.find({user:req.user._id})
    if (!user) {
      return next(new ErrorHandler("User not found", 500));
    }
    return res.status(200).json({ 
      user
    })
    
  } catch (error) {
    next(error)
  }
}