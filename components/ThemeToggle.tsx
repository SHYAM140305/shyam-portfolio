"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    // Add transitioning class to prevent color transitions
    document.documentElement.classList.add('transitioning');
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // Remove transitioning class after theme change completes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('transitioning');
      });
    });
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-lg bg-muted hover:bg-accent transition-colors flex items-center justify-center border border-border/50 hover:border-primary/50 shadow-md hover:shadow-lg hover:shadow-amber-500/6 relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/4 to-orange-500/4 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-primary" />
        ) : (
          <Moon className="h-5 w-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
}

