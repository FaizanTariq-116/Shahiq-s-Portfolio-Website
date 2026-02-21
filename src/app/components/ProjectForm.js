"use client";
import { useState, useRef } from "react";
import CldUpload from "@/app/components/CldUpload";
import { addProject } from "@/mongolib-db/action";

export default function ProjectForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    setIsAdding(true);
    setMessage("");

    // This ensures the server definitely receives the URL
    formData.set("image", imageUrl); 

    try {
      await addProject(formData);
      
      formRef.current.reset();
      setImageUrl(""); // Clear image after success

      // Sequence of messages
      setMessage("Adding Project...");
      
      setTimeout(() => {
        setMessage("Project Added Successfully!");
        setTimeout(() => setMessage(""), 1000);
      }, 1500);

    } catch (error) {
      setMessage("Error adding project.");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <form 
      ref={formRef} 
      action={handleSubmit} 
      className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-2 gap-4"
    >
      <input name="title" placeholder="Project Title" className="border p-2 rounded" required />
      <input name="id" placeholder="always add new unique id" className="border p-2 rounded" required />
      
      <div className="col-span-2 border-2 border-dashed p-4 rounded-lg flex flex-col items-center justify-center bg-gray-50">
        <CldUpload onUploadSuccess={(url) => setImageUrl(url)} />
        <input type="hidden" name="image" value={imageUrl} />
        
        {/* IMAGE PREVIEW SECTION */}
        {imageUrl && (
          <div className="mt-4 flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-24 h-24 object-cover rounded-lg border-2 border-green-500 shadow-md mb-2"
            />
            <p className="text-green-600 text-xs font-bold">Project Ready!</p>
          </div>
        )}
      </div>

      <textarea name="description" placeholder="Description" className="border p-2 rounded col-span-2" required />
      
      <div className="col-span-2">
        <button 
          type="submit"
          disabled={isAdding}
          className={`${isAdding ? 'bg-gray-400' : 'bg-black'} text-white p-2 rounded-lg w-full transition-all hover:opacity-90`}
        >
          {isAdding ? "Adding Project..." : "Add New Project"}
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