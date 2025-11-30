"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Clean section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3 text-center px-2">
              Get In Touch
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm xs:text-base sm:text-lg text-muted-foreground text-center font-light max-w-2xl mx-auto px-2"
          >
            Let&apos;s connect and build something amazing together
          </motion.p>
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

