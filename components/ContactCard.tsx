"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Copy, Check, Download } from "lucide-react";
import { useState } from "react";

export function ContactCard() {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "jshyam2005@gmail.com";

  // vCard download link
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION=3.0",
    "N:Jayakanthan;Shyam;;;",
    "FN:Shyam Jayakanthan",
    "ORG:SRMIST",
    "TITLE:AI/ML Engineer;Full Stack Developer",
    "EMAIL;TYPE=INTERNET;TYPE=WORK:jshyam2005@gmail.com",
    "TEL;TYPE=CELL:+91 7395980045",
    "URL:https://shyamj.vercel.app",
    "ADR;TYPE=WORK:;;Chennai;Tamil Nadu;;India",
    "PHOTO;VALUE=URI:https://github.com/SHYAM140305.png",
    "END:VCARD",
  ].join("\r\n");
  const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const buttons = [
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/SHYAM140305",
      color: "from-zinc-600 to-zinc-800",
      hoverColor: "hover:from-zinc-700 hover:to-zinc-900",
      glow: "from-zinc-400/50 via-zinc-500/50 to-zinc-400/50",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/shyam-jayakanthan-050a85284",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
      glow: "from-blue-400/50 via-blue-500/50 to-blue-400/50",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:${email}`,
      color: "from-rose-500 to-rose-600",
      hoverColor: "hover:from-rose-600 hover:to-rose-700",
      glow: "from-rose-400/50 via-rose-500/50 to-rose-400/50",
    },
    {
      label: emailCopied ? "Copied!" : "Copy Email",
      icon: emailCopied ? Check : Copy,
      href: null,
      onClick: handleCopyEmail,
      color: "from-amber-500 to-orange-600",
      hoverColor: "hover:from-amber-600 hover:to-orange-700",
      glow: "from-amber-400/50 via-orange-500/50 to-amber-400/50",
      getLabelMobile: () => emailCopied ? "Copied!" : "Copy",
    },
    {
      label: "vCard",
      icon: Download,
      href: vcardHref,
      download: "Shyam_Jayakanthan.vcf",
      color: "from-zinc-800 to-zinc-900",
      hoverColor: "hover:from-zinc-900 hover:to-black",
      glow: "from-zinc-400/50 via-zinc-500/50 to-zinc-400/50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
    >
      <div className="relative rounded-2xl modern-glass-strong border border-border/40 p-4 sm:p-5 md:p-6 shadow-xl backdrop-blur-xl w-full">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
        
        <div className="relative z-10 flex flex-col justify-center min-h-[140px] sm:min-h-[160px] md:min-h-[170px]">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold gradient-text mb-1.5 text-center"
          >
            Let&apos;s Collaborate
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5"
          >
            Connect with me on these platforms
          </motion.p>

          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-2 sm:gap-2.5 md:gap-3 w-full">
            {buttons.map((button, index) => {
              const Icon = button.icon;
              const buttonContent = (
                <>
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br ${button.glow}`}
                  />
                  
                  <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 w-full">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs whitespace-nowrap">
                      <span className="sm:hidden">{((button as any).getLabelMobile ? (button as any).getLabelMobile() : button.label)}</span>
                      <span className="hidden sm:inline">{button.label}</span>
                    </span>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </>
              );

              const motionProps = {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1 },
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                className: `group relative flex items-center justify-center gap-1.5 sm:gap-2 flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 py-2.5 sm:py-3 rounded-lg bg-gradient-to-br ${button.color} ${button.hoverColor} text-white font-semibold text-xs shadow-lg transition-all duration-300 overflow-hidden border border-white/10`,
              };

              return button.href ? (
                <Link
                  key={button.label}
                  href={button.href}
                  target={button.href.startsWith('data:') ? undefined : "_blank"}
                  rel={button.href.startsWith('data:') ? undefined : "noopener noreferrer"}
                  download={(button as any).download}
                  className="flex-1"
                >
                  <motion.div {...motionProps}>
                    {buttonContent}
                  </motion.div>
                </Link>
              ) : (
                <motion.button
                  key={button.label}
                  {...motionProps}
                  onClick={button.onClick}
                  type="button"
                >
                  {buttonContent}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

