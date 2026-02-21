"use client";
import { CldUploadWidget } from "next-cloudinary";

export default function CldUpload({ onUploadSuccess }) {
  return (
    <CldUploadWidget 
      uploadPreset="portfolio_preset" 
      onSuccess={(result) => {
        if (result.event === "success") {
          onUploadSuccess(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="bg-gray-200 text-black px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-300 transition text-sm font-medium"
        >
          Add Data from Local Storage or Cloud
        </button>
      )}
    </CldUploadWidget>
  );
}