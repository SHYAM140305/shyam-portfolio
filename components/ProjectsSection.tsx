"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/data/projects";
import { staggerContainer } from "@/lib/utils";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration - Reduced animations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/2 to-orange-500/2 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/2 to-amber-500/2 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c03_1px,transparent_1px),linear-gradient(to_bottom,#fb923c03_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Projects"
          subtitle="Some of my recent work"
          className="mb-8 sm:mb-10"
        />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

