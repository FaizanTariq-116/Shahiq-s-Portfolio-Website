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

  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const fullText = aboutData?.introText || "";
 
  // Fetch About data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about");
        const data = await res.json();
        setAboutData(data);
      } catch (error) {
        console.error("About fetch error:", error);
      } finally {
        setLoading(false); // ✅ stop skeleton
      }
    };
    fetchAbout();
  }, []);

  useEffect(() => {
  if (aboutData?.introText) {
    setDisplayText("");
    setCharIndex(0);
    setIsDeleting(false);
    setIsFading(false);
  }
}, [aboutData?.introText]);

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
        "bg-white min-h-screen flex items-center px-4 sm:px-6 md:px-12",
      )}
    >
      <section className="w-full py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* ================= IMAGE SECTION ================= */}
          <motion.div
            className="relative flex justify-center md:order-2"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-52 h-60 sm:w-64 sm:h-72 md:w-96 md:h-104"
              variants={itemVariants}
            >
              <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-52 h-52 sm:w-60 sm:h-60 md:w-84 md:h-84 bg-black rounded-full border-2 border-red-500 z-0" />

              <div className="absolute inset-0 z-10 flex justify-center">
                {loading ? (
                  // ✅ Skeleton image
                  <div className="w-full h-full bg-gray-200 rounded-full animate-pulse" />
                ) : (
                  <Image
                    src={aboutData?.image || "/Rectangle.png"}
                    alt="Shahiq portrait"
                    fill
                    priority
                    className="object-contain grayscale"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ================= TEXT SECTION ================= */}
          <motion.div
            className="md:order-1 mt-24 sm:mt-32 pl-2 sm:pl-4 md:pl-6"
            variants={itemVariants}
          >
            {/* Name */}
            {loading ? (
              <div className="w-48 h-10 bg-gray-300 rounded animate-pulse mb-6"></div>
            ) : (
              <motion.h1
                className={clsx(
                  ceviche.className,
                  "text-red-500 text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6",
                )}
                animate={{ opacity: isFading ? 0 : 1 }}
                transition={{ duration: 0.6 }}
              >
                {displayText}
                <span className="inline-block w-1 h-8 bg-black ml-2 blink" />
              </motion.h1>
            )}

            {/* Description */}
            {loading ? (
              <div className={clsx("space-y-3 mb-6 max-w-xl")}>
                <div
                  className={clsx(
                    "w-full h-4 rounded-md bg-gray-200 animate-pulse",
                  )}
                ></div>
                <div
                  className={clsx(
                    "w-11/12 h-4 rounded-md bg-gray-200 animate-pulse",
                  )}
                ></div>
                <div
                  className={clsx(
                    "w-9/12 h-4 rounded-md bg-gray-200 animate-pulse",
                  )}
                ></div>
              </div>
            ) : (
              <motion.p
                key={aboutData?.description} // important for animation
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-sans text-gray-700 max-w-xl mb-6 sm:mb-8 leading-relaxed text-[15px] sm:text-base md:text-lg"
              >
                {aboutData?.description}
              </motion.p>
            )}

            {/* Skills */}
            {loading ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-4 sm:mt-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              aboutData?.skills && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-4 sm:mt-6">
                  {aboutData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(255,77,77,0.15)]"></span>
                      <p className="text-xs sm:text-sm text-gray-700 font-medium">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
