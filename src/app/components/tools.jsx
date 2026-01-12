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
        "bg-white overflow-hidden px-4"
      )}
    >
      {/* ================= CENTER HUB ================= */}
      <div
        className={clsx(
          "absolute z-10 rounded-full",
          "w-[clamp(78px,20vw,110px)]",
          "h-[clamp(78px,20vw,110px)]",
          "bg-linear-to-br from-red-400"
        )}
      />

      {/* ================= INNER RING ================= */}
      <div
        className={clsx(
          "absolute rounded-full",
          "w-[clamp(170px,46vw,260px)]",
          "h-[clamp(170px,46vw,260px)]",
          "border border-red-300/40"
        )}
      />

      {/* ================= MIDDLE RING ================= */}
      <div
        className={clsx(
          "absolute rounded-full",
          "w-[clamp(250px,66vw,360px)]",
          "h-[clamp(250px,66vw,360px)]",
          "border border-red-300/30"
        )}
      />

      {/* ================= ROTATING OUTER RING ================= */}
      <motion.div
        className={clsx(
          "absolute rounded-full",
          "w-[clamp(300px,80vw,380px)]", // slightly smaller max width for mobiles
          "h-[clamp(300px,80vw,380px)]",
          "border border-red-300/40"
        )}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {orbitItems.map((item, index) => {
          const angle = (360 / orbitItems.length) * index;
          const Icon = item.icon;

          // responsive translateX, smaller on mobile
          const translateX = `clamp(100px, 35vw, 160px)`;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${translateX}) rotate(-${angle}deg)`,
              }}
            >
              <Link href={item.href}>
                <motion.div
                  className={clsx(
                    "w-[clamp(36px,9vw,48px)]",
                    "h-[clamp(36px,9vw,48px)]",
                    "rounded-full bg-white",
                    "flex items-center justify-center"
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
                  whileHover={{ scale: 1.2 }}
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
