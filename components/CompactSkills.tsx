"use client";

import { motion } from "framer-motion";
import { Skill } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/utils";

interface CompactSkillsProps {
  groupedSkills: Record<string, Skill[]>;
}

export function CompactSkills({ groupedSkills }: CompactSkillsProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="space-y-8"
    >
      {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
        <motion.div
          key={category}
          variants={fadeInUp}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-gradient-to-r from-amber-500/60 to-orange-500/60 rounded-full" />
            <h3 className="text-base sm:text-lg font-semibold gradient-text">{category}</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill, index) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (catIndex * 0.05) + (index * 0.02) }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium modern-glass border border-border/40 hover:border-primary/50 text-foreground hover:bg-muted/50 transition-all duration-200 cursor-default"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

