"use client";

import { motion } from "framer-motion";

export default function Text(props) {
  const { title, highlight, description, bgColor } = props;

  return (
    <motion.div
     className={`w-full flex flex-col items-center text-center px-4 py-12 rounded-lg ${bgColor}`}
      style={{ backgroundColor: bgColor ?? "transparent" }} // Use prop or transparent
      initial={{ opacity: 0, y: 50 }}       // start hidden and slightly below
      whileInView={{ opacity: 1, y: 0 }}    // animate to visible and original position
      viewport={{ once: false, amount: 0.3 }} // triggers every time component enters view
      transition={{ duration: 0.6, ease: "easeOut" }} // adjust speed
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
        {title ?? "Tools"}{"  "}
        <span className="text-red-500">{highlight ?? "| Use"}</span>
      </h2>

      <p className="mt-4 max-w-xl text-sm md:text-base text-gray-500 leading-relaxed">
        {description ??
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.`}
      </p>
    </motion.div>
  );
}
