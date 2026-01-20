"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import clsx from "clsx";

import { FaReact, FaHome, FaToolbox } from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import { BsQuestionSquare } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";

const slides = [
  {
    title: "UI Design",
    description: "Creating visually polished interfaces.",
    icon: <FaReact size={40} />,
  },
  {
    title: "UX Design",
    description: "Smooth and intuitive experiences.",
    icon: <FaHome size={40} />,
  },
  {
    title: "Graphic Design",
    description: "Communicating brand identity.",
    icon: <LuPenTool size={40} />,
  },
  {
    title: "Web Development",
    description:
      "Fast and responsive websites.Fast and responsive websites Fast and responsive websites Fast and responsive websites",
    icon: <FaToolbox size={40} />,
  },
  {
    title: "Brand Identity",
    description: "Unique logos and branding.",
    icon: <TbTools size={40} />,
  },
  {
    title: "Motion Graphics",
    description: "Engaging animations.",
    icon: <BsQuestionSquare size={40} />,
  },
];

export default function Slider() {
  const carouselRef = useRef(null);
  const x = useMotionValue(0);

  const [slideWidth, setSlideWidth] = useState(0);

  // Responsive width calculation
  const updateDimensions = () => {
    if (!carouselRef.current) return;

    const containerWidth = carouselRef.current.offsetWidth;

    if (window.innerWidth >= 1024) setSlideWidth(containerWidth / 3);
    else if (window.innerWidth >= 640) setSlideWidth(containerWidth / 2);
    else setSlideWidth(containerWidth);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const infiniteSlides = [...slides, ...slides, ...slides];
  const totalWidth = slideWidth * slides.length;

  // Infinite loop correction
  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      if (value < -totalWidth) x.set(value + totalWidth);
      else if (value > 0) x.set(value - totalWidth);
    });

    return () => unsubscribe();
  }, [x, totalWidth]);

  const slideNext = () =>
    animate(x, x.get() - slideWidth, {
      type: "spring",
      stiffness: 200,
      damping: 25,
    });

  const slidePrev = () =>
    animate(x, x.get() + slideWidth, {
      type: "spring",
      stiffness: 200,
      damping: 25,
    });

  // Autoplay
  useEffect(() => {
    if (!slideWidth) return;
    const interval = setInterval(slideNext, 3000);
    return () => clearInterval(interval);
  }, [slideWidth]);

  return (
    <motion.div
      className={clsx("bg-white", "py-12", "overflow-hidden")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        ref={carouselRef}
        className={clsx("flex", "overflow-hidden", "cursor-grab")}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className={clsx("flex")}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.2}
          style={{ x }}
        >
          {infiniteSlides.map((slide, idx) => (
            <motion.div
              key={idx}
              className={clsx(
                "shrink-0",
                "flex",
                "flex-col",
                "items-center",
                "justify-center",
                "text-center",
                "relative",
              )}
              style={{ width: slideWidth }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {idx % slides.length !== 0 && (
                <div
                  className={clsx(
                    "absolute",
                    "left-0",
                    "top-2",
                    "bottom-2",
                    "border-l",
                    "border-dashed",
                    "border-gray-400",
                  )}
                />
              )}

              <div
                className={clsx(
                  "flex",
                  "flex-col",
                  "items-center",
                  "justify-center",
                  "h-full",
                )}
              >
                <div className={clsx("mb-4")}>{slide.icon}</div>
                <h3
                  className={clsx(
                    "text-red-500",
                    "font-bold",
                    "text-lg",
                    "mb-2",
                  )}
                >
                  {slide.title}
                </h3>
                <p
                  className={clsx(
                    "text-gray-400",
                    "text-sm sm:text-base md:text-base lg:text-base",
                    "leading-relaxed",
                    "max-w-55 sm:max-w-65 md:max-w-70 lg:max-w-[320px]",
                    "wrap-break-word",
                    "whitespace-normal",
                    "line-clamp-5",
                  )}
                >
                  {slide.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <div className={clsx("flex", "justify-center", "mt-8", "space-x-6")}>
        <button
          onClick={slidePrev}
          className={clsx(
            "bg-black",
            "text-gray-300",
            "p-3",
            "rounded-full",
            "hover:bg-red-600",
            "transition",
          )}
        >
          <GrPrevious />
        </button>

        <button
          onClick={slideNext}
          className={clsx(
            "bg-black",
            "text-gray-300",
            "p-3",
            "rounded-full",
            "hover:bg-red-600",
            "transition",
          )}
        >
          <GrNext />
        </button>
      </div>
    </motion.div>
  );
}
