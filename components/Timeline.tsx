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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pl-6 sm:pl-8 md:pl-10 lg:pl-12 pb-10 sm:pb-12 md:pb-14 lg:pb-16 last:pb-0 group"
      data-experience-id={itemType === 'experience' && itemId ? itemId : undefined}
      data-education-id={itemType === 'education' && itemId ? itemId : undefined}
    >
      {/* Premium Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px timeline-line opacity-80" />
      
      {/* Premium Timeline Dot */}
      <div className="absolute left-0 top-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full -translate-x-[6px] sm:-translate-x-[7px] md:-translate-x-[8px] timeline-dot z-10" />
      
      {/* Current Role Indicator */}
      {current && (
        <div className="absolute left-0 top-0 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-full -translate-x-[6px] sm:-translate-x-[7px] md:-translate-x-[8px] timeline-dot timeline-dot-current z-10" />
      )}
      
      {/* Apple-style Card */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 timeline-card"
      >
        <div className="relative z-10">
          {/* Header Section - Clean */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-1 sm:mb-2 text-foreground break-words text-gradient-professional">
                {title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-primary break-words">
                {organization}
              </p>
            </div>
            {!hideDates && (
              <div className="meta-pill flex-shrink-0 border-amber-500/40 bg-amber-500/8">
                <Calendar className="h-3.5 w-3.5 meta-pill-icon text-primary" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {startDate} - {current ? (
                    <span className="font-semibold">Present</span>
                  ) : endDate}
                </span>
              </div>
            )}
          </div>

          {/* Meta Information - Minimal */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <div className="meta-pill">
              <MapPin className="h-3.5 w-3.5 meta-pill-icon flex-shrink-0 text-primary" />
              <span className="text-sm font-medium break-words">{location}</span>
            </div>
            {type && (
              <div className="meta-pill">
                <Briefcase className="h-3.5 w-3.5 meta-pill-icon flex-shrink-0 text-primary" />
                <span className="text-sm font-medium break-words">{type}</span>
              </div>
            )}
            {current && (
              <div className="meta-pill border-amber-500/40 bg-amber-500/8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Current
                </span>
              </div>
            )}
          </div>

          {/* Description - Clean */}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* Highlights - Minimal */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Key Achievements
              </h4>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 text-sm sm:text-base"
                  >
                    <div className="golden-dot mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed flex-1">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
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

