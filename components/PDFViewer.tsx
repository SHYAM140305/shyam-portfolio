"use client";

import { type ComponentType } from "react";
import dynamic from "next/dynamic";

interface PDFViewerProps {
  file: string;
  className?: string;
  onLoadSuccess?: (numPages: number) => void;
  onLoadError?: (error: Error) => void;
  scale?: number;
  showControls?: boolean;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  restrictScroll?: boolean;
}

// Use Next.js dynamic import with ssr: false to prevent server-side rendering
// This ensures react-pdf is only loaded on the client side
// Wrapping the named export as default for dynamic import compatibility
const PDFViewerInternal = dynamic(
  async () => {
    const mod = await import("./PDFViewerInternal");
    return { default: mod.PDFViewerInternal };
  },
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 dark:bg-background/90 backdrop-blur-sm">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/60 border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Loading PDF viewer…</p>
        </div>
      </div>
    ),
  }
) as ComponentType<PDFViewerProps>;

export function PDFViewer(props: PDFViewerProps) {
  return <PDFViewerInternal {...props} />;
}
