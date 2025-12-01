"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`${className || ""}`}
    >
      <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3 text-center px-2">
        <span className="gradient-text block">{title}</span>
      </h2>
      <div className="golden-divider" aria-hidden="true" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-sm xs:text-base sm:text-lg text-muted-foreground text-center font-light max-w-2xl mx-auto px-2"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

