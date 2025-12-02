"use client";

import { useEffect } from "react";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide navbar and footer on resume page
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      // Restore navbar and footer when leaving resume page
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  return <>{children}</>;
}

