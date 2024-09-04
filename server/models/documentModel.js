import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema({
  _id: String,
  data: Object,
  userId: String,
});

const Document = mongoose.model("Document", DocumentSchema);
export default Document;




