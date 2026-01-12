"use client";

import Link from "next/link";
import { FaHome, FaToolbox } from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { BsQuestionSquare } from "react-icons/bs";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

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

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* ORBITAL NAVBARS */}
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
          UI/UX Designer focused on creating clean, functional, and user-centered
          interfaces for web and mobile products.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition">
            Discuss your ideas
          </button>
          <button className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors">
            Button Text
          </button>
        </div>

        <p className="mt-4 text-sm text-red-400 italic">
          Schedule a free call now
        </p>

        <div className="mt-12">
          <p className="text-xs tracking-widest text-gray-400 mb-4">
            OUR TRUSTED CLIENTS
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
            <span>Nexter</span>
            <span>oslo.</span>
            <span>NOME</span>
            <span>next</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
