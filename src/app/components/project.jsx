"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";
import clsx from "clsx";
import { motion } from "framer-motion";

const ITEMS_PER_LOAD = 4;

export default function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-5"
      >
        {visibleProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center"
          >
            {/* Card */}
            <div
              className={clsx(
                "bg-gray-100 rounded-3xl",
                "p-4 sm:p-5 md:p-6",
                "flex items-center justify-center",
                "aspect-4/3 w-full",
                "max-w-85 sm:max-w-95 md:max-w-115 lg:max-w-125"
              )}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="object-contain rounded-3xl"
                priority
              />
            </div>

            {/* Link */}
            <Link
              href={`/project/${project.id}`}
              className="inline-block mt-3 text-sm text-gray-700 hover:underline"
            >
              See the card details
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Toggle Button */}
      {projects.length > ITEMS_PER_LOAD && (
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
