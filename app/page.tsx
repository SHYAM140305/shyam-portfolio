"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, Code, Brain, Sparkles, Briefcase, Github, Linkedin, Mail, X } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillCard } from "@/components/SkillCard";
import { CompactSkills } from "@/components/CompactSkills";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AnimatedName } from "@/components/AnimatedName";
import { skills, type Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import dynamic from "next/dynamic";

import { useMemo, useState, useCallback } from "react";

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

// Lazy load heavy components
const TerminalBot = dynamic(() => import("@/components/TerminalBot").then(mod => ({ default: mod.TerminalBot })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>,
  ssr: false
});

const AchievementsSection = dynamic(() => import("@/components/AchievementCard").then(mod => ({ default: mod.AchievementsSection })), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>,
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
    "VERSION=3.0",
    "N:Jayakanthan;Shyam;;;",
    "FN:Shyam Jayakanthan",
    "ORG:SRMIST",
    "TITLE:AI/ML Engineer;Full Stack Developer",
    "EMAIL;TYPE=INTERNET;TYPE=WORK:jshyam2005@gmail.com",
    "TEL;TYPE=CELL:+91 7395980045",
    "URL:https://shyamj.vercel.app",
    "ADR;TYPE=WORK:;;Chennai;Tamil Nadu;;India",
    "PHOTO;VALUE=URI:https://github.com/SHYAM140305.png",
    "END:VCARD",
  ].join("\r\n");
  const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData)}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* Theme-aware Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background dark:from-zinc-950 dark:via-neutral-950 dark:to-orange-950/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c08_1px,transparent_1px),linear-gradient(to_bottom,#fb923c08_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
        
        {/* Additional depth layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.01)_0%,transparent_50%)]" />

        {/* Animated Background Elements - Orange Theme - Optimized with reduced motion support */}
        {/* Client-only to prevent hydration mismatch */}
        <AnimatedBackground />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Professional Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <AnimatedName name="Shyam J" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4 sm:mb-6"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 sm:mb-4 leading-relaxed px-4 pb-1" style={{ lineHeight: '1.4' }}>
                AI Engineer
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 mx-auto max-w-xs rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg px-4"
            >
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full modern-glass border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-medium whitespace-nowrap">Building intelligent systems</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full modern-glass border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-medium whitespace-nowrap">Exploring AI frontiers</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full modern-glass border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground font-medium whitespace-nowrap">Innovating solutions</span>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Results-driven <span className="font-semibold text-foreground">AI/ML Engineer</span> with expertise in developing
              end-to-end machine learning systems, generative AI applications,
              and full-stack solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 w-full sm:w-auto"
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="modern-button group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-primary-foreground font-bold text-base sm:text-lg shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/15 transition-all duration-300 overflow-hidden border border-amber-400/15 hover:border-amber-400/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary-foreground/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              <motion.button
                onClick={() => setShowResume(true)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="modern-button group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-primary-foreground font-bold text-base sm:text-lg shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/15 transition-all duration-300 overflow-hidden border border-amber-400/15 hover:border-amber-400/25"
                type="button"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Resume</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary-foreground/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
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
              className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70]"
            >
              <div className="absolute inset-4 sm:inset-10 lg:inset-16 pointer-events-none">
                <div className="h-full w-full pointer-events-auto">
                  <div className="resume-viewer-shell h-full">
                    <div className="resume-viewer-card h-full">
                    <div className="resume-viewer-header">
                      <div className="flex items-center gap-3">
                        <div className="resume-viewer-icon">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="resume-viewer-title">Resume</h2>
                          <p className="resume-viewer-subtitle">Shyam Jayakanthan</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.a
                          href="/resume.pdf"
                          download
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="resume-viewer-download"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </motion.a>
                        <motion.button
                          type="button"
                          onClick={() => setShowResume(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="resume-viewer-close"
                          aria-label="Close resume viewer"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                      <div className="resume-viewer-content">
                        <object
                          data="/resume.pdf#toolbar=0&navpanes=0&view=FitH"
                          type="application/pdf"
                          className="resume-viewer-iframe"
                          aria-label="Embedded resume viewer"
                        >
                          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                            <p className="text-sm text-muted-foreground">
                              Unable to display the PDF inline. Please download the resume instead.
                            </p>
                            <a
                              href="/resume.pdf"
                              className="resume-viewer-download"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download Resume</span>
                            </a>
                          </div>
                        </object>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section
        id="about"
        className="py-10 sm:py-16 md:py-20 bg-background bg-gradient-to-br from-white/95 via-orange-50/60 to-white/95 dark:from-background dark:via-neutral-950/80 dark:to-orange-950/10 relative overflow-hidden"
      >
        {/* Background decoration - Reduced animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[12%] -right-[8%] w-80 h-80 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -bottom-[16%] -left-[10%] w-[22rem] h-[22rem] rounded-full bg-amber-200/45 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c14_1px,transparent_1px),linear-gradient(to_bottom,#fb923c14_1px,transparent_1px)] bg-[size:32px_32px] opacity-50 dark:opacity-100" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle title="About Me" subtitle="Building intelligent systems that solve real-world problems" className="mb-6 sm:mb-8" />
          
          {/* Modern two-column layout */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8"
          >
            {/* Profile Card */}
            <motion.aside variants={fadeInUp} className="lg:col-span-4">
              <div className="about-sidebar-shell">
                <div className="about-sidebar-card">
                  <div className="about-avatar-row">
                    <div className="about-avatar">
                      <Image
                        src="https://github.com/SHYAM140305.png"
                        alt="Shyam J - GitHub avatar"
                        width={72}
                        height={72}
                        className="w-full h-full object-cover"
                        priority
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>
                    <div>
                      <h3 className="about-name">Shyam J</h3>
                      <p className="about-role">AI/ML Engineer · Full Stack</p>
                      <div className="about-meta-chip">President, NEXT GEN AI @ SRMIST</div>
                    </div>
                  </div>

                  <p className="about-description">
                    Passionate about building intelligent systems with NLP, RAG, and computer vision to translate cutting-edge research into production-ready experiences.
                  </p>

                  <div className="about-social-row">
                    <a href="https://github.com/SHYAM140305" target="_blank" rel="noreferrer" className="about-social-button">
                      <span className="about-social-icon">
                        <Github className="w-4 h-4" />
                      </span>
                      <span className="about-social-text">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/shyam-jayakanthan-050a85284" target="_blank" rel="noreferrer" className="about-social-button">
                      <span className="about-social-icon">
                        <Linkedin className="w-4 h-4" />
                      </span>
                      <span className="about-social-text">LinkedIn</span>
                    </a>
                    <a href="mailto:jshyam2005@gmail.com" className="about-social-button">
                      <span className="about-social-icon">
                        <Mail className="w-4 h-4" />
                      </span>
                      <span className="about-social-text">Email</span>
                    </a>
                    <a href={vcardHref} download="Shyam_Jayakanthan.vcf" className="about-social-button">
                      <span className="about-social-icon">
                        <Download className="w-4 h-4" />
                      </span>
                      <span className="about-social-text">vCard</span>
                    </a>
                  </div>

                  <div className="about-stats-grid">
                    {[
                      {
                        label: "Projects",
                        value: "10+",
                        icon: (
                          <span className="about-stat-icon-badge">
                            <Code className="w-4 h-4 select-none" aria-hidden="true" />
                            <span className="sr-only">Projects</span>
                          </span>
                        ),
                      },
                      {
                        label: "Experience",
                        value: "3+",
                        icon: (
                          <span className="about-stat-icon-badge">
                            <Briefcase className="w-4 h-4 select-none" aria-hidden="true" />
                            <span className="sr-only">Experience</span>
                          </span>
                        ),
                      },
                      {
                        label: "Internships",
                        value: "6",
                        icon: (
                          <span className="about-stat-icon-badge">
                            <Brain className="w-4 h-4 select-none" aria-hidden="true" />
                            <span className="sr-only">Internships</span>
                          </span>
                        ),
                      },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="about-stat-card"
                      >
                        <div className="about-stat-icon">{s.icon}</div>
                        <div>
                          <div className="about-stat-value">{s.value}</div>
                          <div className="about-stat-label">{s.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Content */}
            <motion.div variants={fadeInUp} className="lg:col-span-8 space-y-6">
              <div className="max-w-none">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Passionate <span className="font-bold gradient-text">AI/ML Engineer</span> & <span className="font-bold gradient-text">Full Stack Developer</span> focused on building real-world AI products. I work across the stack—from data pipelines and model serving to delightful web experiences.
                </p>
              </div>

              <div className="about-card-shell">
                <div className="about-card about-card--accent">
                  <div className="about-card-heading">
                    <div className="about-card-icon about-card-icon--solid">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="about-card-title">Key Highlights</h3>
                      <p className="about-card-subtitle">Where I invest most of my energy and curiosity.</p>
                    </div>
                  </div>

                  <ul className="about-highlight-list">
                    {[
                      "Leading 400+ members as President of NEXT GEN AI",
                      "AI research and open-source contributor",
                      "Mentoring students in AI literacy programs",
                      "Research on AI-driven fault analysis",
                    ].map((fact, index) => (
                      <motion.li
                        key={fact}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="about-highlight-item group"
                      >
                        <div className="about-highlight-dot" />
                        <span className="about-highlight-text">{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent p-[1px] shadow-lg">
                  <div className="about-card">
                    <div className="about-card-header">
                      <div className="about-card-heading">
                        <div className="about-card-icon">📬</div>
                        <div>
                          <h3 className="about-card-title">Contact</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: "📍", label: "Location", value: "Chennai, India" },
                        { icon: "🎓", label: "Program", value: "B.Tech Artificial Intelligence" },
                      ].map((item) => (
                        <div key={item.label} className="about-row">
                          <span className="about-row-icon">{item.icon}</span>
                          <div>
                            <p className="about-row-label">{item.label}</p>
                            <p className="about-row-value">{item.value}</p>
                          </div>
                        </div>
                      ))}
                      <a
                        href="mailto:jshyam2005@gmail.com"
                        className="about-row about-row-link group"
                      >
                        <span className="about-row-icon">✉️</span>
                        <div>
                          <p className="about-row-label group-hover:text-primary">Email</p>
                          <p className="about-row-value group-hover:text-primary">jshyam2005@gmail.com</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent p-[1px] shadow-lg">
                  <div className="about-card">
                    <div className="about-card-header">
                      <div className="about-card-heading">
                        <div className="about-card-icon">🚀</div>
                        <div>
                          <h3 className="about-card-title">Research Interests</h3>
                          <p className="about-card-subtitle">Themes I’m exploring right now.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {["Agentic AI", "Digital Twin", "AI Research", "Full Stack", "NLP", "Open Source", "Data Analysis", "ML Systems"].map((interest, index) => (
                        <motion.span
                          key={interest}
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 }}
                          whileHover={{ y: -2 }}
                          className="interest-chip"
                        >
                          {interest}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c08_1px,transparent_1px),linear-gradient(to_bottom,#fb923c08_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
        
        {/* Animated gradient orbs - Optimized with will-change */}
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/8 via-orange-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-gradient-to-br from-orange-500/8 via-amber-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional depth layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.03)_0%,transparent_70%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Technical Skills"
              subtitle="Technologies and tools I work with"
              className="mb-10 sm:mb-12 lg:mb-16"
            />
          </motion.div>
          <CompactSkills groupedSkills={groupedSkills} />
        </div>
      </section>

      {/* Projects Section - Lazy loaded */}
      <ProjectsSection />

      {/* Terminal Bot Section */}
      <section id="terminal" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration - Reduced animations */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title="Ask Me Anything"
            subtitle="Interactive terminal - Try asking about AI, ML, Digital Twins, or anything!"
            className="mb-8 sm:mb-10"
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

