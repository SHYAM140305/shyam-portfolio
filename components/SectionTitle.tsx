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
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`${className || ""}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-0.5 sm:h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-full hidden sm:block dark:from-amber-500/60 dark:via-orange-500/60 dark:to-amber-600/60"
        />
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text pb-1 tracking-tight" style={{ lineHeight: '1.2' }}>
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 h-0.5 sm:h-1 bg-gradient-to-r from-orange-500/40 via-orange-400/30 to-transparent rounded-full hidden sm:block dark:from-amber-500/20 dark:via-orange-500/20"
        />
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

