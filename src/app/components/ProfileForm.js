"use client";

import { useState } from "react";
import CldUpload from "@/app/components/CldUpload";
import { updateAbout } from "@/mongolib-db/action";

export default function ProfileForm({ initialData }) {
  // 1. All State Declarations
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [skills, setSkills] = useState(initialData?.skills || [""]);
  const [isUpdating, setIsUpdating] = useState(false); 
  const [message, setMessage] = useState("");         

  // 2. Skill Management Logic
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const addSkillField = () => {
    setSkills([...skills, ""]);
  };

  const removeSkillField = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills.length > 0 ? newSkills : [""]);
  };

  // 3. Updated Form Submission Logic
  async function handleSubmit(formData) {
    setIsUpdating(true);
    setMessage(""); 
    
    try {
      // Step 1: Call the server action
      await updateAbout(formData);
      
      // Step 2: Show the first message
      setMessage("Profile updated!");

      // Step 3: After 1.5 seconds, change it to "Updated Successfully"
      setTimeout(() => {
        setMessage("Updated Successfully!");

        // Step 4: Hide the message completely after 1 more seconds
        setTimeout(() => setMessage(""), 1000);
      }, 1500);

    } catch (error) {
      setMessage("Error updating profile.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-1">Your Name</label>
        <input name="introText" defaultValue={initialData?.introText} className="w-full border p-2 rounded" required />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} className="w-full border p-2 rounded" rows="5" required />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed">
        <label className="block text-sm font-semibold mb-2">Profile Image</label>
        <CldUpload onUploadSuccess={(url) => setImageUrl(url)} />
        <input type="hidden" name="image" value={imageUrl} />
        {imageUrl && (
          <div className="mt-3">
             <img src={imageUrl} alt="preview" className="w-20 h-20 rounded-full object-cover border" />
             <p className="text-[10px] text-green-600">Image Ready!</p>
          </div>
        )}
      </div>

      {/* SKILLS SECTION */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold mb-1">Skills</label>
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              name="skills"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <button
              type="button"
              onClick={() => removeSkillField(index)}
              className="bg-red-100 text-red-500 px-3 py-2 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkillField}
          className="mt-2 text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          + Add Skill
        </button>
      </div>

      {/* UPDATE BUTTON & STATUS MESSAGE */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isUpdating}
          className={`${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white px-6 py-2 rounded-full font-bold w-full transition-all`}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
        
        {message && (
          <p className="text-center text-green-600 text-sm font-bold mt-2 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}