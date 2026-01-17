"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch {
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center bg-white px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          w-full
          max-w-71.25 sm:max-w-76.25 md:max-w-100
          bg-[#F0F0F0]
          rounded-3xl
          shadow-[0_6px_12px_rgba(0,0,0,0.06),0_15px_30px_rgba(0,0,0,0.10)]
          p-4 sm:p-5 md:p-7
          text-center
          mt-3 sm:mt-4 md:mt-12
        "
      >
        {/* Badge */}
        <span className="inline-block bg-red-500 text-white text-[14px] px-3 py-0.5 rounded-full mb-2 md:mb-3">
          Contact
        </span>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl md:text-3xl font-semibold mb-1">
          Get in <span className="text-red-500">Touch</span>
        </h2>

        <p className="text-[10px] sm:text-[11px] md:text-sm text-gray-500 mb-3 md:mb-5">
          Have anything in mind? I’ll respond within 6 hours.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="
              w-full h-8 sm:h-9 md:h-11
              rounded-full px-3 md:px-5
              text-[12px] md:text-sm
              outline-none bg-white
              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.20)]
              focus:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)]
              transition
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full h-8 sm:h-9 md:h-11
              rounded-full px-3 md:px-5
              text-[12px] md:text-sm
              outline-none bg-white
              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.20)]
              focus:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)]
              transition
            "
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="How we can help you"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="
              w-full rounded-2xl px-3 md:px-5 py-2
              text-[12px] md:text-sm
              outline-none bg-white
              resize-none
              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.20)]
              focus:shadow-[inset_0_3px_6px_rgba(0,0,0,0.25)]
              transition
            "
          />

          {error && <p className="text-red-500 text-[10px]">{error}</p>}
          {success && (
            <p className="text-green-600 text-[10px]">
              Message sent successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
  w-full h-8 sm:h-9 md:h-11 rounded-full bg-black
  active:scale-101
  transition-transform duration-10
  text-white text-[12px] md:text-sm
  shadow-md hover:opacity-90
  disabled:opacity-50
"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-4 md:mt-5">
          <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">
            Let’s Connect
          </p>
          <p className="font-semibold text-[12px] md:text-sm">+12 3456789010</p>
          <p className="font-bold text-[13px] md:text-base mt-0.5">
            <a
              href="mailto:hello@Example.com"
              className="text-gray-600 hover:text-red-500 transition"
            >
              shahiqahmed@gmail.com
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-2 mt-3 md:mt-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:scale-107 transition"
          >
            <FaFacebookF size={15} />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:scale-107 transition"
          >
            <FaInstagram size={15} />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:scale-107 transition"
          >
            <FaLinkedinIn size={15} />
          </Link>
        </div>

        {/* Footer */}
        <p className="text-[8px] md:text-[10px] text-gray-400 mt-4 md:mt-5">
          © Copyright 2024. Rights Reserved.
        </p>
      </motion.div>
    </section>
  );
}
