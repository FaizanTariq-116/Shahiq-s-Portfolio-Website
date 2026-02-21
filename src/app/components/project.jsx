"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

const ITEMS_PER_LOAD = 4;

/* 🔹 Skeleton Card */
function ProjectSkeleton() {
  return (
    <div className="flex flex-col items-center animate-pulse">
      <div
        className={clsx(
          "bg-gray-400 rounded-3xl",
          "p-4 sm:p-5 md:p-6",
          "flex items-center justify-center",
          "aspect-4/3 w-full",
          "max-w-85 sm:max-w-95 md:max-w-115 lg:max-w-125"
        )}
      >
        <div className="w-full h-full bg-gray-400 rounded-2xl" />
      </div>

      <div className="mt-3 h-4 w-32 bg-gray-400 rounded-full" />
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Projects fetch error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const visibleProjects = projects.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(ITEMS_PER_LOAD);
    } else {
      setVisibleCount(projects.length);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-5"
      >
        {/* 🔹 Loading State */}
        {loading &&
          Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}

        {/* 🔹 Loaded Projects */}
     {!loading &&
  visibleProjects.map((project) => (
    <Link
      key={project._id}
      href={`/project/${project.id}`}
      className="project-cards group" // added group for hover effects
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="flex flex-col items-center"
      >
        {/* --- FIXED CARD CONTAINER --- */}
        <div
          className={clsx(
            "bg-gray-100 rounded-3xl",
            "flex items-center justify-center",
            "aspect-4/3 w-full",
            "max-w-85 sm:max-w-95 md:max-w-115 lg:max-w-125",
            "shadow-[0_6px_12px_rgba(0,0,0,0.06),0_15px_40px_rgba(0,0,0,0.10)]",
            "relative overflow-hidden" // ✅ FIX 1: This stops the overlap
          )}
        >
          <Image
            src={project.image} 
            alt={project.title}
            fill // ✅ FIX 2: Makes image responsive to the container
            className="object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110" // ✅ FIX 3: object-cover fills the box perfectly
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <span className="inline-block mt-3 text-sm text-gray-700 group-hover:underline">
          See the card details
        </span>
      </motion.div>
    </Link>
  ))}
      </motion.div>

      {/* Toggle Button */}
      {!loading && projects.length > ITEMS_PER_LOAD && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleToggle}
            className="px-6 py-3 rounded-full border border-gray-400 text-sm hover:bg-black hover:text-white transition"
          >
            {visibleCount >= projects.length ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </section>
  );
}
