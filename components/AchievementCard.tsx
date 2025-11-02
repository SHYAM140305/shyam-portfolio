"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star, GraduationCap, Users, FileCheck } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { certifications } from "@/data/education";
import { hackathons } from "@/data/hackathons";
import { leadership } from "@/data/leadership";
import { staggerContainer, fadeInUp } from "@/lib/utils";

const iconMap: Record<string, typeof Award> = {
  certification: FileCheck,
  hackathon: Trophy,
  leadership: Users,
  award: Award,
  star: Star,
};

interface AchievementCardProps {
  type: "certification" | "hackathon" | "leadership";
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
  achievement?: string;
  index: number;
}

export function AchievementCard({
  type,
  title,
  issuer,
  year,
  description,
  achievement,
  index,
}: AchievementCardProps) {
  const Icon = iconMap[type] || Award;
  const colors = {
    certification: "from-blue-500 to-cyan-500",
    hackathon: "from-amber-500 to-orange-500",
    leadership: "from-purple-500 to-pink-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative rounded-xl modern-glass border border-border/40 hover:border-primary/50 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors[type]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[type]} flex items-center justify-center shadow-lg`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          {year && (
            <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              {year}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
        
        {issuer && (
          <p className="text-sm text-muted-foreground mb-2 font-medium line-clamp-1">{issuer}</p>
        )}
        
        {achievement && (
          <p className="text-sm font-semibold gradient-text mb-2">{achievement}</p>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fb923c05_1px,transparent_1px),linear-gradient(to_bottom,#fb923c05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/1 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-500/1 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Certifications */}
        <div className="mb-16 sm:mb-20">
          <SectionTitle
            title="Certifications"
            subtitle="Professional and online credentials"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.id} variants={fadeInUp}>
                <AchievementCard
                  type="certification"
                  title={cert.name}
                  issuer={cert.issuer}
                  year={cert.year}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hackathon Achievements */}
        <div className="mb-16 sm:mb-20">
          <SectionTitle
            title="Hackathon Achievements"
            subtitle="Competitions and recognitions"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {hackathons.map((hackathon, index) => (
              <motion.div key={hackathon.id} variants={fadeInUp}>
                <AchievementCard
                  type="hackathon"
                  title={hackathon.name}
                  year={hackathon.year}
                  achievement={hackathon.achievement}
                  description={hackathon.description}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Leadership */}
        <div>
          <SectionTitle
            title="Leadership Experience"
            subtitle="Leading teams and initiatives"
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {leadership.map((role, index) => (
              <motion.div key={role.id} variants={fadeInUp}>
                <AchievementCard
                  type="leadership"
                  title={role.role}
                  issuer={role.organization}
                  description={role.description}
                  year={`${role.startDate} - ${role.endDate}`}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

