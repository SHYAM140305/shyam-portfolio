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
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-xl bg-card border border-border/60 dark:border-border/50 hover:border-border dark:hover:border-border hover:shadow-md cursor-pointer block h-full flex flex-col transition-all duration-200"
      >
        {/* Featured badge - Minimal */}
        {featured && (
          <motion.div
            className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-lg bg-muted/50 border border-border/60 dark:border-border/50 text-[10px] font-medium text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            Featured
          </motion.div>
        )}

        {/* Image Section - Adapts to GitHub image aspect ratio (1200x630 ≈ 1.91:1) */}
        <div className={`relative ${featured ? 'aspect-[19/10]' : 'aspect-[19/10]'} overflow-hidden rounded-t-xl bg-muted/30 dark:bg-muted/20`}>
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 dark:from-background/80 via-background/10 dark:via-background/20 to-transparent z-10" />
          
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
            unoptimized
          />
        </div>

        {/* Content Section - Very Compact */}
        <div className={`relative ${featured ? 'p-3 sm:p-4 md:p-5' : 'p-2.5 sm:p-3 md:p-4'} z-10 bg-background rounded-b-xl flex-1 flex flex-col`}>
          {/* Title and Description */}
          <div className="flex-1 min-w-0 mb-2">
            <motion.h3
              className={`${featured ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'} font-semibold text-foreground mb-1 break-words group-hover:text-foreground transition-colors`}
              whileHover={{ x: 2 }}
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
            {/* Technology Tags - Very Compact */}
            <div className="flex flex-wrap gap-1 flex-1">
              {project.technologies.slice(0, featured ? 3 : 2).map((tech, i) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/50 dark:border-border/30 text-[9px] sm:text-[10px] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (featured ? 3 : 2) && (
                <span className="px-1.5 py-0.5 rounded bg-muted/30 border border-border/30 text-[9px] sm:text-[10px] font-medium text-muted-foreground">
                  +{project.technologies.length - (featured ? 3 : 2)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 flex-shrink-0">
              {project.githubUrl && (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted/30 border border-border/50 dark:border-border/30 hover:border-border dark:hover:border-border transition-all flex items-center justify-center touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]"
                  aria-label="View on GitHub"
                >
                  <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground" />
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted/30 border border-border/50 dark:border-border/30 hover:border-border dark:hover:border-border transition-all flex items-center justify-center touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]"
                  aria-label="View live site"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
});

