"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Timeline } from "@/components/Timeline";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration - Reduced animations */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c03_1px,transparent_1px),linear-gradient(to_bottom,#fb923c03_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Education"
          subtitle="Academic background"
          className="mb-8 sm:mb-10"
        />
        <div className="max-w-4xl mx-auto">
          <Timeline items={education} />
        </div>
      </div>
    </section>
  );
}

