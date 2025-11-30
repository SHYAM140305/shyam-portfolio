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
    id: "linucare-firmware",
    role: "Embedded Firmware Engineer",
    company: "Linucare / Protechme",
    location: "Denmark (Remote)",
    type: "Full-time",
    startDate: "May 2025",
    endDate: "Present",
    current: true,
    description: "Working on embedded firmware for low-power connected devices",
    highlights: [
      "Developing ESP32-based firmware modules, including device communication logic and peripheral management",
      "Optimising system power consumption through efficient task scheduling and hardware-level configuration",
      "Enhancing device performance by improving signal acquisition, data handling, and system responsiveness",
      "Conducting power profiling across device states and contributing to core firmware documentation and architecture decisions",
    ],
  },
  {
    id: "sentient-coordinator",
    role: "Student Coordinator / HR Lead",
    company: "Sentient Scripts Pvt. Ltd.",
    location: "Remote",
    type: "Coordinator",
    startDate: "Jun 2024",
    endDate: "Jun 2025",
    current: false,
    description: "Primary point-of-contact for SRM University partnership",
    highlights: [
      "Led student recruitment, shortlisting, assessment coordination, and onboarding for multiple project cohorts",
      "Managed documentation and communication for 100+ candidates",
      "Technical Work: Developed a Generative-AI humorous weather chatbot with full-stack deployment",
    ],
  },
  {
    id: "tata-steel-intern",
    role: "AI/ML Intern",
    company: "Tata Steel",
    location: "Remote",
    type: "Internship",
    startDate: "Jan 2025",
    endDate: "Jun 2025",
    current: false,
    description: "Guided by Dhilip Kumar R",
    highlights: [
      "Implemented computer-vision pipelines for steel bar ring/rib analysis",
      "Automated dimensional measurement using CNN-based feature extraction",
    ],
  },
  {
    id: "cmrl-intern",
    role: "AI Intern",
    company: "Chennai Metro Rail Limited (CMRL)",
    location: "Hybrid",
    type: "Internship",
    startDate: "Dec 2024",
    endDate: "Apr 2025",
    current: false,
    description: "In collaboration with Mr. Ganavel, Cooling Lab",
    highlights: [
      "Built predictive maintenance and fault-detection ML models",
      "Delivered a troubleshooting tool",
    ],
  },
  {
    id: "mercedes-intern",
    role: "AI/ML Intern",
    company: "Mercedes-Benz MBition",
    location: "Berlin (Remote)",
    type: "Internship",
    startDate: "Nov 2024",
    endDate: "Apr 2025",
    current: false,
    description: "Guided by Mr. Karthik VJ",
    highlights: [
      "Contributed to digital-twin optimisation for NVIDIA Parker hardware",
      "Supported AI-driven improvements to simulation performance",
    ],
  },
  {
    id: "renault-intern",
    role: "AI/ML Intern",
    company: "Renault Nissan Automotive India Pvt. Ltd. (RNAIPL)",
    location: "Hybrid",
    type: "Internship",
    startDate: "Apr 2024",
    endDate: "Oct 2024",
    current: false,
    description: "Guided by Mr. Harishankar Girirajan",
    highlights: [
      "Delivered supply-chain dashboards in Power BI and automated reporting workflows using UiPath and Power Automate",
      "Developed analytics pipelines for Milkrun route optimisation, reducing routing delays and enhancing operational efficiency",
    ],
  },
  {
    id: "sentient-intern",
    role: "AI Intern",
    company: "Sentient Scripts Pvt. Ltd.",
    location: "Remote",
    type: "Internship",
    startDate: "Apr 2024",
    endDate: "Oct 2024",
    current: false,
    description: "Weather Chatbot with RAG",
    highlights: [
      "Built a Retrieval-Augmented-Generation (RAG) humorous Weather Chatbot achieving 89% user satisfaction",
      "Developed a Streamlit dashboard for monitoring user interactions",
    ],
  },
];

