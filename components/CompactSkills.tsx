"use client";

import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Skill } from "@/data/skills";
import { staggerContainer } from "@/lib/utils";
import { Sparkles, Code2, Database, Cloud, Wrench, Brain, Layers, Zap } from "lucide-react";

interface CompactSkillsProps {
  groupedSkills: Record<string, Skill[]>;
}

// Category icons mapping - Memoized to prevent recreation
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Languages": Code2,
  "Frontend": Layers,
  "Backend": Database,
  "ML/AI": Brain,
  "Data Processing": Zap,
  "Databases": Database,
  "Cloud & DevOps": Cloud,
  "Tools": Wrench,
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const skillBadgeVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.03,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export const CompactSkills = memo(function CompactSkills({ groupedSkills }: CompactSkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Memoize category entries to prevent unnecessary re-renders
  const categoryEntries = useMemo(() => Object.entries(groupedSkills), [groupedSkills]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
    >
      {categoryEntries.map(([category, categorySkills], catIndex) => {
        const IconComponent = categoryIcons[category] || Sparkles;
        
        return (
        <motion.div
          key={category}
          variants={cardVariants}
          whileHover={shouldReduceMotion ? undefined : { 
            y: -6, 
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group relative rounded-2xl overflow-hidden"
        >
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-amber-600/30 p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full h-full rounded-2xl bg-background" />
          </div>

          {/* Main card */}
          <div className="relative rounded-2xl modern-glass-strong border border-border/40 group-hover:border-amber-500/50 transition-all duration-500 p-4 sm:p-5 shadow-xl group-hover:shadow-2xl bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl overflow-hidden h-full flex flex-col">
            {/* Animated background gradient - Only animate on hover */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                initial={false}
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.08), transparent 60%)",
                    "radial-gradient(circle at 100% 100%, rgba(249, 115, 22, 0.08), transparent 60%)",
                    "radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.08), transparent 60%)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{}}
              />
            )}

            {/* Shimmer effect on hover - Optimized */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(251, 146, 60, 0.1) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="mb-4 pb-4 border-b border-border/30 group-hover:border-amber-500/40 transition-all duration-500">
                <motion.div
                  className="flex items-start justify-between gap-3 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 + 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {/* Category icon */}
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      whileHover={shouldReduceMotion ? undefined : { 
                        scale: 1.15, 
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.div>

                    {/* Category title */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-xl sm:text-2xl font-extrabold gradient-text tracking-tight leading-tight truncate"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 + 0.25, duration: 0.4 }}
                      >
                        {category}
                      </motion.h3>
                    </div>
                  </div>
                </motion.div>
                
                {/* Skill count badge */}
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 + 0.35, duration: 0.3 }}
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/25 shadow-sm group-hover:border-amber-500/40 group-hover:shadow-md transition-all duration-300">
                    <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-foreground/90">
                      {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                </motion.div>
              </div>
              
              {/* Skills grid */}
              <div className="flex-1 flex flex-wrap gap-2 content-start">
                {categorySkills.map((skill, index) => (
                  <motion.span
                    key={`${category}-${skill.name}`}
                    custom={index}
                    variants={skillBadgeVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{}}
                    whileHover={shouldReduceMotion ? undefined : { 
                      y: -2, 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="group/badge relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-br from-muted/70 via-muted/60 to-muted/70 hover:from-amber-500/20 hover:via-orange-500/15 hover:to-amber-500/20 border border-border/40 hover:border-amber-500/50 text-foreground cursor-default shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden"
                  >
                    {/* Badge shimmer - Only on hover */}
                    {!shouldReduceMotion && (
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/badge:opacity-100"
                        initial={false}
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut",
                        }}
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                          width: "50%",
                        }}
                      />
                    )}

                    {/* Icon */}
                    {skill.icon && (
                      <motion.span 
                        className="text-base relative z-10 flex-shrink-0"
                        aria-hidden="true"
                        whileHover={shouldReduceMotion ? undefined : { 
                          scale: 1.2, 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        {skill.icon}
                      </motion.span>
                    )}
                    
                    {/* Skill name */}
                    <span className="relative z-10 whitespace-nowrap group-hover/badge:text-amber-700 dark:group-hover/badge:text-amber-300 transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        );
      })}
    </motion.div>
  );
});
