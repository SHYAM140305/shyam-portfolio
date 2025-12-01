"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/lib/utils";

interface SkillCardProps {
  skill: string;
  category?: string;
  delay?: number;
  icon?: string;
}

export function SkillCard({ skill, category, delay = 0, icon }: SkillCardProps) {
  const isDigitalTwin = skill === "Digital Twin";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.05, 
        y: -4,
        rotateX: 5,
        rotateY: 5,
        z: 20
      }}
      className={`relative group ${
        isDigitalTwin 
          ? "perspective-1000" 
          : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className={`
          relative rounded-professional-lg p-4 min-h-[90px] flex flex-col justify-center items-center
          modern-glass border transition-all duration-300 cursor-default card-professional gold-card
          ${isDigitalTwin ? "gold-card-feature" : ""}
        `}
      >
        {/* Glow effect for Digital Twin */}
        {isDigitalTwin && (
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-xl gold-glow -z-10"
          />
        )}
        
        <div className="relative z-10 text-center">
          {icon && (
            <motion.span 
              className="text-2xl mb-2 block"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.span>
          )}
          <span className={`text-sm font-semibold leading-tight ${
            isDigitalTwin 
              ? "gradient-text text-base" 
              : "text-foreground"
          }`}>
            {skill}
          </span>
          {isDigitalTwin && (
            <motion.span 
              className="block text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Core
            </motion.span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

