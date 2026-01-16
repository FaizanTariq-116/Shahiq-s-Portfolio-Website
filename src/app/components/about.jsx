"use client";

import Image from "next/image";
import { Inter, Ceviche_One } from "next/font/google";
import clsx from "clsx";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

/* Fonts */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ceviche = Ceviche_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ceviche",
});

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.main
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={clsx(
        inter.variable,
        ceviche.variable,
        "bg-white min-h-screen flex items-center px-4 sm:px-6 md:px-12"
      )}
    >
      <section
        className={clsx(
          "px-6",
          "sm:px-12",
          "py-12",
          "sm:py-16",
          "md:pt-30",
          "md:pb-80",
          "bg-white"
        )}
      >
        <section className="w-full py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* IMAGE AREA */}
            <motion.div
              className="relative flex justify-center md:order-2"
              variants={itemVariants}
            >
              {/* RINGS */}
              <div className="absolute inset-0 flex items-center justify-center mt-12 sm:mt-16 md:mt-20 overflow-visible">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: `${95 + i * 8}%`,
                      aspectRatio: "1 / 1",
                    }}
                    // Tailwind scale for small screens
                    className={`absolute rounded-full border border-[#FF4D4D]/15 
        ${i === 0 ? "scale-90 sm:scale-100" : ""} 
        ${i === 1 ? "scale-90 sm:scale-100" : ""} 
        ${i === 2 ? "scale-90 sm:scale-100" : ""}`}
                    variants={itemVariants}
                  />
                ))}
              </div>

              {/* IMAGE + BASE */}
              <motion.div
                className="relative w-52 h-60 sm:w-64 sm:h-72 md:w-96 md:h-104"
                variants={itemVariants}
              >
                {/* BLACK FULL CIRCLE BACKGROUND */}
                <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-52 h-52 sm:w-60 sm:h-60 md:w-84 md:h-84 bg-black rounded-full border-2 border-red-500 z-0" />

                {/* IMAGE */}
                <div className="absolute inset-0 z-10 flex justify-center">
                  <Image
                    src="/Rectangle.png"
                    alt="Shahiq portrait"
                    fill
                    priority
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 384px"
                    className="object-contain grayscale"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* TEXT CONTENT */}
            <motion.div
              className="md:order-1 mt-24 sm:mt-32 pl-2 sm:pl-4 md:pl-6"
              variants={itemVariants}
            >
              <motion.h1
                className={`${ceviche.className} text-[#FF4D4D] text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6`}
                variants={itemVariants}
              >
                I'm Shahiq,
              </motion.h1>

              <motion.p
                className="font-(--font-inter) text-gray-600 max-w-xl mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
                variants={itemVariants}
              >
                A UI/UX designer with hands-on experience designing websites and
                mobile applications. I enjoy solving complex problems through
                simple, elegant design solutions.
              </motion.p>

              {/* FEATURES */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 sm:gap-y-4 sm:gap-x-8 mt-4"
                variants={itemVariants}
              >
                {/* Feature 1 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Experience in UI & UX design
                  </span>
                </div>
                {/* Feature 2 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Skilled in Figma, Sketch & Adobe XD
                  </span>
                </div>
                {/* Feature 3 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Responsive & mobile-first design
                  </span>
                </div>
                {/* Feature 4 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Collaboration with developers
                  </span>
                </div>
                {/* Feature 5 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Rapid prototyping and testing
                  </span>
                </div>
                {/* Feature 6 */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 flex items-center justify-center w-3 sm:w-4 h-3 sm:h-4 rounded-full border border-[#FF4D4D]/40">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF4D4D] rounded-full" />
                  </span>
                  <span className="font-(--font-inter) text-gray-700 text-xs sm:text-sm">
                    Attention to detail & aesthetics
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </section>
    </motion.main>
  );
}
