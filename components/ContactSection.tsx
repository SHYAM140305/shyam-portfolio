"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";
import { Clock, FileText } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's connect and build something amazing together"
          className="mb-8 sm:mb-12 md:mb-16"
        />
        
        {/* Timezone and Reply Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 flex-1">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Timezone:</span> IST (UTC+5:30)
                </span>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  I will respond to your inquiry within 24 hours
                </span>
              </div>
            </div>
            <motion.a
              href="/resume?from=contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/50 hover:bg-primary/15 transition-all duration-200 group"
            >
              <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-primary">View Resume</span>
            </motion.a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto items-start">
          <div className="w-full order-2 lg:order-1">
            <ContactForm />
          </div>
          <div className="flex items-start justify-start w-full order-1 lg:order-2">
            <ContactCard />
          </div>
        </div>
      </div>
    </section>
  );
}

