"use client";

import Link from "next/link";
import { FaHome, FaToolbox } from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { BsQuestionSquare } from "react-icons/bs";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import clsx from "clsx";

/* ---------------- ORBIT DATA ---------------- */

const orbitItems = [
  { href: "/", icon: FaHome },
  { href: "/about", icon: FaToolbox },
  { href: "/profile", icon: TbTools },
  { href: "/gallery", icon: LuPenTool },
  { href: "/contact", icon: TfiWrite },
  { href: "/phone", icon: BsQuestionSquare },
  { href: "/favorites", icon: FaToolbox },
  { href: "/search", icon: TbTools },
  { href: "/notifications", icon: LuPenTool },
  { href: "/settings", icon: TfiWrite },
  { href: "/features", icon: BsQuestionSquare },
  { href: "/apps", icon: FaToolbox },
];

/* ---------------- ORBIT COMPONENT ---------------- */

function Orbit({ direction = "clockwise" }) {
  const orbitRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(orbitRef, { once: false, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      controls.start({
        rotate: direction === "clockwise" ? 360 : -360,
        transition: { repeat: Infinity, ease: "linear", duration: 20 },
      });
    } else {
      controls.stop();
    }
  }, [inView, controls, direction]);

  return (
    <motion.div
      ref={orbitRef}
      className="orbit-system orbit"
      animate={controls}
      style={{ originX: "50%", originY: "50%" }}
    >
      <div className="orbit-ring outer">
        {orbitItems.map((item, index) => {
          const angle = (360 / orbitItems.length) * index;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className="orbit-link"
              style={{
                transform: `rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(-${angle}deg)`,
              }}
            >
              <motion.div
                className="orbit-icon"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0px 0px 12px rgba(255, 0, 0, 0.6)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: index * 0.02,
                }}
              >
                <Icon size={20} />
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="orbit-ring middle" />
      <div className="orbit-ring inner" />
    </motion.div>
  );
}

/* ---------------- HERO SECTION ---------------- */

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* ORBITAL NAVS */}
      <div className="orbit-wrapper left">
        <Orbit direction="clockwise" />
      </div>
      <div className="orbit-wrapper right">
        <Orbit direction="counterclockwise" />
      </div>

      {/* HERO CONTENT */}
      <motion.div
        className="relative z-10 max-w-3xl text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
          Designing Intuitive <br />
          <span className="text-red-500">Digital Experiences</span>
        </h1>

        <p className="mt-6 text-gray-500 text-base md:text-lg">
          UI/UX Designer focused on creating clean, functional, and
          user-centered interfaces for web and mobile products.
        </p>

        {/* BUTTONS + HANDWRITTEN NOTE */}
        <div className="mt-8 flex items-center justify-center gap-4 relative">
          <button
            className={clsx(
              "bg-red-500 hover:bg-red-600 active:scale-101",
              "transition-transform duration-20",
              "text-white px-5 sm:px-7 py-2 sm:py-3",
              "rounded-full shadow-[3px_3px_0px_2px_rgba()]",
              "text-sm sm:text-base whitespace-nowrap",
            )}
          >
            Discuss your ideas
          </button>

          {/* Button Text + Arrow */}
          <div className="relative">
            <button
              className={clsx(
                "bg-[#0b0e14] hover:bg-gray-800 active:scale-101",
                "transition-transform duration-20",
                "text-white px-5 sm:px-7 py-2 sm:py-3",
                "rounded-full border shadow-[3px_3px_0px_2px_rgba()]",
                "text-sm sm:text-base whitespace-nowrap",
              )}
            >
              View services
            </button>

            {/* Handwritten note + curved arrow */}
            <motion.svg
              width="280"
              height="110"
              viewBox="0 0 280 110"
              className={clsx(
                "hidden lg:block", // hide on mobile + tablet,
                "absolute",
                "-left-75",
                "top-5",
              )}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {/* Handwritten text */}
              <g className="md:-translate-x-2">
                <text
                  x="10"
                  y="78"
                  fill="#ff4d4d"
                  fontSize="13"
                  fontFamily="'Dancing Script', 'Segoe Script', 'Cursive'"
                >
                  Schedule a free call now
                </text>
              </g>

              {/* Arrow */}
              <svg
                width="100"
                height="80"
                viewBox="0 0 100 80"
                fill="none"
                className="-rotate-1"
              >
                <motion.path
                  d="M 10 65 Q 12 15 85 15 M 70 5 L 85 15 L 70 28"
                  stroke="#FF4D4D"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  viewport={{ once: true }}
                />
              </svg>
            </motion.svg>
          </div>
        </div>

        {/* CLIENTS */}
        <div className="mt-12">
          <p className="text-xs tracking-widest text-gray-400 mb-4">
            OUR TRUSTED CLIENTS
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
            <span>Nexter</span>
            <span>Oslo</span>
            <span>Nome</span>
            <span>Next</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
