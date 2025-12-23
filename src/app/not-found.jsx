"use client";

import Link from "next/link";
import { HiMiniHome } from "react-icons/hi2";
import { motion } from "framer-motion";
motion;

export default function NotFound() {
  return (
    <section className="bg-[#5bb4b7] text-white p-8 sm:p-16 md:p-32 xl:p-48">
      <div className="max-w-3xl mx-auto flex justify-center items-center gap-8">
        <div className="flex justify-center gap-2">
          {[4, 0, 4].map((n, i) => (
            <motion.h1
              key={i}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.3,
                ease: "easeOut",
              }}
              className="text-[60px] sm:text-[100px] md:text-[140px] font-extrabold text-[#fc8298]"
            >
              {n}
            </motion.h1>
          ))}
        </div>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 200 }}
          duration={{ duration: 5, delay: 5, ease: "easeOut" }}
          className="w-px bg-white"
        ></motion.div>

        <div>
          {/* Message */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-4xl font-bold"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-4 text-white/90 text-xs sm:text-sm"
          >
            The page you’re looking for doesn’t exist or may have been moved.
            Let’s get you back to a safe place.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="btn-primary flex items-center gap-2 w-fit"
            >
              <HiMiniHome size={24} />{" "}
              <p className="flex gap-1">
                <span className="hidden sm:block ">Back to</span>{" "}
                <span>Home</span>
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
