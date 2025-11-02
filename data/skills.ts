import { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", icon: "🐍" },
  { name: "C", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "Dart", category: "Languages" },

  // Frontend
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js 14", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "RESTful APIs", category: "Backend" },

  // ML/AI
  { name: "Digital Twin", category: "ML/AI", icon: "🔮" },
  { name: "PyTorch", category: "ML/AI" },
  { name: "TensorFlow", category: "ML/AI" },
  { name: "Keras", category: "ML/AI" },
  { name: "RAPIDS (cuDF/cuML)", category: "ML/AI" },
  { name: "Scikit-learn", category: "ML/AI" },
  { name: "Hugging Face", category: "ML/AI" },
  { name: "FAISS", category: "ML/AI" },
  { name: "OpenCV", category: "ML/AI" },
  { name: "NLTK", category: "ML/AI" },

  // Data Processing
  { name: "Pandas", category: "Data Processing" },
  { name: "NumPy", category: "Data Processing" },
  { name: "Matplotlib", category: "Data Processing" },
  { name: "Seaborn", category: "Data Processing" },
  { name: "SPSS", category: "Data Processing" },
  { name: "Statistical Analysis", category: "Data Processing" },
  { name: "Hypothesis Testing", category: "Data Processing" },
  { name: "RAPIDS cuML", category: "Data Processing" },
  { name: "Power BI", category: "Data Processing" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud & DevOps" },
  { name: "Oracle Cloud", category: "Cloud & DevOps" },
  { name: "Docker", category: "Cloud & DevOps" },
  { name: "Git", category: "Cloud & DevOps" },
  { name: "GitHub", category: "Cloud & DevOps" },
  { name: "CI/CD", category: "Cloud & DevOps" },
  { name: "Serverless", category: "Cloud & DevOps" },
  { name: "Streamlit", category: "Cloud & DevOps" },
  { name: "Vercel", category: "Cloud & DevOps" },

  // Databases
  { name: "MongoDB", category: "Databases" },
  { name: "SQLite", category: "Databases" },
  { name: "Redis", category: "Databases" },

  // Tools
  { name: "Jupyter", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "AutoCAD", category: "Tools" },
  { name: "Canva", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "Beautiful Soup", category: "Tools" },
  { name: "PyTesseract", category: "Tools" },
  { name: "Pygame", category: "Tools" },
];

