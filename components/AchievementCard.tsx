"use client";

import { useEffect, useState, useMemo, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, Trophy, Star, GraduationCap, Users, FileCheck, X, ExternalLink, ChevronLeft, ChevronRight, Maximize2, Share2 } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
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

  useEffect(() => {
    if (!selectedCertificate) {
      setIsViewerLoading(true);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCertificate]);

  const closeViewer = () => setSelectedCertificate(null);
  const currentIndex = selectedCertificate ? certifications.findIndex(c => c.id === selectedCertificate.id) : -1;
  const goNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % certifications.length;
    setIsViewerLoading(true);
    setSelectedCertificate(certifications[nextIndex]);
  };
  const goPrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + certifications.length) % certifications.length;
    setIsViewerLoading(true);
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

  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden" onKeyDown={handleKeyNav}>
      {/* Background decoration - Reduced animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Certifications */}
        <div className="mb-16 sm:mb-20">
          <SectionTitle
            title="Certifications"
            subtitle="Professional and online credentials"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.id} variants={fadeInUp} data-certification-id={cert.id}>
                <AchievementCard
                  type="certification"
                  title={cert.name}
                  issuer={cert.issuer}
                  year={cert.year}
                  logoSrc={cert.logo}
                  logoSrcLight={cert.logoLight}
                  logoSrcDark={cert.logoDark}
                  index={index}
                  onClick={() => setSelectedCertificate(cert)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hackathon Achievements */}
        <div className="mb-16 sm:mb-20">
          <SectionTitle
            title="Hackathon Achievements"
            subtitle="Competitions and recognitions"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          >
            {hackathons.map((hackathon, index) => (
              <motion.div key={hackathon.id} variants={fadeInUp}>
                <AchievementCard
                  type="hackathon"
                  title={hackathon.name}
                  year={hackathon.year}
                  achievement={hackathon.achievement}
                  description={hackathon.description}
                  logoSrc={hackathon.logo}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Leadership */}
        <div>
          <SectionTitle
            title="Leadership Experience"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {leadership.map((role, index) => (
              <motion.div key={role.id} variants={fadeInUp}>
                <AchievementCard
                  type="leadership"
                  title={role.role}
                  issuer={role.organization}
                  description={role.description}
                  year={`${role.startDate} - ${role.endDate}`}
                  logoSrcLight={role.logoLight}
                  logoSrcDark={role.logoDark}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            key="certificate-backdrop"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
          >
            <motion.div
              key="certificate-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[95vh] flex flex-col bg-background rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 border-b border-border/30 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm flex-shrink-0">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground truncate">{selectedCertificate.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">
                    {selectedCertificate.issuer}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border/40 bg-muted/50 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border/40 bg-muted/50 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                    aria-label="Next certificate"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={requestFullscreen}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border/40 bg-muted/50 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                  <button
                    type="button"
                    onClick={shareCertificate}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-border/40 bg-muted/50 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                    aria-label="Share certificate"
                  >
                    <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-muted/50 h-9 w-9 sm:h-10 sm:w-10 text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                    aria-label="Close certificate viewer"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div id="certificate-viewer-container" className="relative flex-1 min-h-0 bg-white overflow-hidden">
                {isViewerLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm">
                    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/60 border-t-transparent" />
                    <p className="text-sm font-medium text-muted-foreground">Loading certificate…</p>
                  </div>
                )}
                <iframe
                  key={selectedCertificate.id}
                  src={`${selectedCertificate.certificateUrl}#toolbar=0&navpanes=0&zoom=page-fit`}
                  title={`${selectedCertificate.name} certificate`}
                  className="w-full h-full border-0"
                  onLoad={() => setIsViewerLoading(false)}
                />
                {isFullscreenError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 right-4 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-2 shadow-lg z-20"
                  >
                    {isFullscreenError}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 md:p-6 border-t border-border/30 bg-gradient-to-r from-card/60 to-card/80 backdrop-blur-sm flex-shrink-0">
                <p className="text-xs text-muted-foreground">
                  Having trouble viewing? Open the certificate in a new tab below.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="inline-flex items-center justify-center rounded-lg border border-border/40 bg-muted/50 px-4 py-2 text-xs sm:text-sm font-medium text-foreground transition hover:text-primary hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                  >
                    Done
                  </button>
                  <a
                    href={selectedCertificate.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                  >
                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Open in new tab</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

