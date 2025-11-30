const fs = require('fs');
const path = require('path');

// Try to get worker from react-pdf's bundled pdfjs-dist first (correct version)
// Fall back to main pdfjs-dist if react-pdf's version is not available
const reactPdfWorkerPath = path.join(__dirname, '..', 'node_modules', 'react-pdf', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const mainPdfjsWorkerPath = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destination = path.join(__dirname, '..', 'public', 'pdf.worker.min.mjs');

let source = null;

// Prefer react-pdf's bundled version (matches the version react-pdf uses)
if (fs.existsSync(reactPdfWorkerPath)) {
  source = reactPdfWorkerPath;
  console.log('Using worker from react-pdf\'s bundled pdfjs-dist');
} else if (fs.existsSync(mainPdfjsWorkerPath)) {
  source = mainPdfjsWorkerPath;
  console.log('Using worker from main pdfjs-dist (fallback)');
} else {
  console.error('✗ PDF.js worker file not found in either location:');
  console.error('  - react-pdf: ', reactPdfWorkerPath);
  console.error('  - main: ', mainPdfjsWorkerPath);
  process.exit(1);
}

try {
  fs.copyFileSync(source, destination);
  console.log('✓ PDF.js worker file copied to public folder');
} catch (error) {
  console.error('✗ Failed to copy PDF.js worker file:', error.message);
  process.exit(1);
}

