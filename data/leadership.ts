export interface Leadership {
  id: string;
  role: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export const leadership: Leadership[] = [
  {
    id: "president-nextgen",
    role: "President",
    organization: "NEXT GEN AI, SRMIST KTR",
    startDate: "2025",
    endDate: "Present",
    current: true,
    description: "Directing organization strategy and fostering industry partnerships",
    highlights: [
      "Directing the organization's overall strategy, overseeing 400+ members and fostering key industry partnerships",
    ],
  },
  {
    id: "vp-nextgen",
    role: "Vice President",
    organization: "NEXT GEN AI, SRMIST KTR",
    startDate: "2024",
    endDate: "2025",
    current: false,
    description: "Led organization growth and event management",
    highlights: [
      "Led 350+ members, organized 5 events, managed a Rs. 1,00,000 budget, and drove a 40% membership growth",
    ],
  },
  {
    id: "tech-lead",
    role: "Technical Lead",
    organization: "AI Research Group",
    startDate: "2023",
    endDate: "2024",
    current: false,
    description: "Led AI solutions development and hackathons",
    highlights: [
      "Led a team of 8 researchers in AI solutions development and coordinated with industry partners on hackathons with 350+ participants",
    ],
  },
  {
    id: "research-member",
    role: "Research Member",
    organization: "Cintel Students Association, SRMIST KTR",
    startDate: "2023",
    endDate: "2024",
    current: false,
    description: "Researched emerging AI technologies and mentored students",
    highlights: [
      "Researched emerging AI technologies, conducted technical workshops, and mentored students",
    ],
  },
];

