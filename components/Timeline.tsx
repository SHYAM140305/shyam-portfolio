"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { Experience } from "@/data/experience";
import { Education } from "@/data/education";
import { Leadership } from "@/data/leadership";

interface TimelineItemProps {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
  type?: string;
  hideDates?: boolean;
  itemId?: string;
  itemType?: 'experience' | 'education' | 'leadership';
}

const TimelineItem = memo(function TimelineItem({
  title,
  organization,
  location,
  startDate,
  endDate,
  current,
  description,
  highlights,
  type,
  hideDates = false,
  itemId,
  itemType,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative pl-6 sm:pl-10 pb-8 sm:pb-12 border-l-2 border-border/50 last:border-l-0 last:pb-0 group"
      data-experience-id={itemType === 'experience' && itemId ? itemId : undefined}
      data-education-id={itemType === 'education' && itemId ? itemId : undefined}
    >
      {/* Animated timeline dot */}
      <motion.div
        className="absolute left-0 top-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 border-2 sm:border-4 border-background -translate-x-[10px] sm:-translate-x-[13px] shadow-lg group-hover:scale-125 transition-transform z-10"
        whileHover={{ scale: 1.3 }}
      />
      
      {/* Subtle indicator for current items - No infinite animation */}
      {current && (
        <div className="absolute left-0 top-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/40 -translate-x-[10px] sm:-translate-x-[13px] ring-2 ring-primary/20" />
      )}
      
      <motion.div
        whileHover={{ scale: 1.02, x: 5, y: -2 }}
        className="relative bg-gradient-to-br from-card/95 to-card/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border/50 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-md overflow-hidden card-shadow-hover"
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-orange-500/0 to-amber-600/0 group-hover:from-amber-500/2 group-hover:via-orange-500/2 group-hover:to-amber-600/2 transition-all duration-500" />
        
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/2 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/2 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors break-words">
                {title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-amber-500/80 to-orange-500/80 bg-clip-text text-transparent break-words">
                {organization}
              </p>
            </div>
            {!hideDates && (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border/30 dark:border-border/20 flex-shrink-0">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">
                  {startDate} - {current ? (
                    <span className="text-primary font-semibold">Present</span>
                  ) : endDate}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/20 dark:bg-muted/15 border border-border/20 dark:border-border/15">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground font-medium">{location}</span>
            </div>
            {type && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/8 dark:bg-primary/5 border border-primary/15 dark:border-primary/10">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">{type}</span>
              </div>
            )}
          </div>

          {description && (
            <p className="text-base text-muted-foreground mb-5 font-medium px-4 py-2 rounded-lg bg-muted/20 dark:bg-muted/15 border-l-4 border-primary/50 dark:border-primary/30">
              {description}
            </p>
          )}

          {highlights && highlights.length > 0 && (
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-sm md:text-base"
                >
                  <motion.div
                    className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-amber-500/60 to-orange-500/60 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

type TimelineItemType = Experience | Education | Leadership;

interface TimelineProps {
  items: TimelineItemType[];
}

function isExperience(item: TimelineItemType): item is Experience {
  return "role" in item && "company" in item;
}

function isEducation(item: TimelineItemType): item is Education {
  return "degree" in item && "institution" in item;
}

function isLeadership(item: TimelineItemType): item is Leadership {
  return "role" in item && "organization" in item && !("company" in item);
}

export const Timeline = memo(function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-0">
      {items.map((item) => {
        if (isExperience(item)) {
          return (
            <TimelineItem
              key={item.id}
              title={item.role}
              organization={item.company}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              current={item.current}
              description={item.description}
              highlights={item.highlights}
              type={item.type}
              itemId={item.id}
              itemType="experience"
            />
          );
        } else if (isEducation(item)) {
          return (
            <TimelineItem
              key={item.id}
              title={item.degree}
              organization={item.institution}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              current={item.current}
              highlights={item.highlights}
              type="Education"
              hideDates={true}
              itemId={item.id}
              itemType="education"
            />
          );
        } else if (isLeadership(item)) {
          return (
            <TimelineItem
              key={item.id}
              title={item.role}
              organization={item.organization}
              location={item.location || "Remote"}
              startDate={item.startDate}
              endDate={item.endDate}
              current={item.current}
              description={item.description}
              highlights={item.highlights}
              itemId={item.id}
              itemType="leadership"
            />
          );
        }
        return null;
      })}
    </div>
  );
});

