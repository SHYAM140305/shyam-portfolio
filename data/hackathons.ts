export interface Hackathon {
  id: string;
  name: string;
  year: string;
  achievement: string;
  description: string;
  logo?: string;
}

const SRM_LOGO = "/srm-logo.png";
const TOYOTA_LOGO = "https://logo.clearbit.com/toyota.com";

export const hackathons: Hackathon[] = [
  {
    id: "hackstreet-3",
    name: "Hackstreet 3.0",
    year: "2025",
    achievement: "1st Place",
    description: "Real-time AI automation solution with vision analytics",
    logo: SRM_LOGO,
  },
  {
    id: "appathon-2",
    name: "Appathon 2.0",
    year: "2025",
    achievement: "Winner",
    description: "AI-driven productivity app (150+ teams)",
    logo: SRM_LOGO,
  },
  {
    id: "tamizh-athon",
    name: "Tamizh-A-THON 1.0",
    year: "2025",
    achievement: "Winner",
    description: "Tamil OCR and NLP innovation under SRM TCC",
    logo: SRM_LOGO,
  },
  {
    id: "hackcelrate-2025",
    name: "Hackcelrate 2025",
    year: "2025",
    achievement: "Finalist",
    description: "Toyota Hackcelrate 2025 Finalist",
    logo: TOYOTA_LOGO,
  },
];

