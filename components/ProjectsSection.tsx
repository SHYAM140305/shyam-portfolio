"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { staggerContainer } from "@/lib/utils";
import { useState } from "react";

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Clean section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3 text-center px-2">
              Projects
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm xs:text-base sm:text-base text-muted-foreground text-center font-light max-w-2xl mx-auto px-2"
          >
            Some of my recent work
          </motion.p>
        </motion.div>

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
              <span className="w-1 h-4 bg-foreground rounded-full" />
              Featured Projects
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
                <span className="w-1 h-4 bg-foreground rounded-full" />
                Other Projects
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

