// src/app/project/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { projects } from "../../data/projects";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProjectDetailPage() {
  const params = useParams(); // get id from route
  const router = useRouter();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function loadProject() {
      const { id } = params;
      const found = projects.find((p) => p.id === id);
      if (!found) {
        router.replace("/404"); // handle not found
      } else {
        setProject(found);
      }
    }
    loadProject();
  }, [params, router]);

  if (!project) return null; // or a loading spinner

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center w-full"
      >
        {/* Card */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 w-full max-w-162.5">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={500}
            className="object-contain rounded-3xl mx-auto"
          />
        </div>

        {/* Text beneath the card */}
        <div className="mt-6 text-center md:text-left w-full max-w-162.5">
          <h1 className="text-3xl font-semibold mb-4">{project.title}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </motion.div>
    </section>
  );
}
