"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration - Reduced animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let&apos;s connect and build something amazing together"
          className="mb-5 sm:mb-6 md:mb-7 text-center"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 sm:gap-6 lg:gap-7 max-w-6xl mx-auto items-start">
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

