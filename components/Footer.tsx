"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/SHYAM140305",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shyam-jayakanthan-050a85284",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:jshyam2005@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-muted/50 to-background overflow-hidden backdrop-blur-sm">
      {/* Background decoration - Reduced animations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl" />
      
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c02_1px,transparent_1px),linear-gradient(to_bottom,#fb923c02_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground text-center md:text-left"
          >
            © {new Date().getFullYear()} <span className="font-semibold gradient-text inline-block pb-0.5">Shyam J</span>. All rights reserved.
          </motion.div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              const colors = [
                "from-amber-500 to-orange-500",
                "from-orange-500 to-amber-500",
                "from-amber-600 to-orange-500",
              ];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${colors[index]} p-0.5 shadow-lg hover:shadow-xl hover:shadow-amber-500/8 transition-all overflow-hidden touch-manipulation`}
                  aria-label={link.name}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:bg-transparent transition-colors">
                    <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors relative z-10" />
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.a>
              );
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-amber-500/12 overflow-hidden border border-amber-400/15 touch-manipulation"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

