export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade?: string;
  coursework?: string[];
  highlights?: string[];
}

export const education: Education[] = [
  {
    id: "btech",
    degree: "BTech in Artificial Intelligence",
    institution: "SRM Institute of Science and Technology",
    location: "Kattankulathur, India",
    startDate: "Jun 2022",
    endDate: "May 2026",
    current: true,
    grade: "CGPA: 7.5/10.0",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Reinforcement Learning",
      "Cloud Computing",
    ],
  },
  {
    id: "grade-12",
    degree: "Grade 10 and Grade 12",
    institution: "St. Michael Academy",
    location: "Chennai, India",
    startDate: "2018",
    endDate: "2020",
    current: false,
    grade: "Grade 10: 74%, Grade 12: 64%",
  },
];

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  category: "Professional" | "Online";
}

export const certifications: Certification[] = [
  {
    id: "genai-pro",
    name: "Generative AI Professional",
    issuer: "2024",
    year: "2024",
    category: "Professional",
  },
  {
    id: "genai-oci",
    name: "Oracle Cloud Infrastructure GenAI",
    issuer: "Oracle",
    year: "2024",
    category: "Professional",
  },
  {
    id: "ml-stanford",
    name: "Machine Learning",
    issuer: "Stanford",
    year: "2024",
    category: "Online",
  },
  {
    id: "dl-ng",
    name: "Deep Learning",
    issuer: "Andrew Ng",
    year: "2024",
    category: "Online",
  },
  {
    id: "python-ibm",
    name: "Python for Data Science",
    issuer: "IBM",
    year: "2024",
    category: "Online",
  },
  {
    id: "react-meta",
    name: "React.js Fundamentals",
    issuer: "Meta",
    year: "2024",
    category: "Online",
  },
];

