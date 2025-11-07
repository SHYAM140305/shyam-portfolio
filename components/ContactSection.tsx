"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration - Reduced animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/1 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let&apos;s connect and build something amazing together"
          className="mb-8 sm:mb-10 text-center"
        />
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          <ContactCard />
          <div className="md:col-span-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

