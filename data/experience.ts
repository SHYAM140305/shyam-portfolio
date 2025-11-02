export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
  achievements?: string[];
}

export const experiences: Experience[] = [
  {
    id: "cmrl-intern",
    role: "Student Intern",
    company: "Chennai Metro Rail Limited (CMRL)",
    location: "Chennai, India",
    type: "Internship",
    startDate: "Dec 2024",
    endDate: "Present",
    current: true,
    description: "AI-Driven Troubleshooting System",
    highlights: [
      "Extracted fault codes from PDF manuals using NLP (95% accuracy)",
      "Implemented FAISS semantic search with Gemma 2B LLM for contextual analysis",
      "Developed Streamlit UI serving 50+ daily users",
    ],
  },
  {
    id: "sentient-coordinator",
    role: "Student Coordinator (HR / Administrative Coordinator)",
    company: "Sentient Scripts",
    location: "Remote",
    type: "Coordinator",
    startDate: "Jun 2024",
    endDate: "Jun 2025",
    current: false,
    description: "University Collaboration Initiative",
    highlights: [
      "Primary POC between Sentient Scripts and SRM University for projects and communication",
      "Consolidated student profiles, scheduled interviews, and coordinated shortlisting",
      "Managed student engagement ensuring timely progress and deliverables",
    ],
  },
  {
    id: "sentient-intern",
    role: "Student Intern (AI/ML Engineer)",
    company: "Sentient Scripts",
    location: "Remote",
    type: "Internship",
    startDate: "Apr 2024",
    endDate: "Oct 2024",
    current: false,
    description: "Weather Chatbot with RAG",
    highlights: [
      "Developed Retrieval-Augmented Generation chatbot (89% user satisfaction)",
      "Integrated OpenWeatherMap API with LLMs reducing latency by 45%",
      "Built Streamlit dashboard increasing engagement by 25%",
    ],
  },
  {
    id: "renault-intern",
    role: "Student Intern (AI/ML Engineer)",
    company: "Renault Nissan Automotive India Pvt. Ltd.",
    location: "Chennai, India",
    type: "Internship",
    startDate: "Apr 2024",
    endDate: "Oct 2024",
    current: false,
    description: "Heavy Repair Management System",
    highlights: [
      "Implemented role-based access supporting 200+ users",
      "Improved workshop efficiency by 28% and reduced repair time by 22%",
    ],
  },
];

