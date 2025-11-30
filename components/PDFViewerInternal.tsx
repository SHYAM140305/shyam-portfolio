"use client";

import { useState, useEffect, useRef, type ComponentType } from "react";
// Import worker configuration FIRST, before any PDF.js code
import { getWorkerSrc } from "../lib/pdfjs-worker-config";

// Dynamic imports for react-pdf - only loaded on client side
let Document: ComponentType<any> | null = null;
let Page: ComponentType<any> | null = null;
let pdfjs: any = null;
let pdfLibLoaded = false;

// Load react-pdf dynamically
const loadReactPdf = async () => {
  if (pdfLibLoaded) return;
  
  if (typeof window === "undefined") return;
  
  try {
    // Get worker source from configuration module
    const workerSrc = getWorkerSrc();
    
    // STEP 1: Import and configure pdfjs-dist FIRST (before react-pdf)
    // This ensures the worker is set before react-pdf's bundled pdfjs-dist initializes
    let pdfjsDist: any = null;
    try {
      pdfjsDist = await import("pdfjs-dist");
      // Configure worker immediately after import
      if (pdfjsDist?.GlobalWorkerOptions) {
        pdfjsDist.GlobalWorkerOptions.workerSrc = workerSrc;
      }
    } catch (e) {
      // pdfjs-dist might not be directly importable, that's okay
    }
    
    // STEP 2: Import react-pdf
    const reactPdf = await import("react-pdf");
    
    // STEP 3: Configure worker on react-pdf's pdfjs instance IMMEDIATELY
    // This must happen synchronously, before any Document components render
    pdfjs = reactPdf.pdfjs;
    
    // Configure worker on all pdfjs instances (react-pdf might use its own bundled version)
    const instances = [pdfjs, reactPdf.pdfjs, pdfjsDist].filter(Boolean);
    for (const instance of instances) {
      if (instance?.GlobalWorkerOptions) {
        instance.GlobalWorkerOptions.workerSrc = workerSrc;
      }
    }
    
    // STEP 4: Verify and force set worker (prevent CDN fallback)
    // Override any CDN URLs that might have been set as fallback
    if (pdfjs?.GlobalWorkerOptions) {
      const currentSrc = pdfjs.GlobalWorkerOptions.workerSrc;
      if (!currentSrc || currentSrc.includes("cdnjs") || currentSrc.includes("unpkg") || currentSrc.includes("jsdelivr")) {
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      }
    }
    
    // STEP 5: Assign components
    Document = reactPdf.Document;
    Page = reactPdf.Page;
    
    // STEP 6: Import CSS
    // @ts-ignore - CSS imports don't have type definitions
    await import("react-pdf/dist/Page/AnnotationLayer.css");
    // @ts-ignore - CSS imports don't have type definitions
    await import("react-pdf/dist/Page/TextLayer.css");
    
    pdfLibLoaded = true;
  } catch (err) {
    console.error("Failed to load react-pdf:", err);
    throw err;
  }
};

interface PDFViewerProps {
  file: string;
  className?: string;
  onLoadSuccess?: (numPages: number) => void;
  onLoadError?: (error: Error) => void;
  scale?: number;
  showControls?: boolean;
  onPageChange?: (page: number) => void;
  currentPage?: number;
}

export function PDFViewerInternal({
  file,
  className = "",
  onLoadSuccess,
  onLoadError,
  scale,
  showControls = false,
  onPageChange,
  currentPage,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdfLibReady, setPdfLibReady] = useState(false);
  const [pageDimensions, setPageDimensions] = useState<Array<{ width: number; height: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Suppress AbortException warnings globally (set up once, persists for component lifetime)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Suppress AbortException warnings from PDF.js TextLayer
    // These are harmless and occur during normal component lifecycle
    const suppressedErrors = [
      "AbortException",
      "TextLayer task cancelled",
      "cancelled",
      "task cancelled",
      "AbortException:",
    ];
    
    // Intercept console.warn to filter out harmless PDF.js warnings
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.warn = (...args: any[]) => {
      const warningMessage = args[0]?.toString() || "";
      const isSuppressed = suppressedErrors.some((suppressed: string) =>
        warningMessage.toLowerCase().includes(suppressed.toLowerCase())
      );
      
      if (isSuppressed) {
        // Silently ignore AbortException warnings
        return;
      }
      
      // Pass through other warnings
      originalWarn.apply(console, args);
    };
    
    // Also intercept console.error for AbortException
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || "";
      const isSuppressed = suppressedErrors.some((suppressed: string) =>
        errorMessage.toLowerCase().includes(suppressed.toLowerCase())
      );
      
      if (isSuppressed) {
        // Silently ignore AbortException errors
        return;
      }
      
      // Pass through other errors
      originalError.apply(console, args);
    };
    
    loadReactPdf()
      .then(() => {
        setPdfLibReady(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load PDF library");
        setLoading(false);
        onLoadError?.(err);
      });
    
    // Restore original console methods on cleanup
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [onLoadError]);

  // Calculate optimal width for responsive rendering
  // Using width instead of scale provides better responsiveness
  const getPageWidth = (pageIndex: number = 0) => {
    // If custom scale is provided and not 1, use scale (user is zooming)
    // Otherwise use width-based responsive rendering
    if (scale !== undefined && scale !== 1) return undefined;
    
    // Measure container directly if ref is available
    let measuredWidth = containerWidth;
    if (containerRef.current && measuredWidth === 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(containerRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      measuredWidth = rect.width - paddingLeft - paddingRight;
    }
    
    // If still no width, use window width as fallback
    if (measuredWidth === 0 && typeof window !== "undefined") {
      // For fullscreen viewers, use full viewport width
      const containerId = containerRef.current?.id || 
                         document.getElementById("pdf-container")?.id ||
                         document.getElementById("resume-viewer-container")?.id ||
                         document.getElementById("certificate-viewer-container")?.id;
      const isFullscreenViewer = containerId === "certificate-viewer-container" || containerId === "resume-viewer-container";
      if (isFullscreenViewer) {
        measuredWidth = window.innerWidth;
      } else {
        measuredWidth = Math.min(window.innerWidth - 64, 1200); // Account for modal padding
      }
    }
    
    if (measuredWidth === 0) return undefined;
    
    // Account for padding (left + right) - responsive padding based on screen size
    // Matches the padding in the container: p-1 sm:p-2 md:p-3 lg:p-4 (compact)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const isTablet = typeof window !== "undefined" && window.innerWidth >= 640 && window.innerWidth < 1024;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    
    // Check if this is a fullscreen viewer (certificate or resume)
    const containerId = containerRef.current?.id || 
                       document.getElementById("pdf-container")?.id ||
                       document.getElementById("resume-viewer-container")?.id ||
                       document.getElementById("certificate-viewer-container")?.id;
    const isResumeViewer = containerId === "resume-viewer-container";
    const isCertificateViewer = containerId === "certificate-viewer-container";
    const isFullscreenViewer = isResumeViewer || isCertificateViewer;
    
    // For fullscreen viewers, use minimal padding to maximize PDF display (compact)
    // p-1 = 4px, p-2 = 8px, p-3 = 12px, p-4 = 16px (each side, so double for total)
    const padding = isFullscreenViewer 
      ? (isMobile ? 8 : isTablet ? 16 : isDesktop ? 24 : 32) // Compact padding for fullscreen
      : (isMobile ? 8 : isTablet ? 16 : isDesktop ? 24 : 32); // Normal padding
    const availableWidth = Math.max(measuredWidth - padding, 280); // Minimum 280px for very small screens
    
    // If we have actual page dimensions, calculate width to fit
    if (pageDimensions[pageIndex]?.width && pageDimensions[pageIndex].width > 0) {
      const pdfWidth = pageDimensions[pageIndex].width;
      
      // Calculate scale to fit width while maintaining aspect ratio
      // Use 100% of available width to ensure pages fit properly
      const scaleToFit = availableWidth / pdfWidth;
      
      // Clamp scale to reasonable bounds - adapt based on viewer type
      let minScale, maxScale;
      if (isResumeViewer) {
        // Resume viewer: allow larger scales to fill screen better
        minScale = isMobile ? 0.5 : isTablet ? 0.6 : 0.7;
        maxScale = isMobile ? 1.2 : isTablet ? 1.3 : 1.5;
      } else if (isCertificateViewer) {
        // Certificate viewer: consistent adaptive scaling
        // Let certificates fit naturally - don't force them to fill screen
        minScale = 0.3; // Very low minimum to allow natural fitting
        // Consistent max scale across devices - allow up to 1.2x for large certificates
        maxScale = 1.2; // Same max for all devices for consistency
      } else {
        // Normal viewer: more conservative scaling
        minScale = isMobile ? 0.4 : isTablet ? 0.5 : 0.6;
        maxScale = isMobile ? 1.0 : isTablet ? 1.1 : 1.2;
      }
      
      // For certificates, prefer natural fit - consistent behavior across all devices
      if (isCertificateViewer) {
        // Use the natural scale to fit - don't force scaling
        // This ensures small certificates stay small and large ones fill appropriately
        const naturalScale = Math.max(minScale, Math.min(maxScale, scaleToFit));
        const calculatedWidth = pdfWidth * naturalScale;
        
        // Ensure it doesn't exceed available width
        return Math.min(calculatedWidth, availableWidth);
      }
      
      const clampedScale = Math.max(minScale, Math.min(maxScale, scaleToFit));
      const calculatedWidth = pdfWidth * clampedScale;
      
      // Ensure it fits within available width
      return Math.min(calculatedWidth, availableWidth);
    }
    
    // Fallback: use available width with conservative max constraint
    // For certificates, use consistent percentage across all devices
    if (isCertificateViewer) {
      // Certificates: use up to 90% of available width, with device-appropriate max
      const maxWidth = isMobile ? 500 : isTablet ? 800 : 1200;
      return Math.min(availableWidth * 0.9, maxWidth);
    }
    // Use 90% of available width to ensure no cutoff
    return Math.min(availableWidth * 0.9, isMobile ? 500 : isTablet ? 700 : 900);
  };

  // Get scale value (only if custom scale is provided and not 1)
  const getScale = (pageIndex: number = 0) => {
    // Use custom scale only if it's explicitly set and not 1 (user zooming)
    if (scale !== undefined && scale !== 1) return scale;
    
    // Otherwise, return undefined to let width-based responsive rendering handle it
    return undefined;
  };

  // Update container width on resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout | null = null;
    
    const updateWidth = () => {
      // Use ref first, then fallback to element IDs
      const container = containerRef.current || 
                       document.getElementById("pdf-container") ||
                       document.getElementById("resume-viewer-container") ||
                       document.getElementById("certificate-viewer-container");
      
      if (container) {
        // Use getBoundingClientRect for more accurate width measurement
        const rect = container.getBoundingClientRect();
        // Use the actual available width, accounting for any padding
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const availableWidth = rect.width - paddingLeft - paddingRight;
        if (availableWidth > 0) {
          setContainerWidth(Math.max(availableWidth, 280)); // Minimum 280px
        }
      }
    };

    // Initial measurement with multiple attempts to ensure DOM is ready
    const initialTimeout1 = setTimeout(updateWidth, 50);
    const initialTimeout2 = setTimeout(updateWidth, 200);
    const initialTimeout3 = setTimeout(updateWidth, 500);
    
    // Use ResizeObserver for better performance
    const container = containerRef.current || 
                     document.getElementById("pdf-container") ||
                     document.getElementById("resume-viewer-container") ||
                     document.getElementById("certificate-viewer-container");
    
    if (container && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        // Debounce resize updates for better performance
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateWidth, 100);
      });
      resizeObserver.observe(container);
      
      // Also observe window resize for cases where container doesn't trigger ResizeObserver
      window.addEventListener("resize", updateWidth);
      
      return () => {
        clearTimeout(initialTimeout1);
        clearTimeout(initialTimeout2);
        clearTimeout(initialTimeout3);
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateWidth);
      };
    } else {
      // Fallback for browsers without ResizeObserver
      window.addEventListener("resize", updateWidth);
      return () => {
        clearTimeout(initialTimeout1);
        clearTimeout(initialTimeout2);
        clearTimeout(initialTimeout3);
        if (resizeTimeout) clearTimeout(resizeTimeout);
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, []);

  // Sync with external page control
  useEffect(() => {
    if (currentPage !== undefined && currentPage !== pageNumber) {
      setPageNumber(currentPage);
    }
  }, [currentPage, pageNumber]);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    // Initialize page dimensions array to ensure all pages are tracked
    if (numPages > 0) {
      setPageDimensions(new Array(numPages).fill(null).map(() => ({ width: 0, height: 0 })));
    }
    // Trigger width recalculation after PDF loads (multiple attempts to ensure it works)
    const recalculateWidth = () => {
      const container = containerRef.current ||
                       document.getElementById("pdf-container") ||
                       document.getElementById("resume-viewer-container") ||
                       document.getElementById("certificate-viewer-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
        const availableWidth = rect.width - paddingLeft - paddingRight;
        if (availableWidth > 0) {
          setContainerWidth(Math.max(availableWidth, 280));
        }
      }
    };
    setTimeout(recalculateWidth, 100);
    setTimeout(recalculateWidth, 300);
    setTimeout(recalculateWidth, 600);
    
    // Reset scroll position to top for certificate viewer
    const containerId = containerRef.current?.id || 
                       document.getElementById("pdf-container")?.id ||
                       document.getElementById("resume-viewer-container")?.id ||
                       document.getElementById("certificate-viewer-container")?.id;
    const isCertificateViewer = containerId === "certificate-viewer-container";
    if (isCertificateViewer && containerRef.current) {
      // Scroll to top when certificate loads
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, 100);
    }
    
    onLoadSuccess?.(numPages);
  };
  
  // Handle page load to get dimensions for better scaling
  const handlePageLoadSuccess = (page: any, pageIndex: number) => {
    if (page && page.width && page.height) {
      setPageDimensions((prev) => {
        const newDims = [...prev];
        newDims[pageIndex] = { width: page.width, height: page.height };
        return newDims;
      });
    }
  };

  const handleLoadError = (err: Error) => {
    setLoading(false);
    setError(err.message || "Failed to load PDF");
    onLoadError?.(err);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1;
      setPageNumber(newPage);
      onPageChange?.(newPage);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      const newPage = pageNumber + 1;
      setPageNumber(newPage);
      onPageChange?.(newPage);
    }
  };

  // Get page width for responsive rendering
  const pageWidth = getPageWidth(0);
  const pdfScale = getScale(0);

  // Check if this is a certificate viewer for alignment
  const containerId = containerRef.current?.id || 
                     document.getElementById("pdf-container")?.id ||
                     document.getElementById("resume-viewer-container")?.id ||
                     document.getElementById("certificate-viewer-container")?.id;
  const isCertificateViewer = containerId === "certificate-viewer-container";

  // Don't render until PDF library is loaded
  if (!pdfLibReady || !Document || !Page) {
    return (
      <div className={`relative w-full h-full flex flex-col pdf-viewer-container ${className}`}>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pdf-loading-overlay">
          {error ? (
            <>
              <div className="pdf-error-icon">
                <svg className="w-12 h-12 text-destructive/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-foreground">Error: {error}</p>
                <p className="text-xs text-muted-foreground">Please try opening the PDF in a new tab</p>
              </div>
            </>
          ) : (
            <>
              <div className="pdf-loading-spinner">
                <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400" />
              </div>
              <p className="text-sm font-medium text-foreground/80">Loading PDF library…</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex flex-col pdf-viewer-container ${className}`}>
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pdf-loading-overlay">
          <div className="pdf-loading-spinner">
            <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400" />
          </div>
          <p className="text-sm font-medium text-foreground/80">Loading PDF…</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pdf-error-overlay">
          <div className="pdf-error-icon">
            <svg className="w-12 h-12 text-destructive/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <p className="text-base font-semibold text-foreground">Unable to load PDF</p>
            <p className="text-sm text-muted-foreground max-w-sm px-4">Please try opening the PDF in a new tab or check your connection</p>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        id="pdf-container"
        className="flex-1 overflow-auto pdf-viewer-scroll-container flex items-start justify-center p-1 sm:p-2 md:p-3 lg:p-4"
        style={{ 
          minHeight: 0, 
          width: "100%", 
          WebkitOverflowScrolling: "touch"
        }}
      >
        {(() => {
          const DocumentComponent = Document!; // Non-null assertion - we've already checked above
          return (
            <DocumentComponent
              file={file}
              onLoadSuccess={handleLoadSuccess}
              onLoadError={handleLoadError}
              loading={
                <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] w-full pdf-document-loading">
                  <div className="pdf-loading-spinner">
                    <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-foreground/70">Loading document…</p>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[400px] w-full pdf-document-error">
                  <div className="pdf-error-icon">
                    <svg className="w-10 h-10 text-destructive/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-semibold text-foreground">Failed to load PDF</p>
                    <p className="text-xs text-muted-foreground text-center max-w-md">
                      Please try opening the PDF in a new tab or check your connection
                    </p>
                  </div>
                </div>
              }
              className="flex flex-col items-center w-full"
            >
           {numPages && (
             <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full py-1 sm:py-2 md:py-3 lg:py-4 pdf-pages-container" style={{ maxWidth: "100%" }}>
               {/* Show only the current page when pageNumber is set, otherwise show all pages */}
               {currentPage !== undefined ? (
                 // Single page view mode
                 (() => {
                   const PageComponent = Page!;
                   const pageIndex = pageNumber - 1;
                   const pageWidth = getPageWidth(pageIndex);
                   const finalWidth = pageWidth || (typeof window !== "undefined" 
                     ? Math.min(window.innerWidth - 64, 800) 
                     : 800);
                   
                   return (
                     <div
                       key={`page-wrapper-${pageNumber}`}
                       className="w-full flex justify-center pdf-page-wrapper"
                       style={{ maxWidth: "100%", overflow: "visible" }}
                     >
                       <div className="pdf-page-container">
                         <PageComponent
                           key={`page_${pageNumber}`}
                           pageNumber={pageNumber}
                           {...(scale !== undefined && scale !== 1
                             ? { scale: scale } 
                             : { width: finalWidth }
                           )}
                           className="pdf-page"
                           style={{ 
                             maxWidth: "100%", 
                             height: "auto", 
                             display: "block",
                             width: "auto",
                             objectFit: "contain"
                           }}
                         renderTextLayer={true}
                         renderAnnotationLayer={true}
                         onLoadSuccess={(page: any) => {
                           if (page && typeof page.getViewport === "function") {
                             try {
                               const viewport = page.getViewport({ scale: 1.0 });
                               if (viewport?.width && viewport?.height) {
                                 setPageDimensions((prev) => {
                                   const newDims = [...prev];
                                   while (newDims.length <= pageIndex) {
                                     newDims.push({ width: 0, height: 0 });
                                   }
                                   newDims[pageIndex] = { width: viewport.width, height: viewport.height };
                                   return newDims;
                                 });
                               }
                             } catch (e) {
                               console.warn("Could not get page viewport:", e);
                             }
                           }
                         }}
                         onRenderError={(error: Error) => {
                           // Suppress AbortException and cancellation errors - these are harmless
                           // and occur during normal component lifecycle (page switching, unmounting, etc.)
                           const errorName = error?.name?.toLowerCase() || "";
                           const errorMessage = error?.message?.toLowerCase() || "";
                           const isAbortError = 
                             errorName.includes("abort") ||
                             errorMessage.includes("cancelled") ||
                             errorMessage.includes("textlayer task cancelled") ||
                             errorMessage.includes("abort");
                           
                           if (isAbortError) {
                             // Silently ignore - these are expected during normal operation
                             return;
                           }
                           // Only log actual errors (not AbortExceptions)
                           if (error && !isAbortError) {
                             console.warn("PDF page render error:", error);
                           }
                         }}
                         onRenderSuccess={() => {}}
                         loading={
                           <div className="flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] pdf-page-loading">
                             <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400" />
                           </div>
                         }
                       />
                       </div>
                     </div>
                   );
                 })()
               ) : (
                 // All pages view mode (when currentPage is not set)
                 Array.from(new Array(numPages), (el, index) => {
                   const PageComponent = Page!;
                   const pageWidth = getPageWidth(index);
                   const finalWidth = pageWidth || (typeof window !== "undefined" 
                     ? Math.min(window.innerWidth - 64, 800) 
                     : 800);
                   
                   return (
                     <div
                       key={`page-wrapper-${index + 1}`}
                       data-page-number={index + 1}
                       className="w-full flex justify-center pdf-page-wrapper"
                       style={{ maxWidth: "100%", overflow: "visible" }}
                     >
                       <div className="pdf-page-container">
                         <PageComponent
                           key={`page_${index + 1}`}
                           pageNumber={index + 1}
                           {...(scale !== undefined && scale !== 1
                             ? { scale: scale } 
                             : { width: finalWidth }
                           )}
                           className="pdf-page"
                           style={{ 
                             maxWidth: "100%", 
                             height: "auto", 
                             display: "block",
                             width: "auto",
                             objectFit: "contain"
                           }}
                         renderTextLayer={true}
                         renderAnnotationLayer={true}
                         onLoadSuccess={(page: any) => {
                           if (page && typeof page.getViewport === "function") {
                             try {
                               const viewport = page.getViewport({ scale: 1.0 });
                               if (viewport?.width && viewport?.height) {
                                 setPageDimensions((prev) => {
                                   const newDims = [...prev];
                                   while (newDims.length <= index) {
                                     newDims.push({ width: 0, height: 0 });
                                   }
                                   newDims[index] = { width: viewport.width, height: viewport.height };
                                   return newDims;
                                 });
                               }
                             } catch (e) {
                               console.warn("Could not get page viewport:", e);
                             }
                           }
                         }}
                         onRenderError={(error: Error) => {
                           // Suppress AbortException and cancellation errors - these are harmless
                           // and occur during normal component lifecycle (page switching, unmounting, etc.)
                           const errorName = error?.name?.toLowerCase() || "";
                           const errorMessage = error?.message?.toLowerCase() || "";
                           const isAbortError = 
                             errorName.includes("abort") ||
                             errorMessage.includes("cancelled") ||
                             errorMessage.includes("textlayer task cancelled") ||
                             errorMessage.includes("abort");
                           
                           if (isAbortError) {
                             // Silently ignore - these are expected during normal operation
                             return;
                           }
                           // Only log actual errors (not AbortExceptions)
                           if (error && !isAbortError) {
                             console.warn("PDF page render error:", error);
                           }
                         }}
                         onRenderSuccess={() => {}}
                         loading={
                           <div className="flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] pdf-page-loading">
                             <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400" />
                           </div>
                         }
                       />
                       </div>
                     </div>
                   );
                 })
               )}
             </div>
           )}
            </DocumentComponent>
          );
        })()}
      </div>

      {showControls && numPages && numPages > 1 && (
        <div className="pdf-controls-container">
          <button
            type="button"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="pdf-control-button pdf-control-button-prev"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
          <div className="pdf-page-indicator">
            <span className="pdf-page-number">{pageNumber}</span>
            <span className="pdf-page-separator">of</span>
            <span className="pdf-page-total">{numPages}</span>
          </div>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="pdf-control-button pdf-control-button-next"
            aria-label="Next page"
          >
            <span>Next</span>
            <svg className="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

