"use client";

import { useMemo } from "react";
import { SectionTitle } from "@/components/SectionTitle";
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
    <section id="experience" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration - Reduced animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Experience"
          subtitle="Professional journey"
          className="mb-8 sm:mb-10"
        />
        <div className="max-w-4xl mx-auto">
          <Timeline items={sortedExperiences} />
        </div>
      </div>
    </section>
  );
}

