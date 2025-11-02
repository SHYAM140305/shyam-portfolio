"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-lg bg-muted hover:bg-accent transition-colors flex items-center justify-center border border-border/50 hover:border-primary/50 shadow-md hover:shadow-lg hover:shadow-amber-500/6 relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/4 to-orange-500/4 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <motion.div
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
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

