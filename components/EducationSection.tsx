"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { education } from "@/data/education";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

export function EducationSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Clean section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3 text-center px-2">
              Education
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm xs:text-base sm:text-lg text-muted-foreground text-center font-light max-w-2xl mx-auto px-2"
          >
            Academic background
          </motion.p>
        </motion.div>
        
        {/* Modern Education Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={fadeInUp}
              className="group"
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative bg-card rounded-xl p-6 sm:p-7 md:p-8 border border-border/60 dark:border-border/50 hover:border-border dark:hover:border-border transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Left Section - Logo/Icon & Dates */}
                  <div className="flex-shrink-0">
                    <div className="flex items-start gap-4 sm:flex-col sm:items-start">
                      {/* Logo or Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted/50 border border-border/60 dark:border-border/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {(() => {
                          if (!isMounted) {
                            const displayLogo = edu.logoLight ?? edu.logo ?? edu.logoDark;
                            return displayLogo ? (
                              <Image
                                src={displayLogo}
                                alt={`${edu.institution} logo`}
                                width={56}
                                height={56}
                                className="object-contain w-full h-full p-1"
                                unoptimized
                              />
                            ) : (
                              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-foreground" />
                            );
                          }
                          const displayLogo = resolvedTheme === "dark"
                            ? edu.logoDark ?? edu.logo ?? edu.logoLight
                            : edu.logoLight ?? edu.logo ?? edu.logoDark;
                          return displayLogo ? (
                            <Image
                              src={displayLogo}
                              alt={`${edu.institution} logo`}
                              width={56}
                              height={56}
                              className="object-contain w-full h-full p-1"
                              unoptimized
                            />
                          ) : (
                            <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-foreground" />
                          );
                        })()}
                      </div>
                      
                      {/* Date Badge */}
                      <div className="flex flex-col gap-2 sm:mt-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/60 dark:border-border/50">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                            {edu.startDate} - {edu.current ? (
                              <span className="text-foreground font-semibold">Present</span>
                            ) : edu.endDate}
                          </span>
                        </div>
                        {edu.current && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 dark:border-border/30">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                            <span className="text-xs font-medium text-foreground uppercase tracking-wider">
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Section - Content */}
                  <div className="flex-1 min-w-0">
                    {/* Degree & Institution */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-foreground break-words">
                        {edu.degree}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground mb-3 break-words">
                        {edu.institution}
                      </p>
                      
                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground">{edu.location}</span>
                      </div>
                    </div>
                    
                    {/* Grade */}
                    {edu.grade && (
                      <div className="mb-5 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 dark:border-border/30 inline-flex">
                        <Award className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{edu.grade}</span>
                      </div>
                    )}
                    
                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                          Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 dark:border-border/30 text-xs sm:text-sm font-medium text-muted-foreground"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="mt-6 space-y-2">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                          Highlights
                        </h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((highlight, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 text-sm sm:text-base"
                            >
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                              <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

