"use client";

import Image from "next/image";
import { Inter, Ceviche_One } from "next/font/google";
import clsx from "clsx";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

  const fullText = "I'm Shahiq,";
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  useEffect(() => {
    if (!inView) return;

    const typingSpeed = 120;
    const deletingSpeed = 80;

    const pauseBeforeDelete = 700;
    const pauseBeforeTyping = 700;

    let timer;

    if (!isDeleting) {
      if (charIndex < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        setIsFading(true);
        timer = setTimeout(() => {
          setIsDeleting(true);
          setIsFading(false);
        }, pauseBeforeDelete);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        setIsFading(true);
        timer = setTimeout(() => {
          setIsDeleting(false);
          setIsFading(false);
        }, pauseBeforeTyping);
      }
    } 

    return () => clearTimeout(timer);
  }, [charIndex, fullText, inView, isDeleting]);

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
      <section className={clsx("w-full py-16 sm:py-20")}>
        <div
          className={clsx(
            "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
          )}
        >
          <motion.div
            className={clsx("relative flex justify-center md:order-2")}
            variants={itemVariants}
          >
            <div
              className={clsx(
                "absolute inset-0 flex items-center justify-center mt-12 sm:mt-16 md:mt-20 overflow-visible"
              )}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: `${95 + i * 8}%`,
                    aspectRatio: "1 / 1",
                  }}
                  className={clsx(
                    "absolute rounded-full border border-[#FF4D4D]/15"
                  )}
                  variants={itemVariants}
                />
              ))}
            </div>

            <motion.div
              className={clsx(
                "relative w-52 h-60 sm:w-64 sm:h-72 md:w-96 md:h-104"
              )}
              variants={itemVariants}
            >
              <div
                className={clsx(
                  "absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-52 h-52 sm:w-60 sm:h-60 md:w-84 md:h-84 bg-black rounded-full border-2 border-red-500 z-0"
                )}
              />

              <div className={clsx("absolute inset-0 z-10 flex justify-center")}>
                <Image
                  src="/Rectangle.png"
                  alt="Shahiq portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 384px"
                  className={clsx("object-contain grayscale")}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={clsx("md:order-1 mt-24 sm:mt-32 pl-2 sm:pl-4 md:pl-6")}
            variants={itemVariants}
          >
            <motion.h1
              className={clsx(
                ceviche.className,
                "text-red-500 text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6"
              )}
              variants={itemVariants}
              animate={{ opacity: isFading ? 0 : 1 }}
              transition={{ duration: 0.6 }}
            >
              {displayText}
              <span className={clsx("inline-block w-1 h-8 bg-black ml-2 blink")} />
            </motion.h1>

            <motion.p
              className={clsx(
                "font-sans text-gray-600 max-w-xl mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
              )}
              variants={itemVariants}
            >
              A UI/UX designer with hands-on experience designing websites and
              mobile applications. I enjoy solving complex problems through
              simple, elegant design solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
