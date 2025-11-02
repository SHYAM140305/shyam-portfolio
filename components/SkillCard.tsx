"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/lib/utils";

interface SkillCardProps {
  skill: string;
  category?: string;
  delay?: number;
}

export function SkillCard({ skill, category, delay = 0 }: SkillCardProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="modern-badge inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-foreground cursor-default"
    >
      <span className="relative z-10">{skill}</span>
    </motion.span>
  );
}

