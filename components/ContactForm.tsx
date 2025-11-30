"use client";

import { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string(),
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
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
      
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
          _template: "box",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || "Form submission failed");
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="relative rounded-xl bg-card border border-border/50 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <motion.input
              id="name"
              {...register("name")}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-foreground focus:outline-none transition-all duration-200 placeholder:text-muted-foreground min-h-[44px] text-foreground"
              placeholder="Your name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <motion.input
              id="email"
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-foreground focus:outline-none transition-all duration-200 placeholder:text-muted-foreground min-h-[44px] text-foreground"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <motion.textarea
              id="message"
              {...register("message")}
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-foreground focus:outline-none transition-all duration-200 placeholder:text-muted-foreground resize-none text-foreground"
              placeholder="Your message..."
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                {errors.message.message}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3.5 rounded-lg bg-foreground text-background font-medium text-base hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
});

