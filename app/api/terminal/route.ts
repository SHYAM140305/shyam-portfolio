import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education, certifications } from "@/data/education";
import { leadership } from "@/data/leadership";
import { hackathons } from "@/data/hackathons";

// Lazy initialization to avoid build-time errors when GROQ_API_KEY is not set
function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is not configured");
  }
  return new Groq({ apiKey });
}

// Simple in-memory rate limiting (for production, use Redis or similar)
// Optimized: Clean up old entries periodically to prevent memory leaks
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute
const CLEANUP_INTERVAL = 300000; // 5 minutes

// Cleanup old rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, CLEANUP_INTERVAL);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cache portfolio context (only rebuild if data changes)
let cachedContext: string | null = null;
let contextCacheTime = 0;
const CONTEXT_CACHE_TTL = 3600000; // 1 hour

function getPortfolioContext(): string {
  const now = Date.now();
  if (cachedContext && (now - contextCacheTime) < CONTEXT_CACHE_TTL) {
    return cachedContext;
  }

  // Build canonical facts to avoid conflicting data across sections
  // 1) Canonicalize hackathon dates and create a fast lookup by normalized name
  const normalizeName = (str: string) =>
    str.toLowerCase().replace(/\s+/g, " ").trim();

  const hackathonNameToYear = new Map<string, string>();
  for (const h of hackathons) {
    hackathonNameToYear.set(normalizeName(h.name), h.year);
  }

  // 2) Filter certifications that may duplicate hackathon achievements but with conflicting years
  // We only include certifications that are not hackathon-duplicates or match the canonical year
  const filteredCertifications = certifications.filter((c) => {
    const normalizedCertName = normalizeName(c.name);
    // Heuristics: treat these as hackathon-related certs
    const isHackathonLike =
      /appathon|hackstreet|tamizh-a-thon|tamizh[\s-]*a[\s-]*thon/i.test(c.name);

    if (!isHackathonLike) return true;

    // Try to map to a known hackathon entry by fuzzy containment
    // If any hackathon name is contained in the certification name, use its year
    let canonicalYear: string | null = null;
    for (const [hackName, year] of hackathonNameToYear.entries()) {
      if (
        normalizedCertName.includes(hackName) ||
        hackName.includes(normalizedCertName)
      ) {
        canonicalYear = year;
        break;
      }
    }

    // If we found a canonical year, only include if years match; otherwise drop to avoid confusion
    if (canonicalYear) {
      return c.year === canonicalYear;
    }

    // If we couldn't confidently map, keep it (non-destructive)
    return true;
  });

  // Skills organized by category with proficiency levels from resume
  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  // Add proficiency levels based on resume
  const proficiencyMap: Record<string, string> = {
    "Python": "Advanced",
    "C": "Intermediate",
    "Java": "Basics",
    "TypeScript": "Intermediate",
    "JavaScript": "Intermediate",
    "SQL": "Intermediate",
    "Dart": "Basics",
  };

  const skillsSection = Object.entries(skillsByCategory)
    .map(([cat, items]) => {
      const itemsWithProficiency = items.map(item => {
        const proficiency = proficiencyMap[item];
        return proficiency ? `${item} (${proficiency})` : item;
      });
      return `- ${cat}: ${itemsWithProficiency.join(", ")}`;
    })
    .join("\n");

  // Domains/Areas of Expertise
  const domainsSection = `Domains & Expertise:
Machine Learning, Deep Learning, Generative AI, Computer Vision, NLP, Reinforcement Learning, Digital Twin, Statistical Modeling, Research-driven Development, Cloud Computing, AI-Powered Automation`;

  // Projects with full details
  const projectsSection = projects
    .map((p, index) => {
      const projectNum = index + 1;
      const featured = p.featured ? " (Featured)" : "";
      return `Project ${projectNum}${featured}: ${p.title}
  Description: ${p.longDescription || p.description}
  Short Description: ${p.description}
  Technologies: ${p.technologies.join(", ")}
  ${p.highlights?.length ? `Highlights:\n    ${p.highlights.map(h => `- ${h}`).join("\n    ")}` : ""}
  ${p.githubUrl ? `GitHub: ${p.githubUrl}` : ""}
  ${p.liveUrl ? `Live Demo: ${p.liveUrl}` : ""}`;
    })
    .join("\n\n");

  // Experience with achievements - detailed format
  const experienceSection = experiences
    .map((e, index) => {
      const expNum = index + 1;
      return `Experience ${expNum}: ${e.role}
  Company: ${e.company}
  Location: ${e.location}
  Type: ${e.type}
  Duration: ${e.startDate} to ${e.endDate}${e.current ? " (Current)" : ""}
  Description: ${e.description}
  ${e.highlights?.length ? `Highlights:\n    ${e.highlights.map(h => `- ${h}`).join("\n    ")}` : ""}
  ${e.achievements?.length ? `Achievements:\n    ${e.achievements.map(a => `- ${a}`).join("\n    ")}` : ""}`;
    })
    .join("\n\n");

  // Education with coursework - detailed format
  const educationSection = education
    .map((ed, index) => {
      const eduNum = index + 1;
      return `Education ${eduNum}: ${ed.degree}
  Institution: ${ed.institution}
  Location: ${ed.location}
  Duration: ${ed.startDate} to ${ed.endDate}${ed.current ? " (Current)" : ""}
  ${ed.grade ? `Grade: ${ed.grade}\n` : ""}${ed.coursework?.length ? `Coursework: ${ed.coursework.join(", ")}\n` : ""}${ed.highlights?.length ? `Highlights: ${ed.highlights.join("; ")}` : ""}`;
    })
    .join("\n\n");

  // Leadership roles - detailed format
  const leadershipSection = leadership
    .map((l, index) => {
      const leadNum = index + 1;
      return `Leadership Role ${leadNum}: ${l.role}
  Organization: ${l.organization}
  ${l.location ? `Location: ${l.location}\n` : ""}Duration: ${l.startDate} to ${l.endDate}${l.current ? " (Current)" : ""}
  Description: ${l.description}
  ${l.highlights?.length ? `Highlights:\n    ${l.highlights.map(h => `- ${h}`).join("\n    ")}` : ""}`;
    })
    .join("\n\n");

  // Hackathon achievements - detailed format
  const hackathonsSection = hackathons
    .map((h, index) => {
      const hackNum = index + 1;
      return `Hackathon ${hackNum}: ${h.name}
  Year: ${h.year}
  Achievement: ${h.achievement}
  Description: ${h.description}`;
    })
    .join("\n\n");

  // Certifications - detailed format
  const certificationsSection = filteredCertifications
    .map((c, index) => {
      const certNum = index + 1;
      return `Certification ${certNum}: ${c.name}
  Issuer: ${c.issuer}
  Year: ${c.year}
  Category: ${c.category}`;
    })
    .join("\n\n");

  // Canonical facts for Groq to rely on first (compact, unambiguous)
  const canonicalFacts = `CANONICAL FACTS:
- Hackstreet 3.0 — 2025
- Appathon 2.0 — 2025
- Tamizh-A-THON 1.0 — 2025
(When in doubt, prefer these facts for event years.)`;

  // Professional Summary
  const professionalSummary = `Professional Summary:
Results-driven AI/ML Engineer with expertise in developing end-to-end machine learning systems, generative AI applications, and full-stack solutions. Proven track record in implementing NLP-based troubleshooting systems, RAG-powered chatbots, and computer vision applications.`;

  // Detailed Research Interests
  const researchInterests = `Research Interests:
Agentic AI, Reinforcement Learning, Generative AI, Digital Twins, Industry 4.0, Statistical Modelling, AI-powered Automation, Data Science.`;

  // About Section Details
  const aboutSection = `About Me:
- Professional Description: Passionate AI/ML Engineer & Research-driven developer focused on building real-world AI products. I work across the stack—from data pipelines and model serving to delightful web experiences.
- Tagline: Building intelligent systems that solve real-world problems
- Key Highlights:
  * Leading 400+ members as President of NEXT GEN AI
  * AI research and open-source contributor
  * Mentoring students in AI literacy programs
  * Research on AI-driven fault analysis
- Stats: 6 Projects, 2+ Years Experience, 3 Internships
- Personal Description: Passionate about building intelligent systems with NLP, RAG, and computer vision to translate cutting-edge research into production-ready experiences.`;

  // Personal information with all contact details
  const personalInfo = `Personal Information:
- Name: Shyam J (Shyam Jayakanthan)
- Location: Chennai, Tamil Nadu, India
- Email: jshyam2005@gmail.com
- Phone: +91 7395980045
- Website: shyamj.vercel.app
- GitHub: github.com/SHYAM140305
- LinkedIn: linkedin.com/in/shyam-jayakanthan-050a85284
- Current Role: AI/ML Engineer, Research-driven developer
- Current Position: President, NEXT GEN AI @ SRMIST (400+ members)
- Education: BTech in Artificial Intelligence @ SRM Institute of Science and Technology (2022-2026, Current)
- CGPA: 7.5/10.0
- Research Interests (Portfolio): Agentic AI, Reinforcement Learning, Generative AI, Digital Twins, Industry 4.0, Statistical Modelling, AI-powered Automation, Data Science`;

  cachedContext = `PORTFOLIO CONTEXT - Shyam J's Complete Portfolio

${personalInfo}

${canonicalFacts}

${professionalSummary}

${aboutSection}

${researchInterests}

SKILLS (by category):
${skillsSection}

${domainsSection}

PROJECTS:
${projectsSection}

WORK EXPERIENCE:
${experienceSection}

EDUCATION:
${educationSection}

LEADERSHIP ROLES:
${leadershipSection}

HACKATHON ACHIEVEMENTS:
${hackathonsSection}

CERTIFICATIONS:
${certificationsSection}`;
  contextCacheTime = now;
  
  return cachedContext;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later.", rateLimited: true },
        { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Reason": "local-window" } }
      );
    }

    const { prompt, messages } = await req.json();
    
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { error: "Prompt too long. Maximum 500 characters." },
        { status: 400 }
      );
    }

    // Get cached portfolio context
    const portfolioContext = getPortfolioContext();

    const systemPrompt = `You are an intelligent AI assistant on Shyam J's portfolio website. Your role is to help visitors learn about Shyam's background, projects, skills, experience, achievements, and more.

IMPORTANT GUIDELINES:
1. Answer questions using ONLY the information provided in the PORTFOLIO CONTEXT below.
2. Be conversational, friendly, and helpful - like a knowledgeable friend discussing Shyam's work.
3. If information is not in the context, politely say: "I don't have that specific information in my portfolio yet, but I can tell you about [related topic]."
4. When listing items (projects, skills, etc.), use bullet points for clarity.
5. Always cite specific names, companies, technologies, and achievements from the context.
6. For questions about specific projects, provide details about technologies used, highlights, and GitHub links if available.
7. For experience questions, mention the company, role, duration, and key achievements.
8. For skill questions, organize by category when relevant.
9. For hackathon/certification questions, mention the year, achievement level, and description.
10. Keep responses concise but informative - aim for 2-5 sentences for simple questions, more for detailed queries.
11. If asked about "what can you tell me" or "what do you know", provide a comprehensive overview across all sections.
12. Use natural language - avoid robotic responses.
13. If there is any conflict between dates found in different sections (e.g., hackathons vs certifications) for the same event, ALWAYS prefer the Hackathon Achievements section as the source of truth for event dates.
14. Authoritative dates for events (override any conflicts elsewhere):
   - Appathon 2.0 — 2025
   - Hackstreet 3.0 — 2025
   - Tamizh-A-THON 1.0 — 2025
15. Never guess or infer dates from context fragments; if a date is not present or not in the CANONICAL FACTS, say you don't have that specific information.`;

    // Build conversation history with context
    const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];
    
    // Add system prompts
    chatMessages.push({ role: "system", content: systemPrompt });
    chatMessages.push({ role: "system", content: `PORTFOLIO CONTEXT:\n\n${portfolioContext}` });
    
    // Add conversation history if provided (for context-aware responses)
    if (messages && Array.isArray(messages) && messages.length > 0) {
      // Filter to only include user and assistant messages (skip system messages)
      const conversationHistory = messages.filter(
        (msg: any) => msg.role === "user" || msg.role === "assistant"
      );
      // Keep last 6 messages for context (3 exchanges)
      const recentHistory = conversationHistory.slice(-6);
      chatMessages.push(...recentHistory);
    }
    
    // Add current user prompt
    chatMessages.push({ role: "user", content: String(prompt ?? "") });

    let completion;
    try {
      const groq = getGroqClient();
      completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: chatMessages,
        temperature: 0.3, // Slightly higher for more natural responses
        max_tokens: 1200, // Increased for comprehensive detailed answers
      });
    } catch (apiErr: any) {
      // Check for missing API key error
      const message = String(apiErr?.message || "");
      if (message.includes("GROQ_API_KEY") || message.includes("apiKey")) {
        return NextResponse.json(
          { error: "AI service is not configured. Please contact the administrator." },
          { status: 503 }
        );
      }

      // Normalize Groq rate limit to 429 for the client
      const status = Number(apiErr?.status || apiErr?.statusCode || 0);
      const code = String(apiErr?.code || "").toLowerCase();

      const isRateLimited =
        status === 429 ||
        code.includes("rate") ||
        message.toLowerCase().includes("rate limit") ||
        message.toLowerCase().includes("quota");

      if (isRateLimited) {
        return NextResponse.json(
          { error: "Service temporarily unavailable due to rate limit. Please try again shortly.", rateLimited: true },
          { status: 429, headers: { "Retry-After": "60", "X-RateLimit-Reason": "groq" } }
        );
      }

      // Propagate as 502 Bad Gateway for upstream failures
      return NextResponse.json(
        { error: "Upstream AI service failed. Please try again." },
        { status: 502 }
      );
    }

    const text = completion.choices?.[0]?.message?.content ?? "";

    return NextResponse.json(
      { text },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err: any) {
    console.error("/api/terminal error:", err);
    
    // Don't expose internal errors to client
    const errorMessage = err instanceof Error && err.message.includes("rate limit")
      ? "Service temporarily unavailable. Please try again later."
      : "Failed to get response. Please try again.";
    
    return NextResponse.json(
      { error: errorMessage },
      { 
        status: err instanceof Error && err.message.includes("rate limit") ? 429 : 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


