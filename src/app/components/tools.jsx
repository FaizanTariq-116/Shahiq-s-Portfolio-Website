"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FaReact, FaHome, FaToolbox } from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import { BsQuestionSquare } from "react-icons/bs";

const orbitItems = [
  { icon: FaHome, href: "/" },
  { icon: FaReact, href: "/react" },
  { icon: FaToolbox, href: "/toolbox" },
  { icon: TbTools, href: "/services" },
  { icon: LuPenTool, href: "/design" },
  { icon: BsQuestionSquare, href: "/faq" },
];

export default function Tools() {
  return (
    <section
      className={clsx(
        "relative w-full",
        "min-h-140",
        "h-[65svh] sm:h-[80vh]",
        "flex items-center justify-center",
        "bg-white overflow-hidden px-4",
      )}
    >
      {/* ================= CENTER HUB ================= */}
      <div
        className={clsx(
          "absolute z-10 rounded-full",
          "w-[clamp(78px,20vw,110px)]",
          "h-[clamp(78px,20vw,110px)]",
          "bg-linear-to-br from-red-400",
        )}
      />

      {/* ================= INNER RING ================= */}
      <div
        className={clsx(
          "absolute rounded-full",
          "w-[clamp(185px,48vw,280px)]",
          "h-[clamp(185px,48vw,280px)]",
          "border border-red-300/40",
        )}
      />

      {/* ================= MIDDLE RING ================= */}
      <div
        className={clsx(
          "absolute rounded-full",

          // Mobile size reduced
          "w-[clamp(220px,62vw,300px)]",
          "h-[clamp(220px,62vw,300px)]",

          // Desktop original size
          "sm:w-[clamp(270px,70vw,380px)]",
          "sm:h-[clamp(270px,70vw,380px)]",

          "border border-red-300/30",
        )}
      />

      {/* ================= ROTATING OUTER RING ================= */}
      <motion.div
        className={clsx(
          "absolute rounded-full",
          // ✅ MOBILE SIZE REDUCED
          "w-[clamp(284px,78vw,340px)]",
          "h-[clamp(280px,78vw,340px)]",
          // ✅ ORIGINAL SIZE FROM SM UPWARDS
          "sm:w-[clamp(330px,82vw,410px)]",
          "sm:h-[clamp(330px,82vw,410px)]",
          "lg:w-[clamp(380px,75vw,470px)]",
          "lg:h-[clamp(380px,75vw,470px)]",
          "border border-red-300/40",

          // ✔ Orbit radius increased so all icons stay on outer ring
          "[--orbit-radius:clamp(140px,38vw,160px)]",
          "sm:[--orbit-radius:clamp(170px,40vw,185px)]",
          "lg:[--orbit-radius:clamp(195px,42vw,210px)]",
        )}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {orbitItems.map((item, index) => {
          const angle = (360 / orbitItems.length) * index;
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(-${angle}deg)`,
              }}
            >
              <Link href={item.href}>
                <motion.div
                  className={clsx(
                    // ✅ MOBILE ICON SIZE REDUCED
                    "w-[clamp(30px,8vw,40px)]",
                    "h-[clamp(30px,8vw,40px)]",
                    "sm:w-[clamp(36px,9vw,48px)]",
                    "sm:h-[clamp(36px,9vw,48px)]",

                    "rounded-full",
                    "bg-white",
                    "flex items-center justify-center",
                    "ring-1 ring-red-300/60",
                    "shadow-sm",
                    "transition-shadow",
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.02,
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 0 6px rgba(239,68,68,0.12)",
                  }}
                >
                  <Icon className="text-red-500 text-[clamp(15px,4vw,20px)]" />
                </motion.div>
              </Link>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
