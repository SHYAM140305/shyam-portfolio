"use client";

import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Skill } from "@/data/skills";
import { Sparkles, Code2, Database, Cloud, Wrench, Brain, Layers, Zap } from "lucide-react";
import { skillIconMap, DefaultSkillIcon } from "@/data/skillIcons";

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
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Simplified skill badge variants - no individual delays to reduce animation overhead
const skillBadgeVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Local stagger container with minimal delay for better performance
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.01, // Reduced stagger for faster rendering and less scroll lag
    },
  },
};

export const CompactSkills = memo(function CompactSkills({ groupedSkills }: CompactSkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Memoize category entries to prevent unnecessary re-renders
  const categoryEntries = useMemo(() => Object.entries(groupedSkills), [groupedSkills]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "150px" }} // Trigger much later to reduce scroll lag
      variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {categoryEntries.map(([category, categorySkills], catIndex) => {
        const IconComponent = categoryIcons[category] || Sparkles;
        
        return (
        <motion.div
          key={category}
          variants={cardVariants}
          whileHover={shouldReduceMotion ? undefined : { 
            y: -4, 
            scale: 1.01,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          className="group relative rounded-2xl overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-amber-600/30 p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full h-full rounded-2xl bg-background" />
          </div>

          {/* Main card - Reduced backdrop-blur for better performance */}
          <div className="relative rounded-2xl modern-glass-strong border border-border/40 group-hover:border-amber-500/50 transition-all duration-500 p-4 sm:p-5 shadow-xl group-hover:shadow-2xl bg-gradient-to-br from-card/95 via-card/90 to-card/95 overflow-hidden h-full flex flex-col">
            {/* Animated background gradient - Only animate on hover, use CSS for better performance */}
            {!shouldReduceMotion && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle at 0% 0%, rgba(251, 146, 60, 0.08), transparent 60%)",
                  willChange: "opacity",
                }}
              />
            )}

            {/* Shimmer effect on hover - Use CSS animation for better performance */}
            {!shouldReduceMotion && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(251, 146, 60, 0.1) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s linear infinite",
                  willChange: "background-position",
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="mb-4 pb-4 border-b border-border/30 group-hover:border-amber-500/40 transition-all duration-500">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {/* Category icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-200 group-hover:scale-105">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Category title */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-extrabold gradient-text tracking-tight leading-tight truncate">
                        {category}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Skill count badge */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/25 shadow-sm group-hover:border-amber-500/40 group-hover:shadow-md transition-all duration-300">
                    <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-foreground/90">
                      {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Skills grid - Simplified: batch animate all badges together */}
              <motion.div 
                className="flex-1 flex flex-wrap gap-2 content-start"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.005, // Further reduced stagger for less scroll lag
                      delayChildren: 0.02,
                    },
                  },
                }}
              >
                {categorySkills.map((skill, index) => (
                  <motion.span
                    key={`${category}-${skill.name}`}
                    variants={skillBadgeVariants}
                    style={{ willChange: "opacity, transform" }}
                    whileHover={shouldReduceMotion ? undefined : { 
                      y: -2, 
                      scale: 1.05,
                      transition: { duration: 0.15, ease: "easeOut" }
                    }}
                    className="group/badge relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-br from-muted/70 via-muted/60 to-muted/70 hover:from-amber-500/20 hover:via-orange-500/15 hover:to-amber-500/20 border border-border/40 hover:border-amber-500/50 text-foreground cursor-default shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Badge shimmer - Only on hover, use CSS for better performance */}
                    {!shouldReduceMotion && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover/badge:opacity-100"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                          width: "50%",
                          animation: "badge-shimmer 1.5s ease-in-out infinite",
                          animationDelay: "2s",
                          willChange: "transform",
                        }}
                      />
                    )}

                    {/* Icon */}
                    {(() => {
                      const IconComponent = skillIconMap[skill.name] || DefaultSkillIcon;
                      return (
                        <IconComponent 
                          className="w-3.5 h-3.5 relative z-10 flex-shrink-0 text-foreground/70 group-hover/badge:text-amber-600 dark:group-hover/badge:text-amber-400 transition-colors duration-200"
                          aria-hidden="true"
                        />
                      );
                    })()}
                    
                    {/* Skill name */}
                    <span className="relative z-10 whitespace-nowrap group-hover/badge:text-amber-700 dark:group-hover/badge:text-amber-300 transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
        );
      })}
    </motion.div>
  );
});
