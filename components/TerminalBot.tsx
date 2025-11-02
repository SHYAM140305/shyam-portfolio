"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const greetings = [
  "Hello, I'm Shyam J 👋",
  "Ask me anything about AI, ML, or Digital Twins!",
  "Type 'help' to see available commands.",
];

const responses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "• help - Show this help message",
    "• ai / ml - Ask about AI/ML expertise",
    "• digital / twin - Learn about Digital Twin technology",
    "• project / projects - Information about my projects",
    "• experience - My work experience",
    "• skill / skills - Technical skills and technologies",
    "• education - Academic background",
    "• contact - Get in touch with me",
    "",
    "You can also type questions naturally, like 'What is Digital Twin?' or 'Tell me about your projects'",
  ],
  ai: [
    "I work extensively with AI/ML, focusing on NLP, Computer Vision, and Generative AI.",
    "I've built RAG systems, chatbots, and computer vision applications.",
    "I'm particularly interested in Digital Twin technology and industrial AI.",
  ],
  ml: [
    "I specialize in PyTorch, TensorFlow, and deep learning architectures.",
    "My projects include image captioning, self-driving car simulation, and more.",
    "I'm experienced in both supervised and reinforcement learning.",
  ],
  digital: [
    "Digital Twin is one of my core areas of expertise!",
    "I work on creating digital representations of physical systems using AI.",
    "This involves sensor data, real-time analytics, and predictive modeling.",
  ],
  twin: [
    "Digital Twin combines IoT, AI, and data analytics for industrial automation.",
    "I've worked on AI-driven troubleshooting systems similar to digital twins.",
    "It's fascinating how we can predict and optimize physical systems virtually.",
  ],
  project: [
    "Check out my projects section! I've built Edu Smart Bot, RAG systems, and more.",
    "My favorite projects include AI-powered educational assistants and computer vision apps.",
    "I'm always working on something new - currently focused on Digital Twin applications.",
  ],
  projects: [
    "Check out my projects section! I've built Edu Smart Bot, RAG systems, and more.",
    "My favorite projects include AI-powered educational assistants and computer vision apps.",
    "I'm always working on something new - currently focused on Digital Twin applications.",
  ],
  experience: [
    "I've interned at CMRL, Sentient Scripts, and Renault Nissan.",
    "Currently interning at CMRL working on AI-driven troubleshooting systems.",
    "I've led teams as President of NEXT GEN AI (400+ members).",
  ],
  skill: [
    "My tech stack includes Python, PyTorch, React, Next.js, and more.",
    "I'm proficient in AI/ML frameworks, full-stack development, and cloud technologies.",
    "Digital Twin expertise is one of my specializations!",
  ],
  skills: [
    "My tech stack includes Python, PyTorch, React, Next.js, and more.",
    "I'm proficient in AI/ML frameworks, full-stack development, and cloud technologies.",
    "Digital Twin expertise is one of my specializations!",
  ],
  education: [
    "I'm pursuing BTech in Artificial Intelligence at SRM Institute of Science and Technology.",
    "My coursework includes Machine Learning, Deep Learning, Computer Vision, NLP, and more.",
    "I'm constantly learning and exploring new technologies in the AI field.",
  ],
  contact: [
    "You can reach me at: jshyam2005@gmail.com",
    "GitHub: github.com/SHYAM140305",
    "LinkedIn: linkedin.com/in/shyam-jayakanthan-050a85284",
    "Location: Chennai, India",
    "Feel free to reach out for collaborations or opportunities!",
  ],
};

export function TerminalBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Removed auto-scroll on message updates

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, `$ ${userMessage}`]);
    setIsTyping(true);

    // Find matching response
    const lowerInput = userMessage.toLowerCase().trim();
    let response: string | string[] = "That's interesting! Tell me more about what you'd like to know.";

    // Check for help command first
    if (lowerInput === "help" || lowerInput === "?" || lowerInput === "commands") {
      response = responses.help;
    } else {
      // Check other keywords
      for (const [key, values] of Object.entries(responses)) {
        if (key !== "help" && lowerInput.includes(key)) {
          response = values[Math.floor(Math.random() * values.length)];
          break;
        }
      }
    }

    // Type out response
    setTimeout(() => {
      // Handle help command which returns an array
      const responseText = Array.isArray(response) ? response.join("\n") : response;
      
      setMessages((prev) => [...prev, ""]); // Add empty message for typing
      let currentText = "";
      let charIndex = 0;
      const totalChars = responseText.length;
      const typingSpeed = Array.isArray(response) ? 20 : 50; // Faster for help command

      const typeInterval = setInterval(() => {
        if (charIndex < totalChars) {
          currentText = responseText.slice(0, charIndex + 1);
          charIndex++;
          
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = currentText;
            return newMessages;
          });
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, typingSpeed);
    }, 500);
  };

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
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 whitespace-pre-line"
              >
                {message}
              </motion.div>
            ))}
            {isTyping && (
              <div className="text-green-400">
                <span className={cursorVisible ? "opacity-100" : "opacity-0"}>█</span>
              </div>
            )}
            {!isTyping && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
                <span className="text-amber-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-green-400 outline-none placeholder:text-zinc-600"
                  placeholder="Type your question..."
                  // Removed auto-scroll on focus
                />
                <span className={`text-green-400 ${cursorVisible ? "opacity-100" : "opacity-0"}`}>
                  █
                </span>
              </form>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-xl blur-xl -z-10" />
    </motion.div>
  );
}

