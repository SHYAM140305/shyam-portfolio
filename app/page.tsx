"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Code, Brain, Sparkles, Briefcase } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { SkillCard } from "@/components/SkillCard";
import { CompactSkills } from "@/components/CompactSkills";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { ContactForm } from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";
import { TerminalBot } from "@/components/TerminalBot";
import { AnimatedName } from "@/components/AnimatedName";
import { AchievementsSection } from "@/components/AchievementCard";
import { skills, Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { hackathons } from "@/data/hackathons";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  // Define a specific order for skill categories
  const categoryOrder = [
    "Languages",
    "Frontend",
    "Backend",
    "ML/AI",
    "Data Processing",
    "Databases",
    "Cloud & DevOps",
    "Tools",
  ];

  const skillCategories = Array.from(
    new Set(skills.map((skill) => skill.category))
  ).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    // If category is not in order list, put it at the end
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const groupedSkills = skillCategories.reduce((acc, category) => {
    // Preserve the original order from the skills array
    acc[category] = skills.filter((skill) => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

        {/* Animated Background Elements - Orange Theme */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              opacity: [0.06, 0.12, 0.06],
              x: [0, 60, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.08, 0.06, 0.08],
              x: [0, -50, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/3 via-orange-500/3 to-amber-500/3 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Animated Name - Similar to itsvg.in */}
            <AnimatedName />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4 sm:mb-6"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3 sm:mb-4 leading-relaxed px-4 pb-1" style={{ lineHeight: '1.4' }}>
                AI Engineer | Digital Twin | Innovator
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
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="modern-button group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl modern-glass border-2 border-amber-500/10 hover:border-amber-500/18 text-foreground font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:shadow-amber-500/4 relative overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce text-amber-500 flex-shrink-0 relative z-10" />
                <span className="relative z-10">Download Resume</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/4 to-orange-500/4 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                onClick={() => scrollToSection("about")}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="text-sm font-medium">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="h-6 w-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c03_1px,transparent_1px),linear-gradient(to_bottom,#fb923c03_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle title="About Me" subtitle="Building intelligent systems that solve real-world problems" className="mb-6 sm:mb-8" />
          
          {/* Desktop-optimized Layout */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8 lg:space-y-10"
          >
              {/* Hero Introduction */}
              <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center">
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Passionate <span className="font-bold gradient-text">AI/ML Engineer</span> & <span className="font-bold gradient-text">Full Stack Developer</span> at SRMIST, 
                  building intelligent systems with NLP, RAG, and computer vision. 
                  Leading 400+ members as <span className="font-semibold text-foreground">President of NEXT GEN AI</span>.
                </p>
              </motion.div>

              {/* Main Grid: Better balanced for desktop */}
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Statistics - Sidebar (Left) */}
                <motion.div variants={fadeInUp} className="lg:col-span-3">
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-3">
                    {[
                      { label: "Projects", value: "10+", icon: Code, color: "from-amber-500 to-orange-500" },
                      { label: "Experience", value: "3+", icon: Brain, unit: "Yrs", color: "from-orange-500 to-amber-600" },
                      { label: "Members", value: "400+", icon: Sparkles, color: "from-amber-600 to-orange-600" },
                      { label: "Internships", value: "4", icon: Briefcase, color: "from-orange-600 to-amber-500" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group relative p-5 lg:p-4 rounded-xl modern-glass border border-border/40 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg text-center"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                        <div className={`w-12 h-12 lg:w-10 lg:h-10 mx-auto mb-3 lg:mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                          <stat.icon className="h-6 w-6 lg:h-5 lg:w-5 text-primary-foreground" />
                        </div>
                        <p className="text-2xl lg:text-xl font-extrabold gradient-text">
                          {stat.value}{stat.unit && <span className="text-base lg:text-sm text-muted-foreground"> {stat.unit}</span>}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Main Content Area (Right) */}
                <motion.div variants={fadeInUp} className="lg:col-span-9 space-y-6">
                  {/* Highlights Card - Larger on desktop */}
                  <div className="relative rounded-xl lg:rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-[2px] shadow-lg hover:shadow-xl transition-all dark:shadow-amber-500/20">
                    <div className="rounded-xl lg:rounded-2xl modern-glass-strong p-6 lg:p-8 border border-amber-500/20 dark:border-amber-500/8 relative overflow-hidden bg-card/90 dark:bg-card/80">
                      <div className="flex items-center gap-3 mb-4 lg:mb-6">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                          <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-amber-400">Key Highlights</h3>
                      </div>
                      <ul className="space-y-3 lg:space-y-4">
                        {[
                          "Leading 400+ members as President of NEXT GEN AI",
                          "Passionate about AI Research and Open Source",
                          "Mentoring students in AI literacy programs",
                          "Research paper on AI-driven fault analysis",
                        ].map((fact, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 lg:gap-4"
                          >
                            <div className="mt-2 w-2 h-2 rounded-full bg-primary dark:bg-amber-400 flex-shrink-0" />
                            <span className="text-foreground leading-relaxed text-base lg:text-lg">{fact}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact & Interests - Better spacing on desktop */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="p-5 lg:p-6 rounded-xl modern-glass border border-border/40 shadow-md">
                      <h3 className="text-base lg:text-lg font-bold gradient-text mb-4 flex items-center gap-2">
                        <span className="text-xl">📬</span> Contact
                      </h3>
                      <div className="space-y-3 text-sm lg:text-base">
                        {[
                          { label: "📍", value: "Chennai, India" },
                          { label: "🎓", value: "BTech AI" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className="text-xl">{item.label}</span>
                            <span className="text-foreground font-medium">{item.value}</span>
                          </div>
                        ))}
                        <a href="mailto:jshyam2005@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
                          <span className="text-xl">✉️</span>
                          <span className="font-medium group-hover:underline break-all">jshyam2005@gmail.com</span>
                        </a>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="p-5 lg:p-6 rounded-xl modern-glass border border-border/40 shadow-md">
                      <h3 className="text-base lg:text-lg font-bold gradient-text mb-4 flex items-center gap-2">
                        <span className="text-xl">🚀</span> Focus Areas
                      </h3>
                      <div className="flex flex-wrap gap-2.5 lg:gap-3">
                        {["AI Research", "Full Stack", "NLP", "Open Source", "Mentoring", "ML Systems"].map((interest, index) => (
                          <motion.span
                            key={interest}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg bg-muted/50 hover:bg-muted border border-border/40 hover:border-primary/30 transition-all text-sm lg:text-base font-medium text-foreground"
                          >
                            {interest}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title="Technical Skills"
            subtitle="Technologies and tools I work with"
            className="mb-8 sm:mb-10"
          />
          <CompactSkills groupedSkills={groupedSkills} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/2 to-orange-500/2 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/2 to-amber-500/2 rounded-full blur-3xl animate-pulse-slow" />
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

      {/* Terminal Bot Section */}
      <section id="terminal" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />
        
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

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title="Experience"
            subtitle="Professional journey"
            className="mb-8 sm:mb-10"
          />
          <div className="max-w-4xl mx-auto">
            <Timeline items={experiences} />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c03_1px,transparent_1px),linear-gradient(to_bottom,#fb923c03_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
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

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/0.5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            title="Get In Touch"
            subtitle="Let&apos;s connect and build something amazing together"
            className="mb-8 sm:mb-10 text-center"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ContactCard />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

