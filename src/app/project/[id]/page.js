"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadProject() {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);

        if (!res.ok) {
          router.replace("/404");
          return;
        }

        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Project fetch failed:", error);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, router]);

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-24 h-24 mb-6"
          >
            <Image
              src="/Namelogo.png" 
              alt="Loading project"
              width={96}
              height={96}
              unoptimized
              priority
            />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 min-h-screen flex flex-col justify-center items-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center w-full"
      >
        
        {/* --- DYNAMIC IMAGE CONTAINER --- */}
        <div className="relative w-full max-w-fit group mx-auto">
          
          {/* Close Button: Placed relative to the image size */}
          <button
            onClick={() => router.push("/#")}
            aria-label="Close project"
            className=" 
              absolute -top-3 -right-3 z-30
              bg-white text-black
              rounded-full p-2.5
              shadow-[0_10px_30px_rgba(0,0,0,0.2)]
              border border-gray-100
              hover:bg-red-500 hover:text-white
              active:scale-90
              transition-all duration-300
            "
          >
            <IoClose size={20} />
          </button>

          {/* Floating Image Card: Width adjusts to image, Height is capped */}
          <div className="
            bg-gray-50 
            rounded-4xl 
            overflow-hidden 
            relative 
            shadow-[0_30px_70px_rgba(0,0,0,0.12)] 
            border border-gray-100
            flex items-center justify-center
          ">
            {/* 
               Using an <img> tag here inside a max-height container 
               is better for "natural" aspect ratios than Next/Image 'fill' 
            */}
            <img
              src={project.image || "/placeholder.jpg"}
              alt={project.title}
              className="
                w-auto h-auto 
                max-w-full 
                max-h-[75vh] 
                object-contain 
                transition-transform duration-1000 
                group-hover:scale-[1.02]
              "
            />
          </div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center max-w-2xl px-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            {project.title}
          </h1>
          
          <div className="w-20 h-1 bg-red-500 mx-auto mb-2 rounded-full" />
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          <button 
              onClick={() => router.push("/#")}
              className="px-10 py-3.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition shadow-xl active:scale-95"
          >
              Back to Projects
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}