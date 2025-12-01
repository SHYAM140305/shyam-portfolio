"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Code, Brain, Sparkles, Briefcase, Github, Linkedin, Mail, X, Maximize2, Share2, ExternalLink, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroRoleTicker } from "@/components/HeroRoleTicker";
import { skills, type Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import dynamic from "next/dynamic";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

// Force recompilation

// Define a specific order for skill categories (stable across renders)
const CATEGORY_ORDER = [
  "Languages",
  "Frontend",
  "Backend",
  "ML/AI",
  "Data Processing",
  "Databases",
  "Cloud & DevOps",
  "Tools",
];

const HERO_ROLES = ["AI Engineer", "Data Scientist"];

// Lazy load heavy components
const TerminalBot = dynamic(() => import("@/components/TerminalBot").then(mod => ({ default: mod.TerminalBot })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>,
  ssr: false
});

const AchievementsSection = dynamic(() => import("@/components/AchievementCard").then(mod => ({ default: mod.AchievementsSection })), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>,
  ssr: false
});

// Lazy load CompactSkills to improve scroll performance
const CompactSkillsLazy = dynamic(() => import("@/components/CompactSkills").then(mod => ({ default: mod.CompactSkills })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><p className="text-muted-foreground">Loading skills...</p></div>,
  ssr: false
});

const PDFViewerLazy = dynamic(() => import("@/components/PDFViewer").then(mod => ({ default: mod.PDFViewer })), {
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
      Loading resume...
    </div>
  ),
  ssr: false
});

// Lazy load sections below the fold for better initial load performance
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: true
});

const ExperienceSection = dynamic(() => import("@/components/ExperienceSection").then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: true
});

const EducationSection = dynamic(() => import("@/components/EducationSection").then(mod => ({ default: mod.EducationSection })), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: true
});

const ContactSection = dynamic(() => import("@/components/ContactSection").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: true
});

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  const [resumeToast, setResumeToast] = useState<string | null>(null);
  const [resumeZoom, setResumeZoom] = useState(1);
  const [resumePage, setResumePage] = useState(1);
  const [resumeNumPages, setResumeNumPages] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  
  // Prevent background/page scroll when resume modal is open (especially on mobile)
  useEffect(() => {
    if (!showResume) return;

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [showResume]);
  
  // Memoize expensive computations - Optimized with single pass
  const groupedSkills = useMemo(() => {
    // Single pass: group skills by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);

    // Sort categories according to CATEGORY_ORDER
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    // Build result object in correct order
    const result: Record<string, Skill[]> = {};
    for (const category of sortedCategories) {
      result[category] = grouped[category];
    }
    return result;
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // vCard download link for About profile card
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:J;Shyam;;;",
    "FN:Shyam J",
    "ORG:AI/ML Engineer",
    "TITLE:AI/ML Engineer & Research-driven developer",
    "EMAIL;TYPE=INTERNET;TYPE=WORK:jshyam2005@gmail.com",
    "TEL;TYPE=CELL:+91 7395980045",
    "URL:https://shyamj.vercel.app",
    "ADR;TYPE=WORK:;;Chennai;Tamil Nadu;;India",
    "PHOTO;VALUE=URI:https://github.com/SHYAM140305.png",
    "END:VCARD",
  ].join("\r\n");
  const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData)}`;

  const resumeUrl = "/resume.pdf";
  const resumeRequestFullscreen = async () => {
    try {
      const container = document.getElementById("resume-viewer-container");
      if (container && container.requestFullscreen) {
        await container.requestFullscreen();
      } else {
        setResumeToast("Fullscreen not supported");
        setTimeout(() => setResumeToast(null), 1500);
      }
    } catch {
      setResumeToast("Failed to enter fullscreen");
      setTimeout(() => setResumeToast(null), 1500);
    }
  };

  const shareResume = async () => {
    const absoluteUrl = typeof window !== "undefined" ? new URL(resumeUrl, window.location.origin).toString() : resumeUrl;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Resume – Shyam Jayakanthan",
          text: "My latest resume",
          url: absoluteUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(absoluteUrl);
        setResumeToast("Link copied");
        setTimeout(() => setResumeToast(null), 1500);
      }
    } catch {
      // user cancelled
    }
  };

  const zoomInResume = () => {
    setResumeZoom(prev => Math.min(prev + 0.25, 2));
  };

  const zoomOutResume = () => {
    setResumeZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoomResume = () => {
    setResumeZoom(1);
  };

  const goToResumePage = (page: number) => {
    if (page >= 1 && page <= resumeNumPages) {
      setResumePage(page);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced & Modern */}
      <section
        id="home"
        className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-16"
      >
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Enhanced Name with letter animation and gradient effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-3 sm:mb-6 md:mb-10"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-foreground mb-3 sm:mb-6 relative px-2">
                <span className="inline-block relative">
                  {"Shyam J".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block relative"
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.06,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.15,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Enhanced tagline with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-3 sm:mb-6 md:mb-10"
            >
              <HeroRoleTicker roles={HERO_ROLES} />
            </motion.div>

            {/* Enhanced description with word highlights – shorter on very small screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-5 sm:mb-8 md:mb-10 lg:mb-14 px-2"
            >
              {/* Mobile: very compact summary */}
              <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed font-light sm:hidden">
                Results‑driven AI/ML engineer building real‑world products and clean, reliable systems.
              </p>
              {/* Tablet / Desktop: full description */}
              <p className="hidden sm:block text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Results-driven{" "}
                <motion.span
                  className="gold-accent-word"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10">AI/ML Engineer</span>
                  <motion.span
                    className="gold-underline"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>{" "}
                with expertise in developing end-to-end machine learning systems,{" "}
                <motion.span
                  className="gold-accent-word"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10">generative AI</span>
                  <motion.span
                    className="gold-underline"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>{" "}
                applications, and full-stack solutions.
              </p>
            </motion.div>

            {/* Enhanced CTA buttons with professional styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 md:gap-6 px-2"
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto px-10 sm:px-12 py-3.5 sm:py-4 rounded-professional-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden min-h-[48px] sm:min-h-[52px] md:min-h-[56px] shadow-lg hover:shadow-2xl transition-all duration-300 touch-manipulation btn-professional btn-gold"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                />
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  View Projects
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.button>
              
              <motion.button
                onClick={() => {
                  setShowResume(true);
                  setResumeZoom(1);
                  setResumePage(1);
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto px-10 sm:px-12 py-3.5 sm:py-4 rounded-professional-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden min-h-[48px] sm:min-h-[52px] md:min-h-[56px] transition-all duration-300 touch-manipulation btn-professional btn-gold-outline"
                type="button"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  Resume
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/50 to-primary/40"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-background font-medium gap-2"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  Resume
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Professional stats badges – hide on small screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hidden sm:flex mt-10 sm:mt-14 md:mt-20 flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-6 px-2"
            >
              {[
                { icon: Code, text: "10+ Projects" },
                { icon: Briefcase, text: "3+ Years Experience" },
                { icon: Brain, text: "AI/ML Specialist" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.text}
                    className="flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-professional-xl golden-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                  >
                    <span className="golden-badge-icon">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">{stat.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showResume && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResume(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-full max-h-full flex flex-col bg-background xs:rounded-xl sm:rounded-2xl shadow-2xl border border-border/60 dark:border-border/50 overflow-hidden">
                {/* Header */}
                <div className="resume-viewer-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-3 md:p-4 border-b border-border/50 dark:border-border/30 flex-shrink-0">
                  <div className="flex items-center gap-2 min-w-0 flex-shrink">
                    <div className="resume-viewer-icon flex-shrink-0 grid h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 place-items-center rounded-lg">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="resume-viewer-title text-sm sm:text-base md:text-lg truncate">Resume</h2>
                      <p className="resume-viewer-subtitle truncate">Shyam Jayakanthan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0 flex-wrap sm:flex-nowrap">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-0.5 rounded-md border border-border/50 dark:border-border/40 bg-muted/50 p-0.5">
                      <motion.button
                        type="button"
                        onClick={zoomOutResume}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex h-7 w-7 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="h-3.5 w-3.5" />
                      </motion.button>
                      <span className="text-xs font-medium text-foreground min-w-[2.25rem] text-center px-0.5">
                        {Math.round(resumeZoom * 100)}%
                      </span>
                      <motion.button
                        type="button"
                        onClick={zoomInResume}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex h-7 w-7 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="h-3.5 w-3.5" />
                      </motion.button>
                      {resumeZoom !== 1 && (
                        <motion.button
                          type="button"
                          onClick={resetZoomResume}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation ml-0.5"
                          aria-label="Reset zoom"
                        >
                          <RotateCw className="h-3 w-3" />
                        </motion.button>
                      )}
                    </div>
                    {/* Page Navigation */}
                    {resumeNumPages > 1 && (
                      <div className="flex items-center gap-0.5 rounded-md border border-border/40 bg-muted/50 px-1 py-1">
                        <motion.button
                          type="button"
                          onClick={() => goToResumePage(resumePage - 1)}
                          disabled={resumePage <= 1}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </motion.button>
                        <span className="text-xs font-medium text-foreground min-w-[2.25rem] text-center">
                          {resumePage}/{resumeNumPages}
                        </span>
                        <motion.button
                          type="button"
                          onClick={() => goToResumePage(resumePage + 1)}
                          disabled={resumePage >= resumeNumPages}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </motion.button>
                      </div>
                    )}
                    {/* Action Buttons - All visible on all devices */}
                    <motion.button
                      type="button"
                      onClick={resumeRequestFullscreen}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 dark:border-border/40 bg-muted/50 text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm touch-manipulation"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={shareResume}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="resume-viewer-action-button touch-manipulation"
                      aria-label="Share"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </motion.button>
                    <motion.a
                      href="/resume.pdf"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="resume-viewer-action-button touch-manipulation"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </motion.a>
                    <motion.a
                      href="/resume.pdf"
                      download
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="resume-viewer-action-button touch-manipulation"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </motion.a>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setShowResume(false);
                        setResumeZoom(1);
                        setResumePage(1);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 dark:border-border/40 bg-muted/50 text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm touch-manipulation"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  </div>
                </div>
                
                {/* PDF Viewer */}
                <div id="resume-viewer-container" className="relative flex-1 min-h-0 bg-muted/20 overflow-hidden">
                  <PDFViewerLazy
                    file="/resume.pdf"
                    className="w-full h-full"
                    scale={resumeZoom !== 1 ? resumeZoom : undefined}
                    currentPage={resumePage}
                    restrictScroll
                    onLoadSuccess={(numPages) => {
                      setResumeNumPages(numPages);
                      setResumePage(1);
                    }}
                    onPageChange={(page) => setResumePage(page)}
                  />
                  {resumeToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg z-10"
                    >
                      {resumeToast}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Section - Professional & Compact */}
      <section
        id="about"
        className="py-8 sm:py-12 md:py-14 lg:py-16 xl:py-18"
      >
        <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
          <SectionTitle
            title="About Me"
            subtitle="Building intelligent systems that solve real-world problems"
            className="mb-6 sm:mb-8 md:mb-10"
          />
          {/* Single Modern Card - All About Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              className="relative rounded-professional-xl sm:rounded-professional-xl md:rounded-professional-xl bg-muted/20 backdrop-blur-xl border border-border/60 dark:border-border/50 p-3 sm:p-6 md:p-7 lg:p-8 xl:p-9 overflow-hidden group card-professional card-shadow gold-card"
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-foreground/10 dark:from-foreground/5 via-transparent to-foreground/10 dark:to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/8 dark:bg-foreground/3 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/8 dark:bg-foreground/3 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Header Section - Profile & Basic Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 md:gap-6 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-border/60 dark:border-border/50"
                >
                  {/* Profile Image */}
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-foreground/15 dark:bg-foreground/10 blur-2xl animate-pulse" />
                    <div className="relative p-1 rounded-full bg-gradient-to-br from-foreground/30 dark:from-foreground/20 to-transparent">
                      <Image
                        src="https://github.com/SHYAM140305.png"
                        alt="Shyam J"
                        width={120}
                        height={120}
                        className="rounded-full object-cover relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                        priority
                        loading="eager"
                        fetchPriority="high"
                        quality={85}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Name & Role */}
                  <div className="flex-1 text-center sm:text-left">
                    <motion.h3
                      className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2 text-gradient-professional"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      Shyam J
                    </motion.h3>
                    <motion.p
                      className="text-base sm:text-lg text-primary mb-3 sm:mb-4 font-semibold"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      AI/ML Engineer · Research-driven developer
                    </motion.p>
                    
                    {/* Social Links */}
                    <motion.div
                      className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {[
                        { name: "GitHub", url: "https://github.com/SHYAM140305", icon: Github },
                        { name: "LinkedIn", url: "https://www.linkedin.com/in/shyam-jayakanthan-050a85284", icon: Linkedin },
                        { name: "Email", url: "mailto:jshyam2005@gmail.com", icon: Mail },
                      ].map((link, i) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target={link.url.startsWith("mailto") ? undefined : "_blank"}
                            rel={link.url.startsWith("mailto") ? undefined : "noreferrer"}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-background/60 border border-amber-500/40 dark:border-amber-400/50 hover:border-amber-500/60 transition-all relative overflow-hidden group/link touch-manipulation min-h-[44px]"
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-amber-500/10 scale-0 group-hover/link:scale-100 transition-transform duration-300"
                            />
                            <Icon className="w-4 h-4 relative z-10 text-primary" />
                            <span className="text-xs sm:text-sm font-medium relative z-10 text-primary">
                              {link.name}
                            </span>
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats Grid – only from md+ to keep mobile compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hidden md:grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5"
                >
                  {[
                    { label: "Projects", value: "10+", icon: Code },
                    { label: "Experience", value: "3+", icon: Briefcase },
                    { label: "Internships", value: "5+", icon: Brain },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="text-center p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-background/50 border border-border/60 dark:border-border/50 relative overflow-hidden group/stat"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-foreground/10 dark:from-foreground/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"
                        />
                        <div className="relative z-10">
                          <motion.div
                            className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="font-medium">{stat.label}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Description – shorter text size on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-4 sm:mb-5"
                >
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-light text-center sm:text-left">
                    Passionate <span className="font-medium text-primary">AI/ML Engineer</span> &{" "}
                    <span className="font-medium text-primary">Research-driven developer</span> focused on building
                    real-world AI products. I work across the stack—from data pipelines and model serving to delightful
                    web experiences.
                  </p>
                </motion.div>

                {/* Key Highlights – hide heavy list on very small screens */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="hidden sm:block mb-4 sm:mb-5"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-gradient-professional">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Key Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      "Leading 400+ members as President of NEXT GEN AI",
                      "AI research and open-source contributor",
                      "Mentoring students in AI literacy programs",
                      "Research on AI-driven fault analysis",
                    ].map((fact, i) => (
                      <motion.div
                        key={fact}
                        className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-background/30 border border-border/50 dark:border-border/30 hover:border-foreground/30 dark:hover:border-foreground/20 transition-colors group/highlight"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                        whileHover={{ x: 4 }}
                      >
                        <motion.span
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">{fact}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Research Interests – show only on md+ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="hidden md:block"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-gradient-professional">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Agentic AI", "Digital Twin", "AI Research", "Research-driven Development", "NLP", "Open Source", "Data Analysis", "ML Systems"].map((interest, i) => (
                      <motion.span
                        key={interest}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/8 border border-amber-500/40 text-xs sm:text-sm font-medium text-primary relative overflow-hidden group/interest"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-foreground/10 scale-x-0 group-hover/interest:scale-x-100 origin-left transition-transform duration-300"
                        />
                        <span className="relative z-10">{interest}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Professional & Modern */}
      <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Background decorative elements - Reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-foreground/8 dark:bg-foreground/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-foreground/8 dark:bg-foreground/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
          <SectionTitle
            title="Technical Skills"
            subtitle="Technologies and tools I work with"
            className="mb-8 sm:mb-10 md:mb-12"
          />
          <CompactSkillsLazy groupedSkills={groupedSkills} />
        </div>
      </section>

      {/* Projects Section - Lazy loaded */}
      <ProjectsSection />

      {/* Terminal Bot Section - Modern gold style */}
      <section
        id="terminal"
        className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden"
      >
        <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
          <SectionTitle
            title="Ask Me Anything"
            subtitle="Interactive terminal – ask about AI, ML, Digital Twins, projects, or anything you’d like to know."
            className="mb-8 sm:mb-12 md:mb-16"
          />
          <TerminalBot />
        </div>
      </section>

      {/* Achievements Section (Certifications, Hackathons, Leadership) */}
      <AchievementsSection />

      {/* Experience Section - Lazy loaded */}
      <ExperienceSection />

      {/* Education Section - Lazy loaded */}
      <EducationSection />

      {/* Contact Section - Lazy loaded */}
      <ContactSection />
    </div>
  );
}

