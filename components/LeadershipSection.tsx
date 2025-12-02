"use client";

import { useMemo } from "react";
import { Timeline } from "@/components/Timeline";
import { leadership } from "@/data/leadership";
import { SectionTitle } from "@/components/SectionTitle";

// Helper function to parse date string (e.g., "Sep 2024", "Apr 2025", or "2025") to a comparable format
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
  
  // Handle year-only format (e.g., "2025")
  if (parts.length === 1) {
    const year = parseInt(parts[0]) || 0;
    return year * 100 + 12; // Use December as default month for year-only dates
  }
  
  // Handle month + year format (e.g., "Sep 2024")
  const month = months[parts[0]] || 0;
  const year = parseInt(parts[1]) || 0;
  return year * 100 + month; // Creates sortable number like 202409 for Sep 2024
}

export function LeadershipSection() {
  // Sort leadership roles so the most recent roles always appear first
  const sortedLeadership = useMemo(() => {
    return [...leadership].sort((a, b) => {
      // Current roles should float to the top
      if (a.current !== b.current) {
        return a.current ? -1 : 1;
      }

      // Sort primarily by end date (descending)
      const endDateA = parseDate(a.endDate);
      const endDateB = parseDate(b.endDate);
      if (endDateA !== endDateB) {
        return endDateB - endDateA;
      }

      // Then by start date (descending)
      const startDateA = parseDate(a.startDate);
      const startDateB = parseDate(b.startDate);
      if (startDateA !== startDateB) {
        return startDateB - startDateA;
      }

      // Final deterministic fallback by organization then role
      const orgComparison = a.organization.localeCompare(b.organization);
      if (orgComparison !== 0) {
        return orgComparison;
      }

      return a.role.localeCompare(b.role);
    });
  }, []);

  return (
    <section id="leadership" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Leadership"
          subtitle="Leadership roles and responsibilities"
          className="mb-8 sm:mb-12 md:mb-16"
        />
        <div className="max-w-4xl mx-auto">
          <Timeline items={sortedLeadership} />
        </div>
      </div>
    </section>
  );
}

