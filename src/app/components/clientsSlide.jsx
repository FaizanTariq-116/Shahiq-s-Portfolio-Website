"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { GrNext, GrPrevious } from "react-icons/gr";

const slides = [
  {
    title: "UI Design",
    description:
      "Creating visually polished interfaces.Creating visually polished interfaces Creating visually polished interfaces interfaces Creating visually polished interfaces",
    image: "/ClientSlide_Pics/pexels-sebastiaan-stam-1097456.jpg",
    link: "/ui-design",
  },
  {
    title: "UX Design",
    description: "Smooth and intuitive experiences.",
    image: "/ClientSlide_Pics/wp3703412-iron-man-4k-wallpapers.jpg",
    link: "/ux-design",
  },
  {
    title: "Graphic Design",
    description: "Communicating brand identity.",
    image: "/ClientSlide_Pics/pexels-maxim-sharypov-5843038.jpg",
    link: "/graphic-design",
  },
  {
    title: "Web Development",
    description: "Fast and responsive websites.",
    image: "/ClientSlide_Pics/pexels-sebastiaan-stam-1097456.jpg",
    link: "/web-development",
  },
  {
    title: "Brand Identity",
    description: "Unique logos and branding.",
    image: "/ClientSlide_Pics/pexels-anya-juÃ¡rez-tenorio-13993939.jpg",
    link: "/brand-identity",
  },
  {
    title: "Motion Graphics",
    description: "Engaging animations.",
    image: "/ClientSlide_Pics/biJl8uL-iron-man-hd-wallpaper.jpg",
    link: "/motion-graphics",
  },
];

export default function ClientsSlider() {
  const carouselRef = useRef(null);
  const x = useMotionValue(0);

  const [slideWidth, setSlideWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Responsive width calculation
  const updateDimensions = () => {
    if (!carouselRef.current) return;

    const containerWidth = carouselRef.current.offsetWidth;
    setCarouselWidth(containerWidth);

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

  // Correct center slide tracking
  useEffect(() => {
    const unsubscribe = x.on("change", (value) => {
      if (!slideWidth || !carouselWidth) return;

      // Center of the carousel
      const center = carouselWidth / 2;

      // Index based on the current x position
      const index = Math.round(
        (Math.abs(value) + center - slideWidth / 2) / slideWidth,
      );

      setActiveIndex(index % slides.length);
    });

    return () => unsubscribe();
  }, [x, slideWidth, carouselWidth]);

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

  // Autoplay (paused on hover)
  useEffect(() => {
    if (!slideWidth || isHovered) return;
    const interval = setInterval(slideNext, 3000);
    return () => clearInterval(interval);
  }, [slideWidth, isHovered]);

  return (
    <motion.div
      className={clsx("bg-white", "py-14", "overflow-hidden")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        ref={carouselRef}
        className={clsx("flex", "overflow-hidden", "cursor-grab")}
        whileTap={{ cursor: "grabbing" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.2}
          style={{ x }}
        >
          {infiniteSlides.map((slide, idx) => {
            const isActive = activeIndex === idx % slides.length;

            return (
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
                animate={{
                  scale: isActive ? 1.15 : 1,
                  opacity: isActive ? 1 : 0.7,
                }}
                whileHover={{ scale: isActive ? 1.15 : 1.05 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <div className="flex flex-col items-center justify-center h-full py-5 px-4">
                  {/* IMAGE */}
                  <Link href={slide.link} className="mb-4">
                    <motion.div
                      className={clsx(
                        "w-24",
                        "h-24",
                        "rounded-full",
                        "border-2",
                        "border-red-500",
                        "overflow-hidden",
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={120}
                        height={120}
                        loading="eager" // <-- disable lazy load
                        priority // <-- make it load immediately
                        className={clsx(
                          "object-cover", // <--- change in cover/contain as needed,
                          "w-full",
                          "h-full",
                          "rounded-full",
                          "bg-white",
                          "transition-all",
                          "duration-300",
                          isActive ? "grayscale-0" : "grayscale",
                        )}
                      />
                    </motion.div>
                  </Link>

                  <h3 className="text-red-500 font-bold text-lg mb-2">
                    {slide.title}
                  </h3>

                  {/* Responsive Description */}
                  <p
                    className={clsx(
                      "text-gray-500",
                      "text-sm sm:text-base md:text-base lg:text-base",
                      "leading-relaxed",
                      "max-w-55 sm:max-w-65 md:max-w-70 lg:max-w-[320px]",
                      "break-word",
                      "whitespace-normal",
                      "line-clamp-5",
                    )}
                  >
                    {slide.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-center mt-8 space-x-6">
        <button
          onClick={slidePrev}
          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-600 transition"
        >
          <GrPrevious />
        </button>

        <button
          onClick={slideNext}
          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-600 transition"
        >
          <GrNext />
        </button>
      </div>
    </motion.div>
  );
}
