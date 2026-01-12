"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

const NiddlePointer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  const getAngle = (index) => {
    if (typeof window === "undefined") return 0;
    const isMobile = window.innerWidth < 768;
    const mobileAngles = [-28, 0, 28];
    const desktopAngles = [-15, 0, 15];
    return isMobile ? mobileAngles[index] : desktopAngles[index];
  };

  useEffect(() => {
    if (!inView) return;

    const runIntro = async () => {
      await controls.start({
        rotate: -90,
        opacity: 1,
        transition: { duration: 1 },
      });

      await controls.start({
        rotate: 90,
        transition: { duration: 1, ease: "easeInOut" },
      });

      const firstAngle = getAngle(0);
      await controls.start({
        rotate: firstAngle,
        transition: { duration: 1, ease: "easeOut" },
      });

      setActiveIndex(0);
    };

    runIntro();
  }, [inView, controls]);

  const moveNeedle = (index) => {
    setActiveIndex(index);
    controls.start({
      rotate: getAngle(index),
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  const data = [
    {
      title: "Wireframe",
      desc: "Detailed blueprints for your digital structure.",
      href: "#wireframe",
    },
    {
      title: "Design System",
      desc: "Consistent visual language and components.",
      href: "#design-system",
    },
    {
      title: "High-Fidelity",
      desc: "Pixel-perfect final interactive prototypes.",
      href: "#high-fidelity",
    },
  ];

  return (
    <div ref={ref} className="w-full overflow-x-clip">
      <section className="relative w-full min-h-30 md:min-h-45 mt-0 bg-gray-50 flex items-center">
        {/* Clock */}
        <div
          className={clsx(
            "absolute left-0 top-1/2 -translate-y-1/2",
            "w-75 sm:w-105 md:w-130 lg:w-140",
            "aspect-square pointer-events-none"
          )}
        >
          <div className="relative w-full h-full -translate-x-1/2 flex items-center justify-center">
            {/* Circles */}
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-red-500"
                style={{
                  width: `${100 - i * 10}%`,
                  aspectRatio: "1/1",
                  opacity: 0.2 - i * 0.02,
                }}
              />
            ))}

            {/* NEEDLE */}
            <motion.div
              initial={{ opacity: 0, rotate: -60 }}
              animate={controls}
              className="absolute left-1/2 top-1/2 z-10"
              style={{
                width: "55%",
                height: "2px",
                background: "#ef4444",
                transformOrigin: "left center",
              }}
            >
              <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full" />
            </motion.div>

            {/* Center */}
            <div className="absolute z-20 w-12 h-12 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full h-full flex items-center justify-end">
          <div className="w-full pl-45 sm:pl-87.5 md:pl-150 lg:pl-187.5 pr-6 md:pr-10 flex flex-col justify-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="h-32 md:h-48 flex flex-col justify-center cursor-pointer"
                onMouseEnter={() => moveNeedle(index)}
              >
                <Link href={item.href} scroll>
                  <motion.h2
                    animate={{
                      color: activeIndex === index ? "#ef4444" : "#e5e7eb",
                    }}
                    className="font-bold uppercase tracking-[0.2em] text-base sm:text-lg md:text-2xl lg:text-3xl transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h2>
                </Link>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  className="text-gray-400 text-[10px] md:text-sm mt-4 max-w-35 sm:max-w-md leading-relaxed font-light"
                >
                  {item.desc}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NiddlePointer;
