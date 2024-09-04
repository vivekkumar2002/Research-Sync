import mongoose from "mongoose";


const LogbookSchema= mongoose.Schema({ 
    // _id:String,
    data:Object,
    document_id:String,
    commitMessage:String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Logbook = mongoose.model("Logbook",LogbookSchema);
export default Logbook