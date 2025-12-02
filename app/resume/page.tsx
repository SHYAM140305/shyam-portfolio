"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Briefcase, X, Maximize2, Share2, ExternalLink, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

const PDFViewerLazy = dynamic(() => import("@/components/PDFViewer").then(mod => ({ default: mod.PDFViewer })), {
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
      Loading resume...
    </div>
  ),
  ssr: false
});

export default function ResumePage() {
  const router = useRouter();
  const [resumeToast, setResumeToast] = useState<string | null>(null);
  const [resumeZoom, setResumeZoom] = useState(1);
  const [resumePage, setResumePage] = useState(1);
  const [resumeNumPages, setResumeNumPages] = useState(0);

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
    <div className="fixed inset-0 bg-background">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="resume-viewer-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-3 md:p-4 border-b border-border/50 dark:border-border/30 flex-shrink-0 bg-background">
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
            {/* Action Buttons */}
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
              onClick={() => router.push("/")}
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
        <div id="resume-viewer-container" className="relative flex-1 min-h-0 bg-muted/20 overflow-auto">
          <PDFViewerLazy
            file="/resume.pdf"
            className="w-full h-full"
            scale={resumeZoom !== 1 ? resumeZoom : undefined}
            currentPage={resumePage}
            restrictScroll={false}
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
              className="fixed bottom-4 right-4 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-2 shadow-lg z-10"
            >
              {resumeToast}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

