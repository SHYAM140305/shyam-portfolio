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
      color: "from-primary/80 to-onyx",
      hoverColor: "hover:from-primary hover:to-onyx",
      glow: "from-primary/40 via-accent/40 to-primary/40",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/shyam-jayakanthan-050a85284",
      color: "from-accent/80 to-primary/80",
      hoverColor: "hover:from-accent hover:to-primary",
      glow: "from-accent/40 via-primary/40 to-accent/40",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:${email}`,
      color: "from-primary/80 to-accent/80",
      hoverColor: "hover:from-primary hover:to-accent",
      glow: "from-primary/40 via-accent/40 to-primary/40",
    },
    {
      label: emailCopied ? "Copied!" : "Copy Email",
      icon: emailCopied ? Check : Copy,
      href: null,
      onClick: handleCopyEmail,
      color: "from-gold-soft to-gold-bright",
      hoverColor: "hover:from-gold-soft hover:to-gold-bright",
      glow: "from-primary/45 via-accent/45 to-primary/45",
      getLabelMobile: () => emailCopied ? "Copied!" : "Copy",
    },
    {
      label: "vCard",
      icon: Download,
      href: vcardHref,
      download: "Shyam_Jayakanthan.vcf",
      color: "from-onyx to-primary/80",
      hoverColor: "hover:from-onyx hover:to-primary",
      glow: "from-primary/35 via-accent/35 to-primary/35",
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
      <div className="relative rounded-xl bg-card gold-card card-professional border border-border/50 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 shadow-sm contact-card-gold">
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 text-gradient-professional"
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
                className: "group relative flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-lg bg-muted/30 border border-border/50 hover:border-border hover:bg-muted/50 transition-all duration-200 contact-card-button-gold",
              };

              const buttonContent = (
                <>
                  <Icon className="h-5 w-5 contact-card-button-icon" />
                  <span className="text-xs font-medium text-center contact-card-button-label">
                    <span className="sm:hidden">
                      {(button as any).getLabelMobile
                        ? (button as any).getLabelMobile()
                        : button.label}
                    </span>
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

