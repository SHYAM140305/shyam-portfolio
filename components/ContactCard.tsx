"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";

export function ContactCard() {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "jshyam2005@gmail.com",
      href: "mailto:jshyam2005@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "SHYAM140305",
      href: "https://github.com/SHYAM140305",
      color: "from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "shyam-jayakanthan",
      href: "https://linkedin.com/in/shyam-jayakanthan-050a85284",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      href: null,
      color: "from-green-500 to-emerald-500",
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
              const Icon = item.icon;
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
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
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

