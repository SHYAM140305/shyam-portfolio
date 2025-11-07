import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

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

  const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  const skillsSection = Object.entries(skillsByCategory)
    .map(([cat, items]) => `- ${cat}: ${items.join(", ")}`)
    .join("\n");

  const projectsSection = projects
    .map(p => `- ${p.title}: ${p.description}. Tech: ${p.technologies.join(", ")}${p.highlights?.length ? "; Highlights: " + p.highlights.join("; ") : ""}`)
    .join("\n");

  const experienceSection = experiences
    .map(e => `- ${e.role} @ ${e.company} (${e.location}; ${e.startDate}–${e.endDate}): ${e.description}${e.highlights?.length ? "; Highlights: " + e.highlights.join("; ") : ""}`)
    .join("\n");

  const educationSection = education
    .map(ed => `- ${ed.degree} @ ${ed.institution} (${ed.location}; ${ed.startDate}–${ed.endDate})${ed.grade ? "; " + ed.grade : ""}${ed.coursework?.length ? "; Coursework: " + ed.coursework.join(", ") : ""}`)
    .join("\n");

  cachedContext = `PORTFOLIO CONTEXT (author: Shyam J)
Skills:\n${skillsSection}\n\nProjects:\n${projectsSection}\n\nExperience:\n${experienceSection}\n\nEducation:\n${educationSection}`;
  contextCacheTime = now;
  
  return cachedContext;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
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

    const systemPrompt = [
      "You are an AI terminal on Shyam J’s portfolio site.",
      "Answer ONLY using the information in the provided PORTFOLIO CONTEXT.",
      "If the answer is not present in the context, reply briefly: 'I don't have that info in my portfolio yet.'",
      "Keep responses concise, friendly, and factual. Prefer bullet points when listing.",
      "When asked about projects, experience, or skills, cite exact names from context.",
    ].join(" \n");

    const chatMessages = (messages && Array.isArray(messages) ? messages : [
      { role: "system", content: systemPrompt },
      { role: "system", content: portfolioContext },
      { role: "user", content: String(prompt ?? "") },
    ]) as { role: "system" | "user" | "assistant"; content: string }[];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: chatMessages,
      temperature: 0.2,
      max_tokens: 512,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";

    return NextResponse.json(
      { text },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
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


