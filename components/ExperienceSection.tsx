"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/Timeline";
import { experiences } from "@/data/experience";

// Helper function to parse date string (e.g., "Sep 2024" or "Apr 2025") to a comparable format
function parseDate(dateStr: string): number {
  // Handle "Present" as a very large number to sort it first
  if (dateStr === "Present") {
    return 999999;
  }
  
  const months: Record<string, number> = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
  };
  
  const parts = dateStr.split(" ");
  const month = months[parts[0]] || 0;
  const year = parseInt(parts[1]) || 0;
  return year * 100 + month; // Creates sortable number like 202409 for Sep 2024
}

export function ExperienceSection() {
  // Sort experiences chronologically (most recent first)
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      // If current, prioritize it
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;
      
      // Sort by end date first (most recent end date first)
      const endDateA = parseDate(a.endDate);
      const endDateB = parseDate(b.endDate);
      if (endDateB !== endDateA) {
        return endDateB - endDateA;
      }
      
      // If end dates are same, sort by start date (most recent start date first)
      const startDateA = parseDate(a.startDate);
      const startDateB = parseDate(b.startDate);
      return startDateB - startDateA;
    });
  }, []);

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Clean section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3 text-center px-2">
              Experience
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm xs:text-base sm:text-lg text-muted-foreground text-center font-light max-w-2xl mx-auto px-2"
          >
            Professional journey
          </motion.p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <Timeline items={sortedExperiences} />
        </div>
      </div>
    </section>
  );
}

