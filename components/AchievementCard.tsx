"use client";

import { useEffect, useState, useMemo, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, Trophy, Star, GraduationCap, Users, FileCheck, X, ExternalLink, ChevronLeft, ChevronRight, Maximize2, Share2, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { PDFViewer } from "@/components/PDFViewer";
import { certifications, type Certification } from "@/data/education";
import { hackathons } from "@/data/hackathons";
import { leadership } from "@/data/leadership";
import { staggerContainer, fadeInUp } from "@/lib/utils";
import { useTheme } from "next-themes";

const iconMap: Record<string, typeof Award> = {
  certification: FileCheck,
  hackathon: Trophy,
  leadership: Users,
  award: Award,
  star: Star,
};

interface AchievementCardProps {
  type: "certification" | "hackathon" | "leadership";
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
  achievement?: string;
  index: number;
  logoSrc?: string;
  logoSrcLight?: string;
  logoSrcDark?: string;
  onClick?: () => void;
}

export function AchievementCard({
  type,
  title,
  issuer,
  year,
  description,
  achievement,
  index,
  logoSrc,
  logoSrcLight,
  logoSrcDark,
  onClick,
}: AchievementCardProps) {
  const Icon = iconMap[type] || Award;
  const colors = {
    certification: "from-blue-500 to-cyan-500",
    hackathon: "from-amber-500 to-orange-500",
    leadership: "from-purple-500 to-pink-500",
  };
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isInteractive = typeof onClick === "function";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize logo selection to avoid recalculation
  const displayLogo = useMemo(() => {
    if (!isMounted) return logoSrcLight ?? logoSrc ?? logoSrcDark;
    return resolvedTheme === "dark"
      ? logoSrcDark ?? logoSrc ?? logoSrcLight
      : logoSrcLight ?? logoSrc ?? logoSrcDark;
  }, [isMounted, resolvedTheme, logoSrc, logoSrcLight, logoSrcDark]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };


  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`group relative rounded-xl modern-glass border border-border/40 hover:border-primary/50 p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 ${
        isInteractive
          ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          : ""
      }`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-haspopup={isInteractive ? "dialog" : undefined}
      aria-label={isInteractive ? `Open certificate ${title}` : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors[type]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg p-[2px] bg-gradient-to-br ${colors[type]} shadow-lg overflow-hidden`}
          >
            {displayLogo ? (
              <div className="w-full h-full rounded-md bg-white flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src={displayLogo}
                  alt={`${title} logo`}
                  width={40}
                  height={40}
                  className="object-contain max-w-[36px] max-h-[36px]"
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <Icon className="h-6 w-6 text-white" />
            )}
          </div>
          {type === "certification" && issuer ? (
            <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 line-clamp-1 max-w-[200px]">
              {issuer}
            </span>
          ) : year ? (
            <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              {year}
            </span>
          ) : null}
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
        
        {type !== "certification" && issuer && (
          <p className="text-sm text-muted-foreground mb-2 font-medium line-clamp-1">{issuer}</p>
        )}
        
        {achievement && (
          <p className="text-sm font-semibold gradient-text mb-2">{achievement}</p>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);
  const [isViewerLoading, setIsViewerLoading] = useState(true);
  const [isFullscreenError, setIsFullscreenError] = useState<string | null>(null);
  const [certificateZoom, setCertificateZoom] = useState(1);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!selectedCertificate) {
      setIsViewerLoading(true);
      return;
    }

    // No scroll lock - allow free scrolling on all devices
    // The modal/inline viewer will work without locking the page scroll
  }, [selectedCertificate]);

  const closeViewer = () => {
    setSelectedCertificate(null);
    setCertificateZoom(1);
  };
  const currentIndex = selectedCertificate ? certifications.findIndex(c => c.id === selectedCertificate.id) : -1;
  const goNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % certifications.length;
    setIsViewerLoading(true);
    setCertificateZoom(1); // Reset zoom when changing certificate
    setSelectedCertificate(certifications[nextIndex]);
  };
  const goPrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + certifications.length) % certifications.length;
    setIsViewerLoading(true);
    setCertificateZoom(1); // Reset zoom when changing certificate
    setSelectedCertificate(certifications[prevIndex]);
  };

  const handleKeyNav = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!selectedCertificate) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      requestFullscreen();
    }
  };

  const requestFullscreen = async () => {
    try {
      const container = document.getElementById("certificate-viewer-container");
      if (container && container.requestFullscreen) {
        await container.requestFullscreen();
      } else {
        setIsFullscreenError("Fullscreen not supported in this browser.");
        setTimeout(() => setIsFullscreenError(null), 2000);
      }
    } catch (err) {
      setIsFullscreenError("Failed to enter fullscreen.");
      setTimeout(() => setIsFullscreenError(null), 2000);
    }
  };

  const shareCertificate = async () => {
    if (!selectedCertificate) return;
    const url = typeof window !== "undefined"
      ? new URL(selectedCertificate.certificateUrl!, window.location.origin).toString()
      : selectedCertificate.certificateUrl!;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${selectedCertificate.name} – ${selectedCertificate.issuer}`,
          text: "Certification",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setIsFullscreenError("Link copied");
        setTimeout(() => setIsFullscreenError(null), 1500);
      }
    } catch {
      // ignore cancel
    }
  };

  const zoomInCertificate = () => {
    setCertificateZoom(prev => Math.min(prev + 0.25, 2));
  };

  const zoomOutCertificate = () => {
    setCertificateZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoomCertificate = () => {
    setCertificateZoom(1);
  };

  const downloadCertificate = () => {
    if (!selectedCertificate?.certificateUrl) return;
    const link = document.createElement("a");
    link.href = selectedCertificate.certificateUrl;
    link.download = `${selectedCertificate.name.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden" onKeyDown={handleKeyNav}>
      {/* Clean section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Certifications - Apple Design */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <SectionTitle
            title="Certifications"
            subtitle="Professional and online credentials"
            className="mb-8 sm:mb-10 md:mb-12"
          />
          
          {/* Clean Grid Layout */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={cert.id} 
                variants={fadeInUp} 
                data-certification-id={cert.id}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative h-full"
                >
                  {/* Apple-style Certification Card */}
                  <div
                    onClick={() => {
                      setSelectedCertificate(cert);
                      // Scroll to inline viewer after a short delay to allow it to render
                      setTimeout(() => {
                        const viewer = document.getElementById("certificate-viewer-container");
                        if (viewer) {
                          const navbarHeight = 80;
                          const viewerTop = viewer.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = viewerTop - navbarHeight;
                          window.scrollTo({
                            top: Math.max(0, offsetPosition),
                            behavior: "smooth"
                          });
                        }
                      }, 300);
                    }}
                    className="relative h-full rounded-xl bg-card border border-border/50 cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md"
                  >
                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col h-full">
                      {/* Logo Section */}
                      <div className="mb-4 flex items-start justify-between">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-muted/50 border border-border/60 dark:border-border/50 flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const displayLogo = resolvedTheme === "dark"
                              ? cert.logoDark ?? cert.logo ?? cert.logoLight
                              : cert.logoLight ?? cert.logo ?? cert.logoDark;
                            return displayLogo ? (
                              <Image
                                src={displayLogo}
                                alt={`${cert.name} logo`}
                                width={40}
                                height={40}
                                className="object-contain max-w-[36px] max-h-[36px]"
                                unoptimized
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <FileCheck className="h-5 w-5 text-foreground" />
                            );
                          })()}
                        </div>
                        
                        {/* Year Badge */}
                        <div className="px-3 py-1 rounded-lg bg-muted/50 border border-border/60 dark:border-border/50">
                          <span className="text-xs font-medium text-foreground">{cert.year}</span>
                        </div>
                      </div>

                      {/* Title & Issuer */}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {cert.name}
                        </h3>
                        {cert.issuer && (
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            {cert.issuer}
                          </p>
                        )}
                        
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/30">
                          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {cert.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Inline Certificate PDF Viewer - Appears right after Certifications section */}
        <AnimatePresence mode="wait">
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mb-12 sm:mb-16 md:mb-20"
            >
            <div className="rounded-2xl bg-card border border-border/50 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 md:p-6 border-b border-border/30 bg-gradient-to-r from-card/80 to-card/60">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-1">
                    {selectedCertificate.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCertificate.issuer} • {selectedCertificate.year}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-end sm:justify-start">
                  {/* Navigation Buttons */}
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50 text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-w-[32px] min-h-[32px]"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50 text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-w-[32px] min-h-[32px]"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-0.5 rounded-md border border-border/40 bg-muted/50 p-0.5">
                    <button
                      type="button"
                      onClick={zoomOutCertificate}
                      className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation min-w-[32px] min-h-[32px]"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <span className="text-xs sm:text-sm font-medium text-foreground min-w-[2.5rem] sm:min-w-[3rem] text-center px-1">
                      {Math.round(certificateZoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={zoomInCertificate}
                      className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation min-w-[32px] min-h-[32px]"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    {certificateZoom !== 1 && (
                      <button
                        type="button"
                        onClick={resetZoomCertificate}
                        className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded text-foreground hover:text-primary transition-all touch-manipulation ml-0.5 min-w-[32px] min-h-[32px]"
                        aria-label="Reset zoom"
                      >
                        <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    )}
                  </div>
                  {/* Action Buttons */}
                  <button
                    type="button"
                    onClick={downloadCertificate}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50 text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-w-[32px] min-h-[32px]"
                    aria-label="Download"
                  >
                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={shareCertificate}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50 text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-w-[32px] min-h-[32px]"
                    aria-label="Share"
                  >
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/40 bg-muted/50 text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-w-[32px] min-h-[32px]"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer - Inline */}
              <div 
                id="certificate-viewer-container" 
                className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-white dark:bg-background overflow-auto"
              >
                <PDFViewer
                  key={selectedCertificate.id}
                  file={selectedCertificate.certificateUrl!}
                  className="w-full h-full"
                  scale={certificateZoom !== 1 ? certificateZoom : undefined}
                  onLoadSuccess={() => setIsViewerLoading(false)}
                  onLoadError={() => setIsViewerLoading(false)}
                />
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 md:p-6 border-t border-border/30 bg-gradient-to-r from-card/60 to-card/80">
                <p className="text-sm text-muted-foreground">
                  <span className="hidden sm:inline">Having trouble viewing? </span>Open the certificate in a new tab below.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-muted/50 px-3 sm:px-4 py-2 text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 touch-manipulation min-h-[44px] sm:min-h-[40px]"
                  >
                    Close
                  </button>
                  <a
                    href={selectedCertificate.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 sm:px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 touch-manipulation min-h-[44px] sm:min-h-[40px]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open in new tab</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>

        {/* Hackathon Achievements - Apple Design */}
        <div className="mb-12 sm:mb-16 md:mb-20" key={`hackathons-${selectedCertificate ? 'with-viewer' : 'no-viewer'}`}>
          <SectionTitle
            title="Hackathon Achievements"
            subtitle="Competitions and recognitions"
            className="mb-8 sm:mb-10 md:mb-12"
          />
          
          {/* Clean Grid Layout */}
          <motion.div
            key={`hackathons-grid-${selectedCertificate ? 'with-viewer' : 'no-viewer'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          >
            {hackathons.map((hackathon, index) => {
              const isWinner = hackathon.achievement.toLowerCase().includes("winner") || hackathon.achievement.toLowerCase().includes("1st");
              
              return (
                <motion.div 
                  key={hackathon.id} 
                  variants={fadeInUp}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative h-full"
                  >
                    {/* Apple-style Hackathon Card */}
                    <div className="relative h-full rounded-xl bg-card border border-border/50 transition-all duration-200 hover:border-border hover:shadow-md">
                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col h-full">
                        {/* Header Section with Achievement and Year */}
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0">
                            {hackathon.logo ? (
                              <Image
                                src={hackathon.logo}
                                alt={`${hackathon.name} logo`}
                                width={40}
                                height={40}
                                className="object-contain max-w-[36px] max-h-[36px]"
                                unoptimized
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Trophy className="h-5 w-5 text-foreground" />
                            )}
                          </div>
                          
                          {/* Year and Achievement Badges - Stacked */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {/* Achievement Badge */}
                            <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                {hackathon.achievement}
                              </span>
                            </div>
                            {/* Year Badge */}
                            <div className="px-3 py-1 rounded-lg bg-muted/50 border border-border/50">
                              <span className="text-xs font-medium text-foreground">
                                {hackathon.year}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1 mb-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 line-clamp-2">
                            {hackathon.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {hackathon.description}
                          </p>
                        </div>

                        {/* Achievement Level */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {isWinner ? "Winner" : "Finalist"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Leadership Experience - Apple Design */}
        <div key={`leadership-${selectedCertificate ? 'with-viewer' : 'no-viewer'}`}>
          <SectionTitle
            title="Leadership Experience"
            subtitle="Leading teams and driving innovation"
            className="mb-10 sm:mb-12"
          />
          
          {/* Clean Grid Layout */}
          <motion.div
            key={`leadership-grid-${selectedCertificate ? 'with-viewer' : 'no-viewer'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-4xl mx-auto"
          >
            {leadership.map((role, index) => {
              const displayLogo = resolvedTheme === "dark"
                ? role.logoDark ?? role.logoLight
                : role.logoLight ?? role.logoDark;
              
              const isCurrent = role.current;
              
              return (
                <motion.div 
                  key={role.id} 
                  variants={fadeInUp}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative h-full"
                  >
                    {/* Apple-style Leadership Card */}
                    <div className="relative h-full rounded-xl bg-card border border-border/50 transition-all duration-200 hover:border-border hover:shadow-md">
                      {/* Current Role Badge */}
                      {isCurrent && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="px-2.5 py-1 rounded-lg bg-muted/50 border border-border/50">
                            <span className="text-[10px] font-medium text-foreground uppercase tracking-wider flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                              Current
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col h-full">
                        {/* Header Section */}
                        <div className="mb-5 flex items-start justify-between">
                          {/* Logo/Icon Section */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0">
                            {displayLogo ? (
                              <Image
                                src={displayLogo}
                                alt={`${role.organization} logo`}
                                width={40}
                                height={40}
                                className="object-contain max-w-[36px] max-h-[36px]"
                                unoptimized
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Users className="h-5 w-5 text-foreground" />
                            )}
                          </div>
                          
                          {/* Date Badge */}
                          <div className="px-3 py-1 rounded-lg bg-muted/50 border border-border/50">
                            <span className="text-xs font-medium text-foreground">
                              {role.startDate} - {role.endDate}
                            </span>
                          </div>
                        </div>

                        {/* Role & Organization */}
                        <div className="flex-1 mb-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">
                            {role.role}
                          </h3>
                          
                          {role.organization && (
                            <p className="text-sm font-medium text-muted-foreground mb-3">
                              {role.organization}
                            </p>
                          )}
                          
                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                            {role.description}
                          </p>
                          
                          {/* Highlights */}
                          {role.highlights && role.highlights.length > 0 && (
                            <div className="space-y-2">
                              {role.highlights.slice(0, 2).map((highlight, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-1.5 flex-shrink-0" />
                                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                                    {highlight}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Leadership
                            </span>
                          </div>
                          {isCurrent && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                              <span className="text-xs font-medium text-foreground">
                                Active
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

    </section>
  );
}

