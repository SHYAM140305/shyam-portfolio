// PDF.js Worker Configuration
// This module must be imported BEFORE any react-pdf or pdfjs-dist imports
// to ensure the worker is configured before PDF.js initializes

if (typeof window !== "undefined") {
  // Set worker source using absolute URL
  const workerSrc = new URL("/pdf.worker.min.mjs", window.location.origin).href;
  
  // Store globally for later use
  (window as any).__PDFJS_WORKER_SRC__ = workerSrc;
  
  // Configure worker immediately if pdfjs-dist is already loaded
  const configureWorker = (pdfjsInstance: any) => {
    if (pdfjsInstance?.GlobalWorkerOptions) {
      pdfjsInstance.GlobalWorkerOptions.workerSrc = workerSrc;
    }
  };
  
  // Try to configure if pdfjs-dist is already available
  if ((window as any).pdfjs?.GlobalWorkerOptions) {
    configureWorker((window as any).pdfjs);
  }
  
  // Export configuration function
  (window as any).__configurePDFJSWorker = configureWorker;
}

export const getWorkerSrc = () => {
  if (typeof window === "undefined") return "/pdf.worker.min.mjs";
  return (window as any).__PDFJS_WORKER_SRC__ || 
    new URL("/pdf.worker.min.mjs", window.location.origin).href;
};

