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
          relative rounded-lg p-3 min-h-[80px] flex flex-col justify-center items-center
          modern-glass border transition-all duration-300 cursor-default
          ${isDigitalTwin 
            ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:border-amber-500/60" 
            : "border-border/40 hover:border-primary/50 shadow-sm hover:shadow-md"
          }
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
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-xl -z-10"
          />
        )}
        
        <div className="relative z-10 text-center">
          {icon && (
            <span className="text-xl mb-1 block">{icon}</span>
          )}
          <span className={`text-xs font-semibold leading-tight ${
            isDigitalTwin 
              ? "gradient-text text-sm" 
              : "text-foreground"
          }`}>
            {skill}
          </span>
          {isDigitalTwin && (
            <span className="block text-[10px] text-muted-foreground mt-0.5 font-medium">
              Core
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

