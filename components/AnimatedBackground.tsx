"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  // Always render the same structure to prevent hydration mismatch
  // Use consistent initial and animate props that match on server and client
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        initial={{ scale: 1, opacity: 0.03 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"
        style={{ 
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        initial={{ scale: 1.05, opacity: 0.04 }}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.04, 0.03, 0.04],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/3 via-orange-500/3 to-amber-500/3 rounded-full blur-3xl"
        style={{ 
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}

