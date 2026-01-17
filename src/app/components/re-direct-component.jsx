"use client";

import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function Re_Direct() {
  return (
    <section
      className={clsx(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "text-center",
        "mt-16",
        "sm:mt-20",
        "md:mt-24",
        "mb-35",
        "sm:mb-30",
        "md:mb-40",
        "py-14",
        "sm:py-16",
        "md:py-24",
        "px-2",
        "sm:px-4",
        "md:px-8",
        "space-y-6",
        "sm:space-y-8",
        "md:space-y-10",
      )}
    >
      {/* Logo */}
      <div className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-red-500 flex items-center justify-center mx-auto">
        <Image
          src="/Namelogo.png"
          alt="Logo S"
          width={100}
          height={100}
          className="object-contain"
          loading="eager"
        />
      </div>

      {/* Paragraph */}
      <p
        className={`
          max-w-[90%] sm:max-w-lg md:max-w-xl
          text-gray-400
          text-sm sm:text-base md:text-lg
          leading-relaxed
          wrap-break-word
          ${inter.className}
        `}
      >
        Lorem ipsum has been the industry's standard dummy text ever since lorem
        ipsum has been the industry's standard dummy text ever since
      </p>

      {/* Buttons */}
      <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center relative flex-wrap">
        {/* Red Button */}
        <div className="relative">
          <button
            className="bg-red-500 hover:bg-red-600 active:scale-101
             transition-transform duration-20 text-white px-5 sm:px-7 py-2 sm:py-3 rounded-full shadow-md text-sm sm:text-base whitespace-nowrap"
          >
            Discuss your ideas
          </button>

          {/* Handwritten note + curved arrow */}
          <motion.svg
            width="260"
            height="100"
            viewBox="0 0 280 110"
            className={clsx(
              "absolute",
              "left-1/2",
              "-translate-x-[60%]",
              "top-12",
              "scale-75",
              "sm:scale-90",
              "md:scale-100",
              "sm:left-auto",
              "sm:translate-x-0",
              "sm:-left-12",
              "md:-left-16",
            )}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <g className="md:-translate-x-3">
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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

        {/* Dark Button */}
        <button
          className="bg-[#0b0e14] hover:bg-gray-800 active:scale-101
             transition-transform duration-20 text-white px-5 sm:px-7 py-2 sm:py-3 rounded-full shadow-md text-sm sm:text-base whitespace-nowrap"
        >
          View services
        </button>
      </div>
    </section>
  );
}
