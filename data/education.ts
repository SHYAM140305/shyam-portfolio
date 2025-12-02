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
  logo?: string;
  logoLight?: string;
  logoDark?: string;
}

const AWS_LOGO_LIGHT_URL = "/aws-logo-light.svg";
const AWS_LOGO_DARK_URL = "/aws-logo-dark.svg";
const NPTEL_LOGO_URL = "https://logo.clearbit.com/nptel.ac.in";
const HACKERRANK_LOGO_URL = "https://logo.clearbit.com/hackerrank.com";
const ORACLE_LOGO_URL = "https://logo.clearbit.com/oracle.com";
const GOOGLE_LOGO_URL = "https://logo.clearbit.com/google.com";
const INTEL_LOGO_URL = "https://logo.clearbit.com/intel.com";
const TOYOTA_LOGO_URL = "https://logo.clearbit.com/toyota.com";
const SRM_LOGO_URL = "/srm-logo.png";
const SCHOOL_LOGO_URL = "/school.jpg";

export const education: Education[] = [
  {
    id: "btech",
    degree: "BTech in Artificial Intelligence",
    institution: "SRM Institute of Science and Technology",
    location: "Kattankulathur, India",
    startDate: "Jun 2022",
    endDate: "May 2026",
    current: true,
    logo: SRM_LOGO_URL,
    logoLight: SRM_LOGO_URL,
    logoDark: SRM_LOGO_URL,
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
    logo: SCHOOL_LOGO_URL,
    logoLight: SCHOOL_LOGO_URL,
    logoDark: SCHOOL_LOGO_URL,
  },
];

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  category: "Professional" | "Online";
  logo?: string;
  logoLight?: string;
  logoDark?: string;
  certificateUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "appathon-winner",
    name: "Appathon Winner",
    issuer: "SRM",
    year: "2025",
    category: "Professional",
    logoLight: "/Nextgenai-light.png",
    logoDark: "/Nextgenai-dark.png",
    certificateUrl: "/certifications/Appathon winning certificate.pdf",
  },
  {
    id: "aws-cloud-foundations",
    name: "AWS Cloud Foundations",
    issuer: "AWS",
    year: "2024",
    category: "Online",
    logo: AWS_LOGO_LIGHT_URL,
    logoLight: AWS_LOGO_LIGHT_URL,
    logoDark: AWS_LOGO_DARK_URL,
    certificateUrl: "/certifications/AWS Cloud Foundations Certificate.pdf",
  },
  {
    id: "aws-ml-foundations",
    name: "AWS Machine Learning Foundations",
    issuer: "AWS",
    year: "2024",
    category: "Online",
    logo: AWS_LOGO_LIGHT_URL,
    logoLight: AWS_LOGO_LIGHT_URL,
    logoDark: AWS_LOGO_DARK_URL,
    certificateUrl: "/certifications/AWS ML CERTIFICATION.pdf",
  },
  {
    id: "oci-genai",
    name: "Oracle Generative AI Professional",
    issuer: "Oracle",
    year: "2024",
    category: "Professional",
    logo: ORACLE_LOGO_URL,
    logoLight: ORACLE_LOGO_URL,
    logoDark: ORACLE_LOGO_URL,
    certificateUrl: "/certifications/Gen AI oracle.pdf",
  },
  {
    id: "google-aiml-internship",
    name: "Google AI/ML Virtual Internship",
    issuer: "Google",
    year: "2024",
    category: "Professional",
    logo: GOOGLE_LOGO_URL,
    logoLight: GOOGLE_LOGO_URL,
    logoDark: GOOGLE_LOGO_URL,
    certificateUrl: "/certifications/GOOGLE AI ML Virtual internship.pdf",
  },
  {
    id: "hackerrank-sql-advanced",
    name: "SQL Advanced Skill Certification",
    issuer: "HackerRank",
    year: "2024",
    category: "Online",
    logo: HACKERRANK_LOGO_URL,
    logoLight: HACKERRANK_LOGO_URL,
    logoDark: HACKERRANK_LOGO_URL,
    certificateUrl: "/certifications/Hackerrank sql_advanced certificate.pdf",
  },
  {
    id: "hackstreet-winner",
    name: "Hackstreet Winner",
    issuer: "SRM",
    year: "2025",
    category: "Professional",
    logoLight: "/Nextgenai-light.png",
    logoDark: "/Nextgenai-dark.png",
    certificateUrl: "/certifications/Hackstreet winning certificate.pdf",
  },
  {
    id: "intel-unnati-ai-iot",
    name: "Intel Unnati AI & IoT Scholar",
    issuer: "INTEL",
    year: "2024",
    category: "Professional",
    logo: INTEL_LOGO_URL,
    logoLight: INTEL_LOGO_URL,
    logoDark: INTEL_LOGO_URL,
    certificateUrl: "/certifications/Intel Unnati AI-IOT certificate.pdf",
  },
  {
    id: "nptel-java",
    name: "Programming in Java",
    issuer: "NPTEL",
    year: "2023",
    category: "Online",
    logo: NPTEL_LOGO_URL,
    logoLight: NPTEL_LOGO_URL,
    logoDark: NPTEL_LOGO_URL,
    certificateUrl: "/certifications/NPTEL Programming In Java.pdf",
  },
  {
    id: "oci-foundations",
    name: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    year: "2025",
    category: "Professional",
    logo: ORACLE_LOGO_URL,
    logoLight: ORACLE_LOGO_URL,
    logoDark: ORACLE_LOGO_URL,
    certificateUrl: "/certifications/Oracle Cloud Infrastructure.pdf",
  },
  {
    id: "hackcelerate-2025",
    name: "Hackcelrate 2025 Finalist",
    issuer: "Toyota",
    year: "2025",
    category: "Professional",
    logo: TOYOTA_LOGO_URL,
    logoLight: TOYOTA_LOGO_URL,
    logoDark: TOYOTA_LOGO_URL,
    certificateUrl: "/certifications/Shyam j_Hackcelrate2025_Certificate.pdf",
  },
  {
    id: "tamizh-a-thon",
    name: "Tamizh-A-THON 1.0 Winner",
    issuer: "TCC",
    year: "2025",
    category: "Professional",
    logo: SRM_LOGO_URL,
    logoLight: SRM_LOGO_URL,
    logoDark: SRM_LOGO_URL,
    certificateUrl: "/certifications/Tamizh-A-THON'1.0 winning certificate.pdf",
  },
];

