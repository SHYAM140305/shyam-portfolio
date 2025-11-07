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
  logoLight?: string;
  logoDark?: string;
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
      "Directed organizational strategy for 400+ members and industry partnerships",
    ],
    logoLight: "/Nextgenai-light.png",
    logoDark: "/Nextgenai-dark.png",
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
      "Led 350+ members, organized 5 events, and managed ₹1,00,000 budget",
    ],
    logoLight: "/Nextgenai-light.png",
    logoDark: "/Nextgenai-dark.png",
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
      "Supervised team of 8 researchers and coordinated industry hackathons",
    ],
    logoLight: "/srm-logo.png",
    logoDark: "/srm-logo.png",
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
      "Conducted AI research and mentored students on emerging technologies",
    ],
    logoLight: "/srm-logo.png",
    logoDark: "/srm-logo.png",
  },
];

