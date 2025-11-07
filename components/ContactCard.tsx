"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type BrandKey = "email" | "github" | "linkedin" | "location";

const brandIcons: Record<BrandKey, JSX.Element> = {
  email: (
    <svg viewBox="0 0 40 40" className="h-8 w-8" role="img" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="url(#gmail-bg)" />
      <path
        d="M10 14.5a2.5 2.5 0 0 1 2.5-2.5h15a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 10 25.5v-11Z"
        fill="#fff"
      />
      <path d="M12 13.5 20 20l8-6.5" stroke="#EA4335" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gmail-bg" x1="0" x2="40" y1="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA4335" />
          <stop offset="1" stopColor="#FBBC05" />
        </linearGradient>
      </defs>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 40 40" className="h-8 w-8" role="img" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="url(#github-bg)" />
      <path
        d="M20 10c-5.52 0-10 4.58-10 10.23 0 4.52 2.86 8.36 6.83 9.72.5.1.68-.22.68-.49 0-.24-.01-.89-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.9.84.09-.67.35-1.1.63-1.36-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.71 1.03 1.63 1.03 2.75 0 3.97-2.34 4.83-4.57 5.08.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49 3.97-1.36 6.83-5.2 6.83-9.72C30 14.58 25.52 10 20 10Z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="github-bg" x1="0" x2="36" y1="6" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2D2D" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
      </defs>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 40 40" className="h-8 w-8" role="img" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="url(#linkedin-bg)" />
      <rect x="11" y="16" width="4" height="13" rx="1" fill="#fff" />
      <rect x="11" y="11" width="4" height="4" rx="2" fill="#fff" />
      <path
        d="M19 16h3.6v1.8c.52-1.03 1.88-2.1 3.88-2.1 3.32 0 4.52 2.03 4.52 5.27V29h-4v-6.43c0-1.43-.02-3.27-2-3.27-2 0-2.31 1.56-2.31 3.17V29H19V16Z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="linkedin-bg" x1="0" x2="36" y1="6" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A66C2" />
          <stop offset="1" stopColor="#2A80E0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 40 40" className="h-8 w-8" role="img" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="url(#location-bg)" />
      <path
        d="M20 12a6 6 0 0 0-6 6c0 4.2 5.25 9.84 5.5 10.1a.7.7 0 0 0 1 0C20.75 27.84 26 22.2 26 18a6 6 0 0 0-6-6Zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="location-bg" x1="8" x2="32" y1="8" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  ),
};

export function ContactCard() {
  const contactItems = [
    {
      icon: "email" as const,
      label: "Email",
      value: "jshyam2005@gmail.com",
      href: "mailto:jshyam2005@gmail.com",
      glow: "from-rose-400/50 via-amber-400/50 to-rose-400/50",
    },
    {
      icon: "github" as const,
      label: "GitHub",
      value: "SHYAM140305",
      href: "https://github.com/SHYAM140305",
      glow: "from-zinc-200/40 via-zinc-500/40 to-zinc-200/40",
    },
    {
      icon: "linkedin" as const,
      label: "LinkedIn",
      value: "shyam-jayakanthan",
      href: "https://linkedin.com/in/shyam-jayakanthan-050a85284",
      glow: "from-blue-200/50 via-sky-300/50 to-blue-200/50",
    },
    {
      icon: "location" as const,
      label: "Location",
      value: "Chennai, India",
      href: null,
      glow: "from-emerald-200/40 via-teal-200/40 to-emerald-200/40",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className="relative rounded-2xl modern-glass-strong border border-border/40 p-8 shadow-xl backdrop-blur-xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
        
        <div className="relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold gradient-text mb-6 text-center"
          >
            Get In Touch
          </motion.h3>

          <div className="space-y-4">
            {contactItems.map((item, index) => {
              const iconGraphic = brandIcons[item.icon];
              const content = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl modern-glass border border-border/30 hover:border-primary/40 transition-all duration-300 ${
                    item.href ? "cursor-pointer group" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-br ${item.glow}`}
                    />
                    <div className="relative w-12 h-12 rounded-xl bg-white/95 dark:bg-zinc-900/70 border border-border/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
                      {iconGraphic}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );

              return item.href ? (
                <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </Link>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Always open to collaboration and new opportunities
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

