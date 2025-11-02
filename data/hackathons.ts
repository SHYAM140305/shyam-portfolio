export interface Hackathon {
  id: string;
  name: string;
  year: string;
  achievement: string;
  description: string;
}

export const hackathons: Hackathon[] = [
  {
    id: "hackstreet-3",
    name: "Hackstreet 3.0",
    year: "2025",
    achievement: "1st Place",
    description: "Real-time AI automation solution with vision analytics",
  },
  {
    id: "appathon-2",
    name: "Appathon 2.0",
    year: "2025",
    achievement: "Winner",
    description: "AI-driven productivity app (150+ teams)",
  },
  {
    id: "tamizh-athon",
    name: "Tamizh-A-THON 1.0",
    year: "2025",
    achievement: "Winner",
    description: "Tamil OCR and NLP innovation under SRM TCC",
  },
];

