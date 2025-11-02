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
      "Engineered system extracting fault codes from PDF manuals using NLP, achieving 95% accuracy and reducing troubleshooting time by 40%",
      "Implemented semantic search via FAISS and HuggingFace, integrating Gemma 2B LLM for accurate responses",
      "Built Streamlit UI serving 50+ daily users with dynamic abbreviation mapping",
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
      "Acted as the primary Point of Contact (POC) between Sentient Scripts and SRM University for project coordination and communication",
      "Consolidated student profiles, scheduled interviews, and coordinated candidate shortlisting for corporate collaborations",
      "Managed student engagement throughout project duration, ensuring timely progress and quality deliverables",
      "Assisted the Sentient Scripts team during university visits, facilitating discussions and addressing project requirements",
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
      "Developed Generative AI chatbot using Retrieval-Augmented Generation, achieving 89% user satisfaction and 60% engagement improvement",
      "Integrated LLMs with OpenWeatherMap API, reducing response time by 45% and handling 1000+ daily requests",
      "Implemented Streamlit interface and analytics dashboard, resulting in 25% increase in daily active users",
    ],
  },
  {
    id: "renault-intern",
    role: "Student Intern (AI/ML Engineer)",
    company: "Renault Nissan Automotive India Private Limited",
    location: "Chennai, India",
    type: "Internship",
    startDate: "Apr 2024",
    endDate: "Oct 2024",
    current: false,
    description: "Heavy Repair Management System",
    highlights: [
      "Implemented secure role-based access system supporting 200+ concurrent users",
      "Developed workshop management features improving efficiency by 28% and mechanic performance tracking reducing repair time by 22%",
      "Created RESTful APIs and comprehensive reporting dashboard for performance monitoring",
    ],
  },
];

