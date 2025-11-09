"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, memo, useCallback, useLayoutEffect, ChangeEvent } from "react";
import { Terminal } from "lucide-react";

const greetings = [
  "Hello, I'm Shyam J 👋",
  "I can answer questions about my portfolio - projects, experience, skills, education, hackathons, certifications, and more!",
  "Type 'help' to see what you can ask, or just ask me anything naturally!",
];

const responses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "• help - Show this help message",
    "",
    "You can ask me about:",
    "• Projects - 'Tell me about your projects' or 'What is Edu Smart Bot?'",
    "• Experience - 'Where have you worked?' or 'Tell me about CMRL'",
    "• Skills - 'What technologies do you know?' or 'Do you know Python?'",
    "• Education - 'What's your educational background?'",
    "• Leadership - 'Tell me about NEXT GEN AI'",
    "• Hackathons - 'What hackathons have you won?'",
    "• Certifications - 'What certifications do you have?'",
    "• Contact - 'How can I reach you?'",
    "",
    "You can ask questions naturally! Try:",
    "• 'What can you tell me about yourself?'",
    "• 'Tell me about your AI projects'",
    "• 'What's your experience with Digital Twin?'",
    "• 'What hackathons have you participated in?'",
  ],
  ai: [
    "I work extensively with AI/ML, focusing on NLP, Computer Vision, and Generative AI.",
    "I've built RAG systems, chatbots, computer vision applications, and AI-driven troubleshooting systems.",
    "I'm particularly interested in Digital Twin technology, industrial AI, and building production-ready AI systems.",
  ],
  ml: [
    "I specialize in PyTorch, TensorFlow, Keras, and deep learning architectures.",
    "My projects include image captioning (BLEU-4: 0.32), self-driving car simulation with Deep Q-Learning, and more.",
    "I'm experienced in supervised learning, reinforcement learning, and generative models.",
  ],
  digital: [
    "Digital Twin is one of my core areas of expertise!",
    "I work on creating digital representations of physical systems using AI.",
    "My work at CMRL involved AI-driven troubleshooting systems similar to digital twins.",
    "This involves sensor data, real-time analytics, and predictive modeling.",
  ],
  twin: [
    "Digital Twin combines IoT, AI, and data analytics for industrial automation.",
    "I've worked on AI-driven troubleshooting systems at CMRL that extract fault codes using NLP (95% accuracy).",
    "It's fascinating how we can predict and optimize physical systems virtually.",
  ],
  project: [
    "I've built several projects including:",
    "• Edu Smart Bot - AI-powered educational assistant with OCR, summarization, and Q&A",
    "• Self-Driving Car AI - Reinforcement learning simulation with Deep Q-Learning",
    "• Image Captioning System - CNN-RNN architecture with attention (BLEU-4: 0.32)",
    "• GenAI Chatbot - Custom LLM with fine-tuning capabilities",
    "• High Efficiency RAG System - Dual-phase path optimization for retrieval",
    "• Smart Parking System - YOLO-based real-time parking space detection",
    "Check out my projects section for more details!",
  ],
  projects: [
    "I've built several projects including:",
    "• Edu Smart Bot - AI-powered educational assistant with OCR, summarization, and Q&A",
    "• Self-Driving Car AI - Reinforcement learning simulation with Deep Q-Learning",
    "• Image Captioning System - CNN-RNN architecture with attention (BLEU-4: 0.32)",
    "• GenAI Chatbot - Custom LLM with fine-tuning capabilities",
    "• High Efficiency RAG System - Dual-phase path optimization for retrieval",
    "• Smart Parking System - YOLO-based real-time parking space detection",
    "Check out my projects section for more details!",
  ],
  experience: [
    "I've worked at several companies:",
    "• CMRL (Sep 2024 - Apr 2025) - Student Intern: AI-driven troubleshooting system with NLP (95% accuracy), FAISS semantic search with Gemma 2B LLM",
    "• Sentient Scripts (Jun 2024 - Jun 2025) - Student Coordinator: Primary POC between Sentient Scripts and SRM University",
    "• Sentient Scripts (Sep 2024 - Oct 2024) - AI/ML Engineer Intern: Weather Chatbot with RAG (89% user satisfaction)",
    "• Renault Nissan (Jul 2024 - Nov 2024) - AI/ML Engineer Intern: Heavy Repair Management System, improved efficiency by 28%",
    "I've also led teams as President of NEXT GEN AI (400+ members) since 2025.",
  ],
  skill: [
    "My tech stack includes:",
    "Languages: Python, C, Java, TypeScript, JavaScript, SQL, Dart",
    "Frontend: React.js, Next.js 14, Tailwind CSS, HTML5, CSS3",
    "Backend: Node.js, Flask, Express.js, RESTful APIs",
    "AI/ML: PyTorch, TensorFlow, Keras, Hugging Face, FAISS, OpenCV, NLTK, Scikit-learn",
    "Cloud & DevOps: AWS, Oracle Cloud, Docker, Git, CI/CD, Vercel, Streamlit",
    "Databases: MongoDB, SQLite, Redis",
    "Data: Pandas, NumPy, Matplotlib, Seaborn, Power BI",
    "Digital Twin expertise is one of my specializations!",
  ],
  skills: [
    "My tech stack includes:",
    "Languages: Python, C, Java, TypeScript, JavaScript, SQL, Dart",
    "Frontend: React.js, Next.js 14, Tailwind CSS, HTML5, CSS3",
    "Backend: Node.js, Flask, Express.js, RESTful APIs",
    "AI/ML: PyTorch, TensorFlow, Keras, Hugging Face, FAISS, OpenCV, NLTK, Scikit-learn",
    "Cloud & DevOps: AWS, Oracle Cloud, Docker, Git, CI/CD, Vercel, Streamlit",
    "Databases: MongoDB, SQLite, Redis",
    "Data: Pandas, NumPy, Matplotlib, Seaborn, Power BI",
    "Digital Twin expertise is one of my specializations!",
  ],
  education: [
    "I'm pursuing BTech in Artificial Intelligence at SRM Institute of Science and Technology (Jun 2022 - May 2026).",
    "Current CGPA: 7.5/10.0",
    "My coursework includes: Machine Learning, Deep Learning, Computer Vision, NLP, Data Structures & Algorithms, Database Systems, Software Engineering, Reinforcement Learning, and Cloud Computing.",
    "I'm constantly learning and exploring new technologies in the AI field.",
  ],
  leadership: [
    "I'm currently the President of NEXT GEN AI, SRMIST KTR (2025 - Present).",
    "I lead 400+ members and direct organizational strategy and industry partnerships.",
    "Previously, I was Vice President (2024-2025) where I led 350+ members, organized 5 events, and managed ₹1,00,000 budget.",
    "I've also served as Technical Lead at AI Research Group (2023-2024) and Research Member at Cintel Students Association (2023-2024).",
  ],
  hackathon: [
    "I've won several hackathons:",
    "• Hackstreet 3.0 (2025) - 1st Place: Real-time AI automation solution with vision analytics",
    "• Appathon 2.0 (2025) - Winner: AI-driven productivity app (150+ teams)",
    "• Tamizh-A-THON 1.0 (2025) - Winner: Tamil OCR and NLP innovation under SRM TCC",
  ],
  hackathons: [
    "I've won several hackathons:",
    "• Hackstreet 3.0 (2025) - 1st Place: Real-time AI automation solution with vision analytics",
    "• Appathon 2.0 (2025) - Winner: AI-driven productivity app (150+ teams)",
    "• Tamizh-A-THON 1.0 (2025) - Winner: Tamil OCR and NLP innovation under SRM TCC",
  ],
  certification: [
    "I have several certifications:",
    "• AWS Cloud Foundations (2024)",
    "• AWS Machine Learning Foundations (2024)",
    "• Oracle Generative AI Professional (2024)",
    "• Oracle Cloud Infrastructure Foundations (2024)",
    "• Google AI/ML Virtual Internship (2024)",
    "• Intel Unnati AI & IoT Scholar (2024)",
    "• HackerRank SQL Advanced Skill Certification (2024)",
    "• NPTEL Programming in Java (2023)",
    "• Hackcelrate 2025 Finalist (Toyota)",
    "• Appathon Winner (SRM, 2024)",
    "• Hackstreet Winner (SRM, 2024)",
    "• Tamizh-A-THON 1.0 Winner (TCC, 2024)",
  ],
  certifications: [
    "I have several certifications:",
    "• AWS Cloud Foundations (2024)",
    "• AWS Machine Learning Foundations (2024)",
    "• Oracle Generative AI Professional (2024)",
    "• Oracle Cloud Infrastructure Foundations (2024)",
    "• Google AI/ML Virtual Internship (2024)",
    "• Intel Unnati AI & IoT Scholar (2024)",
    "• HackerRank SQL Advanced Skill Certification (2024)",
    "• NPTEL Programming in Java (2023)",
    "• Hackcelrate 2025 Finalist (Toyota)",
    "• Appathon Winner (SRM, 2024)",
    "• Hackstreet Winner (SRM, 2024)",
    "• Tamizh-A-THON 1.0 Winner (TCC, 2024)",
  ],
  contact: [
    "You can reach me at:",
    "Email: jshyam2005@gmail.com",
    "Phone: +91 7395980045",
    "GitHub: github.com/SHYAM140305",
    "LinkedIn: linkedin.com/in/shyam-jayakanthan-050a85284",
    "Website: shyamj.vercel.app",
    "Location: Chennai, Tamil Nadu, India",
    "Feel free to reach out for collaborations or opportunities!",
  ],
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const TerminalBot = memo(function TerminalBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [caretOffset, setCaretOffset] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Initial greeting - delay to prevent scroll on page load
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      setMessages([greetings[0]]);
      setTimeout(() => {
        setMessages([greetings[0], greetings[1]]);
      }, 1500);
    }, 1000); // Delay initialization to allow page to settle
    
    return () => clearTimeout(initTimer);
  }, []);


  // Memoize computed styles to avoid recalculating on every update
  const inputStylesRef = useRef<CSSStyleDeclaration | null>(null);
  const isUpdatingCaretRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  
  const updateCaretPosition = useCallback(() => {
    // Prevent duplicate updates
    if (isUpdatingCaretRef.current) return;
    
    const inputEl = inputRef.current;
    const measureEl = measureRef.current;
    if (!inputEl || !measureEl) return;

    isUpdatingCaretRef.current = true;

    const selectionStart = inputEl.selectionStart ?? inputEl.value.length;
    const textForMeasure = inputEl.value.slice(0, selectionStart);

    // Cache computed styles - only recalculate if input element changed
    if (!inputStylesRef.current) {
      inputStylesRef.current = window.getComputedStyle(inputEl);
    }
    const inputStyles = inputStylesRef.current;
    
    // Batch style updates to reduce reflows
    measureEl.style.cssText = `
      font-family: ${inputStyles.fontFamily || 'monospace'};
      font-size: ${inputStyles.fontSize};
      font-weight: ${inputStyles.fontWeight};
      font-style: ${inputStyles.fontStyle || 'normal'};
      letter-spacing: ${inputStyles.letterSpacing};
      padding: 0;
      margin: 0;
      border: none;
      box-sizing: content-box;
      position: absolute;
      visibility: hidden;
      white-space: pre;
      top: 0;
      left: 0;
      height: auto;
      width: auto;
      line-height: ${inputStyles.lineHeight};
    `;
    
    // Replace spaces with non-breaking spaces for accurate measurement
    measureEl.textContent = textForMeasure.replace(/ /g, '\u00A0');
    
    // Force a reflow to ensure measurement is accurate
    const width = measureEl.offsetWidth;
    
    // Set the offset
    setCaretOffset(width);
    
    // Reset flag after state update
    requestAnimationFrame(() => {
      isUpdatingCaretRef.current = false;
    });
  }, []);

  // Schedule caret updates for non-input events (clicks, focus, etc.)
  const scheduleCaretUpdate = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      updateCaretPosition();
      rafIdRef.current = null;
    });
  }, [updateCaretPosition]);

  // Update cursor position when input changes
  useLayoutEffect(() => {
    if (input === "") {
      setCaretOffset(0);
      isUpdatingCaretRef.current = false;
    } else {
      updateCaretPosition();
    }
  }, [input, updateCaretPosition]);

  // Handle input changes - cursor position is updated by useLayoutEffect
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    // Cursor position will be updated automatically by useLayoutEffect when input changes
  }, []);

  // Removed auto-scroll on message updates

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    // Show the command in output area with $ prefix
    setMessages((prev) => [...prev, `$ ${userMessage}`]);
    setInput("");
    setCaretOffset(0); // Reset cursor position when input is cleared
    scheduleCaretUpdate();
    setIsTyping(true);

    // Add user message to conversation history
    const updatedHistory = [...conversationHistory, { role: "user" as const, content: userMessage }];
    setConversationHistory(updatedHistory);

    // Determine response source (local help vs Groq API)
    const lowerInput = userMessage.toLowerCase().trim();
    let response: string | string[] = "";

    if (lowerInput === "help" || lowerInput === "?" || lowerInput === "commands") {
      response = responses.help;
      // For help command, also add to conversation history
      setTimeout(() => {
        const responseText = Array.isArray(response) ? response.join("\n") : response;
        setConversationHistory((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.role === "user" && lastMsg.content === userMessage) {
            return [...prev, { role: "assistant", content: responseText }];
          }
          return [...prev, { role: "user", content: userMessage }, { role: "assistant", content: responseText }];
        });
      }, 100);
    } else {
      // Try Groq API; fallback to keyword responses if it fails
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for better responses
        
        // Send conversation history for context
        const res = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            prompt: userMessage,
            messages: updatedHistory.slice(-10), // Send last 10 messages for context
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          if (res.status === 429) {
            response = "Rate limit exceeded. Please wait a moment and try again.";
          } else {
            throw new Error("Bad response");
          }
        } else {
          const data = await res.json();
          response = String(data.text || "").trim() || "(No response)";
        }
      } catch (err) {
        // Fallback to local canned responses
        let fallback: string | string[] = "That's interesting! Tell me more about what you'd like to know.";
        for (const [key, values] of Object.entries(responses)) {
          if (key !== "help" && lowerInput.includes(key)) {
            fallback = Array.isArray(values) ? values.join("\n") : values;
            break;
          }
        }
        response = fallback;
      }
    }

    // Type out response - optimized with faster typing and batched updates
    setTimeout(() => {
      const responseText = Array.isArray(response) ? response.join("\n") : response;
      setMessages((prev) => [...prev, ""]);
      let currentText = "";
      let charIndex = 0;
      const totalChars = responseText.length;
      // Faster typing speed for better UX
      const typingSpeed = Array.isArray(response) ? 8 : 15;
      let lastUpdateTime = performance.now();
      let animationFrameId: number | null = null;
      let batchSize = 1; // Batch characters for very long responses

      const typeChar = (currentTime: number) => {
        if (charIndex < totalChars) {
          // Use performance timing for smoother animation
          if (currentTime - lastUpdateTime >= typingSpeed) {
            // Batch updates for long responses
            if (totalChars > 200) {
              batchSize = Math.min(3, Math.floor(totalChars / 100));
            }
            const endIndex = Math.min(charIndex + batchSize, totalChars);
            currentText = responseText.slice(0, endIndex);
            charIndex = endIndex;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = currentText;
              return newMessages;
            });
            lastUpdateTime = currentTime;
          }
          animationFrameId = requestAnimationFrame(typeChar);
        } else {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          setIsTyping(false);
          // Add assistant response to conversation history (user message already added above)
          setConversationHistory((prev) => {
            // Ensure we don't duplicate - check if last message is the user message
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === "user" && lastMsg.content === userMessage) {
              return [...prev, { role: "assistant", content: responseText }];
            }
            // If for some reason user message wasn't added, add both
            return [...prev, { role: "user", content: userMessage }, { role: "assistant", content: responseText }];
          });
        }
      };
      animationFrameId = requestAnimationFrame(typeChar);
    }, 300); // Reduced delay
  }, [isTyping, input, scheduleCaretUpdate, conversationHistory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      <div className="rounded-xl overflow-hidden modern-glass border border-border/40 shadow-xl">
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-zinc-950 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 border-b border-zinc-700/50">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <Terminal className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-400 ml-2" />
          <span className="text-[10px] sm:text-xs font-medium text-zinc-400 ml-2">Ask Me Anything Terminal</span>
        </div>

        {/* Terminal Body */}
        <div className="bg-zinc-950 dark:bg-black p-4 sm:p-6 min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] overflow-y-auto">
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            {messages.map((message, index) => {
              // Check if message starts with "$" to style it as a command
              const isCommand = message.startsWith("$ ");
              return (
                <motion.div
                  key={`msg-${index}-${message.slice(0, 20)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`whitespace-pre-line ${isCommand ? "text-amber-500" : "text-green-400"}`}
                >
                  {message}
                </motion.div>
              );
            })}
            {isTyping && (
              <div className="text-green-400 flex items-center gap-1">
                <span>█</span>
              </div>
            )}
            {!isTyping && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-amber-500 flex-shrink-0">$</span>
                <form onSubmit={handleSubmit} className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      // Only update cursor for arrow keys, not regular typing
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End') {
                        scheduleCaretUpdate();
                      }
                    }}
                    onClick={() => scheduleCaretUpdate()}
                    onFocus={() => scheduleCaretUpdate()}
                    onSelect={() => scheduleCaretUpdate()}
                    onMouseUp={() => scheduleCaretUpdate()}
                    className="w-full bg-transparent text-green-400 outline-none placeholder:text-zinc-600 caret-transparent font-mono text-xs sm:text-sm"
                    placeholder="Type your question..."
                    style={{ 
                      fontFamily: 'monospace',
                      padding: '0',
                      margin: '0',
                      border: 'none',
                      lineHeight: 'inherit',
                      caretColor: 'transparent',
                      color: 'inherit'
                    }}
                  />
                  <span
                    ref={measureRef}
                    className="pointer-events-none absolute whitespace-pre font-mono text-xs sm:text-sm"
                    aria-hidden="true"
                    style={{ 
                      fontFamily: 'monospace',
                      visibility: 'hidden',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      whiteSpace: 'pre',
                      height: 'auto',
                      lineHeight: 'inherit',
                      overflow: 'visible',
                      padding: '0',
                      margin: '0',
                      border: 'none',
                      boxSizing: 'content-box'
                    }}
                  />
                  <span
                    className="pointer-events-none absolute top-0 bottom-0 flex items-center text-green-400 font-mono opacity-100"
                    aria-hidden="true"
                    style={{ 
                      left: `${caretOffset}px`,
                      fontFamily: 'monospace',
                      lineHeight: 'inherit',
                      height: '100%',
                      transition: 'none',
                      transitionProperty: 'none',
                      animation: 'none',
                      willChange: 'auto'
                    }}
                  >
                    █
                  </span>
                </form>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-xl blur-xl -z-10" />
    </motion.div>
  );
});

