"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { SectionTitle } from "@/components/SectionTitle";

export function EducationSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Education"
          subtitle="Academic background"
          className="mb-8 sm:mb-12 md:mb-16"
        />
        
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
                className="relative rounded-xl gold-card card-professional p-6 sm:p-7 md:p-8 border border-border/60 dark:border-border/50 hover:border-border dark:hover:border-border transition-all duration-200 shadow-sm hover:shadow-lg overflow-hidden"
              >
                <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8">
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
                    </div>
                  </div>
                  
                  {/* Right Section - Content */}
                  <div className="flex-1 min-w-0">
                    {/* Degree & Institution */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-foreground break-words text-gradient-professional">
                        {edu.degree}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground mb-3 break-words">
                        {edu.institution}
                      </p>
                      
                      {/* Location (neutral style, no gold effect) */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 border border-border/60 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                        <span className="font-medium">{edu.location}</span>
                      </div>
                    </div>
                    
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
                              className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-muted-foreground bg-muted/60 border border-border/60"
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
                              <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
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

