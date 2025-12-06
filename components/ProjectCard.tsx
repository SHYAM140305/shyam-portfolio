"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { memo } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
  onHover?: () => void;
  onHoverEnd?: () => void;
  isHovered?: boolean;
}

const DEFAULT_IMAGE = "https://github.com/SHYAM140305.png";

function buildGitHubOgImageUrl(owner: string, repo: string) {
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

function getRemoteProjectImage(project: Project) {
  const { image, githubUrl } = project;

  if (image) {
    if (image.includes("opengraph.githubassets.com")) {
      return image;
    }
    return image;
  }

  if (githubUrl) {
    try {
      const { pathname } = new URL(githubUrl);
      const parts = pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const owner = parts[0];
        const repo = parts[1].replace(/\.git$/i, "");
        return buildGitHubOgImageUrl(owner, repo);
      }
    } catch (_error) {
      // ignored
    }
  }

  return DEFAULT_IMAGE;
}

export const ProjectCard = memo(function ProjectCard({ 
  project, 
  index, 
  featured = false,
  onHover,
  onHoverEnd,
  isHovered = false
}: ProjectCardProps) {
  const mainUrl = project.githubUrl || project.liveUrl;
  const imageSrc = getRemoteProjectImage(project);

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.08, duration: 0.6, type: "spring", stiffness: 100 }}
      className="group relative h-full"
    >
      <motion.a
        href={mainUrl}
        target={mainUrl ? "_blank" : undefined}
        rel={mainUrl ? "noopener noreferrer" : undefined}
        data-project-id={project.id}
        whileHover={{ y: -6, scale: 1.01 }}
        className="relative overflow-hidden rounded-professional-lg bg-card gold-card border border-border/60 dark:border-border/50 hover:border-border/80 dark:hover:border-border/80 cursor-pointer block h-full flex flex-col transition-all duration-300 card-professional card-shadow-hover"
      >
        {/* Image Section - Enhanced with professional styling */}
        <div className={`relative ${featured ? 'aspect-[19/10]' : 'aspect-[19/10]'} overflow-hidden rounded-t-professional-lg bg-muted/30 dark:bg-muted/20`}>
          {/* Enhanced image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 dark:from-background/85 via-background/15 dark:via-background/25 to-transparent z-10" />
          {/* Subtle shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: 'translateX(-100%)' }}
            whileHover={{ transform: 'translateX(100%)' }}
            transition={{ duration: 0.6 }}
          />
          
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out gpu-accelerated brightness-[0.95] dark:brightness-100 contrast-[1.05] dark:contrast-100"
            loading={index < 3 ? "eager" : "lazy"}
            fetchPriority={index < 3 ? "high" : "low"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            quality={85}
          />
        </div>

        {/* Content Section - Professional spacing */}
        <div className={`relative ${featured ? 'p-4 sm:p-5 md:p-6' : 'p-3 sm:p-4 md:p-5'} z-10 bg-background rounded-b-professional-lg flex-1 flex flex-col`}>
          {/* Title and Description */}
          <div className="flex-1 min-w-0 mb-2">
            <motion.h3
              className={`${featured ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'} font-semibold mb-1 break-words group-hover:text-foreground transition-colors gradient-text`}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.title}
            </motion.h3>
            <p className={`${featured ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px] md:text-xs'} text-muted-foreground line-clamp-2 leading-snug`}>
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {/* Technology Tags - Professional styling */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {project.technologies.slice(0, featured ? 3 : 2).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-2 py-1 rounded-professional text-[9px] sm:text-[10px] font-medium transition-all gold-chip"
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > (featured ? 3 : 2) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-2 py-1 rounded-professional text-[9px] sm:text-[10px] font-medium transition-all gold-chip"
                >
                  +{project.technologies.length - (featured ? 3 : 2)}
                </motion.span>
              )}
            </div>

            {/* Action Buttons - Professional styling */}
            <div className="flex gap-2 flex-shrink-0">
              {project.githubUrl && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-professional transition-all flex items-center justify-center touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] focus-professional gold-icon-button"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                </motion.button>
              )}
              {project.liveUrl && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-professional transition-all flex items-center justify-center touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] focus-professional gold-icon-button"
                  aria-label="View live site"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
});

