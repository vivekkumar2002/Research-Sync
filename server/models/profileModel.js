import mongoose from "mongoose"
import validator from "validator";

const profileSchema = mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
    bio: {
      type: String,
    },
    age: Number,
    occupation: {
        type: String,
    },
    paperPublished: Number,
    location:String,
    expertise: 
      {
        type: String,
      },
    
    about: {
      type: String,
    },
    project: {
      type: String,
    },
    gmail:{
    type: String,
    validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    linkedin:{
    type: String,
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  });
  

const Profile = mongoose.model("Profile",profileSchema);

export default Profile;