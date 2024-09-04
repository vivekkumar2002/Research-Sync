import mongoose from "mongoose"
import validator from "validator";

const MessageSchema = mongoose.Schema({
    name: {
      type: String,
    },
    gmail:{
    type: String,
    validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    message:{
    type: String,
  },
  });
  

const MessageForm = mongoose.model("MessageForm",MessageSchema);

export default MessageForm;