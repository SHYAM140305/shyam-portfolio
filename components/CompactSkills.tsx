"use client";

import { memo, useMemo, useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Skill } from "@/data/skills";
import { Sparkles, Code2, Database, Cloud, Wrench, Brain, Layers, Zap, ChevronRight } from "lucide-react";
import { skillIconMap, DefaultSkillIcon } from "@/data/skillIcons";

interface CompactSkillsProps {
  groupedSkills: Record<string, Skill[]>;
}

// Category icons mapping
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

// Simplified variants for better performance
const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const CompactSkills = memo(function CompactSkills({ groupedSkills }: CompactSkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categoryEntries = useMemo(() => Object.entries(groupedSkills), [groupedSkills]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* Creative Skills Grid - Compact - Optimized */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        style={{ contain: "layout style paint" }}
      >
        {categoryEntries.map(([category, categorySkills], catIndex) => {
          const IconComponent = categoryIcons[category] || Sparkles;
          const isHovered = hoveredCategory === category;
          
          return (
            <motion.div
              key={category}
              variants={cardVariants}
              onHoverStart={() => !shouldReduceMotion && setHoveredCategory(category)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="group relative gpu-accelerated"
              style={{ willChange: "transform" }}
            >
              {/* Modern glass card with internal gold glow (no gold border) */}
              <div className="relative rounded-2xl p-4 sm:p-5 overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1 modern-glass card-professional">
                {/* Top glass highlight strip (white) */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/20 via-white/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Gold-tinted internal glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-300 gold-glass-overlay" />
                {/* Corner gold light blobs */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent/18 rounded-full blur-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-primary/18 rounded-full blur-2xl opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header Section - Compact - Simplified */}
                  <div className="mb-4 pb-3 border-b border-border/30 group-hover:border-foreground/20 transition-colors duration-300">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      {/* Category Icon & Title */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative flex-shrink-0 group/icon">
                          <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                          <div className="relative w-10 h-10 rounded-xl bg-background/80 border border-amber-500/40 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover/icon:scale-110">
                            <IconComponent className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        
                        {/* Category Title with subtle gold gradient */}
                        <h3 className="text-lg sm:text-xl font-bold text-foreground truncate text-gradient-professional">
                          {category}
                        </h3>
                      </div>
                      
                      {/* Skill Count - Compact with gold touch */}
                      <div className="flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/50 text-xs sm:text-sm font-medium text-primary transition-transform duration-200 hover:scale-105">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold">
                          {categorySkills.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills Grid - Compact - Optimized with CSS */}
                  <div className="flex-1 flex flex-wrap gap-2 content-start">
                    {categorySkills.map((skill, index) => {
                      const IconComponent = skillIconMap[skill.name] || DefaultSkillIcon;
                      return (
                        <div
                          key={`${category}-${skill.name}`}
                          data-skill-name={skill.name}
                          className="group/badge relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/70 backdrop-blur-sm border border-amber-500/35 hover:border-amber-500/60 text-xs sm:text-sm font-medium text-foreground/90 cursor-default shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden gpu-accelerated"
                          style={{ willChange: "transform" }}
                        >
                          {/* Hover background effect - CSS only */}
                          <div className="absolute inset-0 bg-foreground/5 scale-0 group-hover/badge:scale-100 transition-transform duration-200 rounded-lg" />
                          
                          {/* Icon */}
                          <IconComponent className="w-3.5 h-3.5 relative z-10 text-foreground/70 group-hover/badge:text-foreground transition-colors duration-200 flex-shrink-0" />
                          
                          {/* Skill name */}
                          <span className="relative z-10 whitespace-nowrap group-hover/badge:font-semibold transition-all duration-200">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});
