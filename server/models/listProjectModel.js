import mongoose, { Mongoose } from "mongoose";

const ProjectSchema = mongoose.Schema({
  email: String,
  projectName: String,
  projectId: String,
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
