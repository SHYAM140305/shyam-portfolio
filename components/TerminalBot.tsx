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

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const TerminalBot = memo(function TerminalBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
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

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Memoize computed styles to avoid recalculating on every update
  const inputStylesRef = useRef<CSSStyleDeclaration | null>(null);
  
  const updateCaretPosition = useCallback(() => {
    const inputEl = inputRef.current;
    const measureEl = measureRef.current;
    if (!inputEl || !measureEl) return;

    const selectionStart = inputEl.selectionStart ?? input.length;
    const textForMeasure = input.slice(0, selectionStart);

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
  }, [input]);

  // Debounce caret updates to reduce re-renders
  const caretUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scheduleCaretUpdate = useCallback(() => {
    if (caretUpdateTimeoutRef.current) {
      clearTimeout(caretUpdateTimeoutRef.current);
    }
    caretUpdateTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        updateCaretPosition();
      });
    }, 0);
  }, [updateCaretPosition]);

  useLayoutEffect(() => {
    updateCaretPosition();
    return () => {
      if (caretUpdateTimeoutRef.current) {
        clearTimeout(caretUpdateTimeoutRef.current);
      }
    };
  }, [input, updateCaretPosition]);

  // Ensure cursor position updates when input is cleared
  useEffect(() => {
    if (input === "") {
      setCaretOffset(0);
    }
  }, [input]);

  // Debounce input changes to reduce state updates
  const inputDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    
    // Clear existing timeout
    if (inputDebounceRef.current) {
      clearTimeout(inputDebounceRef.current);
    }
    
    // Schedule caret update with minimal delay
    inputDebounceRef.current = setTimeout(() => {
      scheduleCaretUpdate();
    }, 0);
  }, [scheduleCaretUpdate]);

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
                <span className={cursorVisible ? "opacity-100" : "opacity-0"}>█</span>
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
                    onKeyUp={() => scheduleCaretUpdate()}
                    onKeyDown={() => scheduleCaretUpdate()}
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
                      lineHeight: 'inherit'
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
                    className={`pointer-events-none absolute top-0 bottom-0 flex items-center text-green-400 transition-opacity duration-100 font-mono ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                    aria-hidden="true"
                    style={{ 
                      left: `${caretOffset}px`,
                      fontFamily: 'monospace',
                      lineHeight: 'inherit',
                      height: '100%'
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

