import { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "React.js", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "RESTful APIs", category: "Backend" },
  { name: "Python", category: "Backend" },

  // Languages
  { name: "Python", category: "Languages", icon: "🐍" },
  { name: "C", category: "Languages" },
  { name: "Java", category: "Languages" },

  // ML/AI
  { name: "PyTorch", category: "ML/AI" },
  { name: "TensorFlow", category: "ML/AI" },
  { name: "Keras", category: "ML/AI" },
  { name: "HuggingFace", category: "ML/AI" },
  { name: "FAISS", category: "ML/AI" },
  { name: "LLMs", category: "ML/AI" },
  { name: "RAG", category: "ML/AI" },

  // Data Processing
  { name: "Pandas", category: "Data Processing" },
  { name: "NumPy", category: "Data Processing" },
  { name: "Scikit-learn", category: "Data Processing" },
  { name: "OpenCV", category: "Data Processing" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud & DevOps" },
  { name: "Docker", category: "Cloud & DevOps" },
  { name: "Git", category: "Cloud & DevOps" },
  { name: "GitHub", category: "Cloud & DevOps" },
  { name: "CI/CD", category: "Cloud & DevOps" },

  // Databases
  { name: "MongoDB", category: "Databases" },
  { name: "SQLite", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "PostgreSQL", category: "Databases" },

  // Tools
  { name: "Power BI", category: "Tools" },
  { name: "AutoCAD", category: "Tools" },
  { name: "Canva", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Streamlit", category: "Tools" },
];

