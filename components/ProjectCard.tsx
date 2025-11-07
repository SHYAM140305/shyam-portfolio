"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { memo } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
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

export const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  // Determine the main link URL (prioritize GitHub, then live URL)
  const mainUrl = project.githubUrl || project.liveUrl;
  const imageSrc = getRemoteProjectImage(project);

  return (
    <motion.a
      href={mainUrl}
      target={mainUrl ? "_blank" : undefined}
      rel={mainUrl ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl modern-glass-strong border border-amber-500/4 hover:border-amber-500/10 card-shadow card-shadow-hover cursor-pointer block"
    >
      {/* Modern gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-500/2 group-hover:via-orange-500/2 group-hover:to-amber-600/2 transition-all duration-500 z-0" />
      
      {/* Modern corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/4 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/4 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl md:rounded-t-3xl border-b-2 border-amber-500/15 dark:border-amber-500/5">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading={index < 3 ? "eager" : "lazy"}
          fetchPriority={index < 3 ? "high" : "low"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      <div className="relative p-5 sm:p-6 md:p-8 z-10 bg-card dark:bg-card/80 rounded-b-2xl md:rounded-b-3xl border-t border-t-amber-500/5 dark:border-t-transparent">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors mb-1 sm:mb-2 break-words">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 self-start sm:self-auto">
            {project.githubUrl && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                }}
                whileHover={{ scale: 1.15, rotate: 5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/15 hover:border-amber-500/25 transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-amber-500/8 touch-manipulation relative z-20"
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
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
                whileHover={{ scale: 1.15, rotate: -5, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-600/15 hover:from-orange-500/25 hover:to-amber-600/25 border border-amber-500/15 hover:border-amber-500/25 transition-all flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-orange-500/8 touch-manipulation relative z-20"
                aria-label="View live site"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.08, y: -2 }}
              className="modern-badge px-3 py-1.5 text-xs font-medium rounded-lg"
            >
              <span className="relative z-10">{tech}</span>
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="modern-badge px-3 py-1.5 text-xs font-medium rounded-lg text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
});

