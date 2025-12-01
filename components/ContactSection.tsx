"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="section-premium-content container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's connect and build something amazing together"
          className="mb-8 sm:mb-12 md:mb-16"
        />
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

