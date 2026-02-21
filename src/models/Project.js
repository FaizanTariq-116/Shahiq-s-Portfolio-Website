import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // ✅ your custom id
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
