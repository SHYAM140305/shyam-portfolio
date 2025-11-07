"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";

interface LetterProps {
  char: string;
  index: number;
  isSpace?: boolean;
}

const Letter = ({ char, index, isSpace = false }: LetterProps) => {
  const letterRef = useRef<HTMLSpanElement>(null);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState("");

  // Motion values for smooth 3D transforms
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });
  const translateZ = useSpring(useTransform(mouseX, [-50, 50], [0, 30]), {
    stiffness: 300,
    damping: 30,
  });

  // Update transform string when motion values change
  const updateTransform = () => {
    if (isHoveredRef.current && letterRef.current) {
      const rx = rotateX.get();
      const ry = rotateY.get();
      const tz = translateZ.get();
      setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`);
    }
  };

  useMotionValueEvent(rotateX, "change", updateTransform);
  useMotionValueEvent(rotateY, "change", updateTransform);
  useMotionValueEvent(translateZ, "change", updateTransform);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!letterRef.current || !isHovered) return;
    
    const rect = letterRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
  };

  if (isSpace) {
    return <span className="hero-letter-space" />;
  }

  return (
    <motion.span
      ref={letterRef}
      className="hero-letter"
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08 },
        y: { duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 100, damping: 15 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transformStyle: "preserve-3d",
        display: "inline-block",
      }}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 15 },
      }}
    >
      {char}
    </motion.span>
  );
};

export const AnimatedName = ({ name = "Shyam J" }: { name?: string }) => {
  return (
    <motion.div
      className="hero-name-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};
