"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface LetterProps {
  char: string;
  index: number;
  isSpace?: boolean;
}

// Optimized: Simplified letter component with CSS-based hover effects
const Letter = memo(({ char, index, isSpace = false }: LetterProps) => {
  if (isSpace) {
    return <span className="hero-letter-space" />;
  }

  return (
    <motion.span
      className="hero-letter"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.05 },
        y: { duration: 0.4, delay: index * 0.05, ease: "easeOut" },
      }}
      style={{
        display: "inline-block",
      }}
    >
      {char}
    </motion.span>
  );
});

Letter.displayName = "Letter";

export const AnimatedName = memo(({ name = "Shyam J" }: { name?: string }) => {
  return (
    <div className="hero-name-container">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 leading-[1.1] px-4 text-foreground hero-name">
        {name.split("").map((char, index) => (
          <Letter
            key={`${char}-${index}`}
            char={char === " " ? "" : char}
            index={index}
            isSpace={char === " "}
          />
        ))}
      </h1>
    </div>
  );
});

AnimatedName.displayName = "AnimatedName";
