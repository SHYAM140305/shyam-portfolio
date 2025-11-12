"use client";

import { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { fadeInUp } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = memo(function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(async (data: ContactFormData, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
      
      const response = await fetch("https://formsubmit.co/ajax/jshyam2005@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: "New Contact Form Submission - Portfolio",
          _captcha: "false",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        alert("Request timed out. Please check your connection and try again.");
      } else {
        console.error("Error submitting form:", error);
        alert("Failed to send message. Please try again or contact me directly at jshyam2005@gmail.com");
      }
    }
  }, [reset]);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="relative rounded-2xl modern-glass-strong border border-border/40 hover:border-primary/40 p-4 sm:p-5 md:p-6 shadow-xl overflow-hidden card-shadow card-shadow-hover transition-all duration-300">
        {/* Background decoration - Reduced animations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/1 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/1 rounded-full blur-3xl" />
        
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/2 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/2 to-transparent rounded-tr-full" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-transparent opacity-0 hover:opacity-1 transition-opacity duration-500" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-3.5 sm:space-y-4 md:space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center gap-2">
              Name
            </label>
            <motion.input
              id="name"
              {...register("name")}
              type="text"
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2.5 text-sm rounded-lg modern-glass border border-border/40 focus:border-amber-500 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-amber-500/5 touch-manipulation"
              placeholder="Your name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.name.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
              Email
            </label>
            <motion.input
              id="email"
              {...register("email")}
              type="email"
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2.5 text-sm rounded-lg modern-glass border border-border/40 focus:border-amber-500 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-amber-500/5 touch-manipulation"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-foreground flex items-center gap-2">
              Message
            </label>
            <motion.textarea
              id="message"
              {...register("message")}
              rows={5}
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-background/90 border border-border/50 focus:border-primary focus:outline-none transition-all duration-300 placeholder:text-muted-foreground resize-none shadow-md hover:shadow-lg focus:shadow-xl focus:shadow-orange-500/20 hover:bg-background/95 touch-manipulation"
              placeholder="Your message..."
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                ⚠️ {errors.message.message}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="modern-button group relative w-full px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-amber-500/12 overflow-hidden border border-amber-400/15 touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </>
              )}
            </span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
});

