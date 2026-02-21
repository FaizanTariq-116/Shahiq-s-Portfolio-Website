import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    introText: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true, // path or URL
    },

    skills: {
      type: [String], // array of strings
      required: true,
      default: [],    // optional, empty array if no skills provided
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js dev mode
export default mongoose.models.About || mongoose.model("About", AboutSchema);
