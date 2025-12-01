"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { staggerContainer } from "@/lib/utils";
import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Projects"
          subtitle="Some of my recent work"
          className="mb-8 sm:mb-10 md:mb-12"
        />

        {/* Featured Projects - Very Compact */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
            >
              <span className="golden-dot" aria-hidden="true" />
              <span className="gradient-text">Featured Projects</span>
            </motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  featured={true}
                  onHover={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  isHovered={hoveredProject === project.id}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Other Projects - Very Compact Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {featuredProjects.length > 0 && (
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2"
              >
                <span className="golden-dot" aria-hidden="true" />
                <span className="gradient-text">Other Projects</span>
              </motion.h3>
            )}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={featuredProjects.length + index}
                  featured={false}
                  onHover={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  isHovered={hoveredProject === project.id}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

