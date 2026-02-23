import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // This will store the hashed version
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);