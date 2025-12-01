"use client";

import { useMemo } from "react";
import { Timeline } from "@/components/Timeline";
import { experiences } from "@/data/experience";
import { SectionTitle } from "@/components/SectionTitle";

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
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Experience"
          subtitle="Professional journey"
          className="mb-8 sm:mb-12 md:mb-16"
        />
        <div className="max-w-4xl mx-auto">
          <Timeline items={sortedExperiences} />
        </div>
      </div>
    </section>
  );
}

