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
    "VERSION:3.0",
    "N:J;Shyam;;;",
    "FN:Shyam J",
    "ORG:AI/ML Engineer",
    "TITLE:AI/ML Engineer & Research-driven developer",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div className="relative rounded-xl bg-card border border-border/50 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 shadow-sm">
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2"
          >
            Let&apos;s Collaborate
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6"
          >
            Connect with me on these platforms
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {buttons.map((button, index) => {
              const Icon = button.icon;
              
              const motionProps = {
                initial: { opacity: 0, y: 10 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.05 },
                whileHover: { y: -2 },
                whileTap: { scale: 0.98 },
                className: "group relative flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-lg bg-muted/30 border border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-200",
              };

              const buttonContent = (
                <>
                  <Icon className="h-5 w-5 text-foreground" />
                  <span className="text-xs font-medium text-foreground text-center">
                    <span className="sm:hidden">{((button as any).getLabelMobile ? (button as any).getLabelMobile() : button.label)}</span>
                    <span className="hidden sm:inline">{button.label}</span>
                  </span>
                </>
              );

              return button.href ? (
                <Link
                  key={button.label}
                  href={button.href}
                  target={button.href.startsWith('data:') ? undefined : "_blank"}
                  rel={button.href.startsWith('data:') ? undefined : "noopener noreferrer"}
                  download={(button as any).download}
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

