"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Home, User, Wrench, Code, Terminal, Trophy, Briefcase, GraduationCap, Mail, Search, FolderKanban, Award, ExternalLink, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { skills, type Skill } from "@/data/skills";
import { experiences, type Experience } from "@/data/experience";
import { education, certifications, type Education, type Certification } from "@/data/education";

const navItems = [
  { label: "Home", href: "#home", icon: Home, aliases: ["top", "start"] },
  { label: "About", href: "#about", icon: User, aliases: ["me", "bio", "profile"] },
  { label: "Skills", href: "#skills", icon: Wrench, aliases: ["tech", "stack", "tools"] },
  { label: "Projects", href: "#projects", icon: Code, aliases: ["work", "portfolio", "builds"] },
  { label: "Terminal", href: "#terminal", icon: Terminal, aliases: ["bot", "ask", "chat"] },
  { label: "Achievements", href: "#achievements", icon: Trophy, aliases: ["awards", "certifications", "wins"] },
  { label: "Experience", href: "#experience", icon: Briefcase, aliases: ["work experience", "jobs", "career"] },
  { label: "Education", href: "#education", icon: GraduationCap, aliases: ["study", "college", "school"] },
  { label: "Contact", href: "#contact", icon: Mail, aliases: ["reach", "email", "connect"] },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchHighlight, setSearchHighlight] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    let rafId: number | null = null;
    let lastProgress = 0;
    let lastActiveSection = activeSection;
    let sectionCheckTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate scroll progress percentage - only update if changed significantly
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0;
      const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));
      
      // Only update if progress changed by at least 2% (reduced updates)
      if (Math.abs(roundedProgress - lastProgress) >= 2) {
        setScrollProgress(roundedProgress);
        lastProgress = roundedProgress;
      }
      
      // Only update scrolled state if it changed significantly
      if (Math.abs(currentScrollY - lastScrollY) > 20) {
        const newIsScrolled = currentScrollY > 20;
        if (newIsScrolled !== isScrolled) {
          setIsScrolled(newIsScrolled);
        }
        lastScrollY = currentScrollY;
      }

      // Throttle section checking more aggressively
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          // Debounce section checking to reduce DOM queries
          if (sectionCheckTimeout) {
            clearTimeout(sectionCheckTimeout);
          }
          
          sectionCheckTimeout = setTimeout(() => {
            const sections = navItems.map((item) => item.href.slice(1));
            const current = sections.find((section) => {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
              }
              return false;
            });

            if (current && current !== lastActiveSection) {
              setActiveSection(current);
              lastActiveSection = current;
            }
          }, 100); // Debounce section checks
          
          ticking = false;
          rafId = null;
        });
        
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Calculate initial progress
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (sectionCheckTimeout) {
        clearTimeout(sectionCheckTimeout);
      }
    };
  }, [activeSection, isScrolled]);

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!desktopMenuRef.current) return;
      if (!desktopMenuRef.current.contains(e.target as Node)) {
        setIsDesktopMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDesktopMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Global shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Debounce search query - increased debounce for better performance
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 200); // 200ms debounce for better performance

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Enhanced search types
  type SearchResultType = 'section' | 'project' | 'skill' | 'experience' | 'education' | 'certification';
  
  interface SearchResult {
    type: SearchResultType;
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
    score: number;
    metadata?: Record<string, any>;
  }

  // Fuzzy search helpers - Memoized
  const normalize = useCallback((s: string) => s.toLowerCase().trim(), []);
  const getScore = useCallback((text: string, query: string, aliases: string[] = []) => {
    const t = normalize(text);
    const q = normalize(query);
    if (!q) return 0;
    if (t === q) return 100;
    if (t.startsWith(q)) return 90;
    if (t.includes(q)) return 70;
    for (const a of aliases) {
      const an = normalize(a);
      if (an === q) return 85;
      if (an.startsWith(q)) return 75;
      if (an.includes(q)) return 55;
    }
    return 0;
  }, [normalize]);

  const searchInText = useCallback((text: string, query: string) => {
    if (!text) return 0;
    const normalizedText = normalize(text);
    const normalizedQuery = normalize(query);
    if (normalizedText.includes(normalizedQuery)) {
      // Higher score if found earlier in text
      const index = normalizedText.indexOf(normalizedQuery);
      return Math.max(50, 80 - (index / text.length) * 30);
    }
    return 0;
  }, [normalize]);
  
  // Enhanced search function that searches across all data types
  const getFiltered = useCallback((query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const q = normalize(query);
    const results: SearchResult[] = [];

    // Search navigation sections
    navItems.forEach((item) => {
      const labelScore = getScore(item.label, q, item.aliases || []);
      if (labelScore > 0) {
        results.push({
          type: 'section',
          id: item.href,
          title: item.label,
          href: item.href,
          icon: item.icon,
          score: labelScore,
        });
      }
    });

    // Search projects
    projects.forEach((project) => {
      const titleScore = getScore(project.title, q) * 1.2;
      const descScore = searchInText(project.description, q) * 0.8;
      const longDescScore = searchInText(project.longDescription, q) * 0.6;
      const techScore = project.technologies.some(t => normalize(t).includes(q)) ? 60 : 0;
      const highlightsScore = project.highlights.some(h => normalize(h).includes(q)) ? 50 : 0;
      
      const maxScore = Math.max(titleScore, descScore, longDescScore, techScore, highlightsScore);
      if (maxScore > 0) {
        results.push({
          type: 'project',
          id: project.id,
          title: project.title,
          subtitle: project.description,
          description: project.longDescription,
          href: '#projects',
          icon: FolderKanban,
          score: maxScore,
          metadata: { project },
        });
      }
    });

    // Search skills
    skills.forEach((skill) => {
      const nameScore = getScore(skill.name, q);
      const categoryScore = getScore(skill.category, q) * 0.7;
      const maxScore = Math.max(nameScore, categoryScore);
      if (maxScore > 0) {
        results.push({
          type: 'skill',
          id: skill.name,
          title: skill.name,
          subtitle: skill.category,
          href: '#skills',
          icon: Wrench,
          score: maxScore,
        });
      }
    });

    // Search experience
    experiences.forEach((exp) => {
      const roleScore = getScore(exp.role, q) * 1.2;
      const companyScore = getScore(exp.company, q) * 1.1;
      const descScore = searchInText(exp.description, q) * 0.8;
      const highlightsScore = exp.highlights.some(h => normalize(h).includes(q)) ? 50 : 0;
      
      const maxScore = Math.max(roleScore, companyScore, descScore, highlightsScore);
      if (maxScore > 0) {
        results.push({
          type: 'experience',
          id: exp.id,
          title: `${exp.role} at ${exp.company}`,
          subtitle: exp.description,
          href: '#experience',
          icon: Briefcase,
          score: maxScore,
          metadata: { experience: exp },
        });
      }
    });

    // Search education
    education.forEach((edu) => {
      const degreeScore = getScore(edu.degree, q) * 1.2;
      const institutionScore = getScore(edu.institution, q) * 1.1;
      const courseworkScore = edu.coursework?.some(c => normalize(c).includes(q)) ? 50 : 0;
      
      const maxScore = Math.max(degreeScore, institutionScore, courseworkScore);
      if (maxScore > 0) {
        results.push({
          type: 'education',
          id: edu.id,
          title: edu.degree,
          subtitle: edu.institution,
          href: '#education',
          icon: GraduationCap,
          score: maxScore,
        });
      }
    });

    // Search certifications
    certifications.forEach((cert) => {
      const nameScore = getScore(cert.name, q) * 1.2;
      const issuerScore = getScore(cert.issuer, q) * 1.0;
      const maxScore = Math.max(nameScore, issuerScore);
      if (maxScore > 0) {
        results.push({
          type: 'certification',
          id: cert.id,
          title: cert.name,
          subtitle: `${cert.issuer} • ${cert.year}`,
          href: '#achievements',
          icon: Award,
          score: maxScore,
        });
      }
    });

    // Sort by score and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 12); // Show more results
  }, [getScore, searchInText, normalize]);

  // Memoize filtered results
  const filteredResults = useMemo(() => {
    return getFiltered(debouncedSearchQuery);
  }, [debouncedSearchQuery, getFiltered]);

  const highlightText = (text: string, query: string) => {
    const q = normalize(query);
    if (!q || !text) return <span>{text}</span>;
    const lowerText = text.toLowerCase();
    const idx = lowerText.indexOf(q);
    if (idx === -1) return <span>{text}</span>;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <span>
        {before}
        <span className="font-semibold text-primary bg-primary/10 px-0.5 rounded">{match}</span>
        {after}
      </span>
    );
  };

  const getTypeLabel = (type: SearchResultType) => {
    const labels = {
      section: 'Section',
      project: 'Project',
      skill: 'Skill',
      experience: 'Experience',
      education: 'Education',
      certification: 'Certification',
    };
    return labels[type] || 'Result';
  };

  const getTypeColor = (type: SearchResultType) => {
    const colors = {
      section: 'text-blue-500 bg-blue-500/10',
      project: 'text-purple-500 bg-purple-500/10',
      skill: 'text-orange-500 bg-orange-500/10',
      experience: 'text-green-500 bg-green-500/10',
      education: 'text-indigo-500 bg-indigo-500/10',
      certification: 'text-amber-500 bg-amber-500/10',
    };
    return colors[type] || 'text-muted-foreground bg-muted';
  };

  // Close search suggestions on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!searchRef.current) return;
      if (!searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Use setTimeout to ensure menu closes before scroll
    setTimeout(() => {
      // Try both querySelector and getElementById for better compatibility
      const id = href.replace('#', '');
      const element = document.getElementById(id) || document.querySelector(href);
      const navbarHeight = 80; // Approximate navbar height
      
      if (element) {
        // Calculate the position accounting for fixed navbar
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - navbarHeight;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: "smooth"
        });
      } else {
        // Fallback: try scrollIntoView if element not found with offset
        const fallbackElement = document.querySelector(href);
        if (fallbackElement) {
          fallbackElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
          // Adjust for navbar after scroll
          setTimeout(() => {
            window.scrollBy(0, -navbarHeight);
          }, 100);
        }
      }
    }, 150); // Slightly longer delay to ensure menu animation completes
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-solid ${
        isScrolled
          ? "shadow-2xl border-b border-amber-500/4 shadow-amber-500/1"
          : ""
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
          style={{
            width: `${scrollProgress}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
      {/* Subtle gradient line when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="text-2xl md:text-3xl font-bold flex items-center gap-2 relative z-10"
            >
              <span className="relative inline-block">
                <span className="gradient-text">
                  Shyam J
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/60 to-orange-500/60"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - search + dropdown */}
          <div className="hidden md:flex items-center gap-3 relative">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const filtered = filteredResults;
                  if (filtered[searchHighlight]) {
                    const result = filtered[searchHighlight];
                  if (result.href) {
                    handleNavClick(result.href);
                    // Highlight the specific item based on type
                    setTimeout(() => {
                      let element: Element | null = null;
                      
                      if (result.type === 'project' && result.metadata?.project) {
                        element = document.querySelector(`[data-project-id="${result.metadata.project.id}"]`);
                      } else if (result.type === 'experience' && result.metadata?.experience) {
                        element = document.querySelector(`[data-experience-id="${result.metadata.experience.id}"]`);
                      } else if (result.type === 'education' && result.id) {
                        element = document.querySelector(`[data-education-id="${result.id}"]`);
                      } else if (result.type === 'skill' && result.id) {
                        element = document.querySelector(`[data-skill-name="${result.id}"]`);
                      } else if (result.type === 'certification' && result.id) {
                        element = document.querySelector(`[data-certification-id="${result.id}"]`);
                      }
                      
                      if (element) {
                        // Clear any existing highlights first
                        document.querySelectorAll('.search-highlight').forEach(el => {
                          el.classList.remove('search-highlight');
                        });
                        
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add highlight with custom CSS class
                        element.classList.add('search-highlight');
                        setTimeout(() => {
                          element?.classList.remove('search-highlight');
                        }, 2000);
                      }
                    }, 500);
                  }
                    setIsSearchOpen(false);
                  } else if (filtered[0]) {
                    const result = filtered[0];
                    if (result.href) {
                      handleNavClick(result.href);
                    }
                    setIsSearchOpen(false);
                  }
                  const q = (debouncedSearchQuery || searchQuery).trim();
                  if (q) {
                    setRecentSearches((prev) => {
                      const next = [q, ...prev.filter((p) => p !== q)].slice(0, 5);
                      return next;
                    });
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border/50 shadow-sm min-w-[220px] focus-within:border-primary/50"
                role="search"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setSearchHighlight(0);
                    // Reset debounce on new input
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSearchHighlight((prev) => Math.min(prev + 1, Math.max(filteredResults.length - 1, 0)));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSearchHighlight((prev) => Math.max(prev - 1, 0));
                    } else if (e.key === "Enter") {
                      // handled by onSubmit
                    } else if (e.key === "Escape") {
                      setIsSearchOpen(false);
                    }
                  }}
                  placeholder="Search…"
                  className="bg-transparent outline-none text-sm placeholder:text-muted-foreground/80 w-44"
                  ref={searchInputRef}
                />
              </form>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm rounded-xl menu-solid border border-border/50 shadow-xl p-2 z-50"
                  >
                    {(debouncedSearchQuery || searchQuery).trim().length === 0 ? (
                      <div>
                        <div className="px-2 py-1.5 text-[12px] uppercase tracking-wide text-muted-foreground/80">Available sections</div>
                        <div className="px-2 pb-2 flex flex-wrap gap-2">
                          {navItems.map((item) => (
                            <button
                              key={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                setIsSearchOpen(false);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card hover:bg-accent/30 border border-border/50 text-xs font-medium"
                            >
                              {item.icon && <item.icon className="w-3.5 h-3.5 text-primary" />}
                              {item.label}
                            </button>
                          ))}
                        </div>
                        {recentSearches.length > 0 && (
                          <div className="px-2 py-1.5 text-[12px] uppercase tracking-wide text-muted-foreground/80">Recent</div>
                        )}
                        {recentSearches.length > 0 && (
                          <div className="px-2 pb-2 flex flex-wrap gap-2">
                            {recentSearches.map((q) => (
                              <button
                                key={q}
                                onClick={() => {
                                  setSearchQuery(q);
                                  const filtered = getFiltered(q);
                                  if (filtered[0]?.href) {
                                    handleNavClick(filtered[0].href);
                                  }
                                  setIsSearchOpen(false);
                                }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card hover:bg-accent/30 border border-border/50 text-xs font-medium"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="px-2 py-1 text-[11px] text-muted-foreground/80">Tip: Press Ctrl/⌘ + K to search</div>
                      </div>
                    ) : (
                      <>
                        {filteredResults.length > 0 ? (
                          <div className="max-h-[400px] overflow-y-auto">
                            {Object.entries(
                              filteredResults.reduce((acc, result) => {
                                if (!acc[result.type]) acc[result.type] = [];
                                acc[result.type].push(result);
                                return acc;
                              }, {} as Record<SearchResultType, SearchResult[]>)
                            ).map(([type, results]) => (
                              <div key={type} className="mb-3 last:mb-0">
                                <div className="px-2 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground/80 font-semibold flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${getTypeColor(type as SearchResultType).split(' ')[0]}`} />
                                  {getTypeLabel(type as SearchResultType)} ({results.length})
                                </div>
                                {results.map((result, idx) => {
                                  const globalIdx = filteredResults.indexOf(result);
                                  const Icon = result.icon || Search;
                                  return (
                                    <button
                                      key={`${result.type}-${result.id}`}
                                      onClick={() => {
                                        if (result.href) {
                                          handleNavClick(result.href);
                                          // Highlight the specific item based on type
                                          setTimeout(() => {
                                            let element: Element | null = null;
                                            
                                            if (result.type === 'project' && result.metadata?.project) {
                                              element = document.querySelector(`[data-project-id="${result.metadata.project.id}"]`);
                                            } else if (result.type === 'experience' && result.metadata?.experience) {
                                              element = document.querySelector(`[data-experience-id="${result.metadata.experience.id}"]`);
                                            } else if (result.type === 'education' && result.id) {
                                              element = document.querySelector(`[data-education-id="${result.id}"]`);
                                            } else if (result.type === 'skill' && result.id) {
                                              element = document.querySelector(`[data-skill-name="${result.id}"]`);
                                            } else if (result.type === 'certification' && result.id) {
                                              element = document.querySelector(`[data-certification-id="${result.id}"]`);
                                            }
                                            
                      if (element) {
                        // Clear any existing highlights first
                        document.querySelectorAll('.search-highlight').forEach(el => {
                          el.classList.remove('search-highlight');
                        });
                        
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Add highlight with custom CSS class
                        element.classList.add('search-highlight');
                        setTimeout(() => {
                          element?.classList.remove('search-highlight');
                        }, 2000);
                      }
                                          }, 500);
                                        }
                                        setIsSearchOpen(false);
                                      }}
                                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm flex items-start gap-3 group ${
                                        globalIdx === searchHighlight ? "bg-accent/40 border border-primary/20" : "hover:bg-muted/50"
                                      }`}
                                    >
                                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(type as SearchResultType)}`}>
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-foreground mb-0.5">
                                          {highlightText(result.title, debouncedSearchQuery || searchQuery)}
                                        </div>
                                        {result.subtitle && (
                                          <div className="text-xs text-muted-foreground line-clamp-1">
                                            {highlightText(result.subtitle, debouncedSearchQuery || searchQuery)}
                                          </div>
                                        )}
                                        {result.type === 'project' && result.metadata?.project && (
                                          <div className="flex items-center gap-2 mt-1.5">
                                            {result.metadata.project.githubUrl && (
                                              <a
                                                href={result.metadata.project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                              >
                                                <Github className="w-3 h-3" />
                                                <span>GitHub</span>
                                              </a>
                                            )}
                                            {result.metadata.project.liveUrl && (
                                              <a
                                                href={result.metadata.project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                              >
                                                <ExternalLink className="w-3 h-3" />
                                                <span>Live</span>
                                              </a>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="px-3 py-4 text-center">
                            <div className="text-sm text-muted-foreground mb-1">No matches found</div>
                            <div className="text-xs text-muted-foreground/70">Try searching for sections, projects, skills, or experience</div>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="ml-0">
              <ThemeToggle />
            </div>
            <div
              className="relative"
              ref={desktopMenuRef}
              onMouseEnter={() => setIsDesktopMenuOpen(true)}
              onMouseLeave={() => setIsDesktopMenuOpen(false)}
            >
              <motion.button
                onClick={() => setIsDesktopMenuOpen((o) => !o)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                aria-haspopup="menu"
                aria-expanded={isDesktopMenuOpen}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl transition-all font-semibold text-sm sm:text-base text-foreground bg-card hover:bg-accent/30 border border-border/50 shadow-sm"
              >
                {(() => {
                  const current = navItems.find((i) => i.href.slice(1) === activeSection) || navItems[0];
                  const Icon = current.icon;
                  return (
                    <>
                      {Icon && <Icon className="w-4 h-4 text-primary" />}
                      <span>{current.label}</span>
                    </>
                  );
                })()}
                <motion.span animate={{ rotate: isDesktopMenuOpen ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ filter: "none" }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {isDesktopMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-xl menu-solid border border-border/50 shadow-xl p-2 z-50"
                    role="menu"
                  >
                    <div className="grid grid-cols-1">
                      {navItems.map((item, index) => (
                        <motion.button
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => {
                            setIsDesktopMenuOpen(false);
                            handleNavClick(item.href);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-3 ${
                            activeSection === item.href.slice(1)
                              ? "bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-foreground border border-amber-500/10"
                              : "hover:bg-accent/30"
                          }`}
                          role="menuitem"
                        >
                          {item.icon && <item.icon className="w-4 h-4 text-primary" />}
                          <span>{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Header - Search + Theme + Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Search Button */}
            <div className="relative" ref={searchRef}>
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-muted hover:bg-accent transition-colors flex items-center justify-center shadow-md hover:shadow-lg border border-border/50 touch-manipulation"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </motion.button>
              
              {/* Mobile Search Dropdown */}
              <AnimatePresence>
                {isSearchOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsSearchOpen(false)}
                      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    />
                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="fixed top-[73px] left-4 right-4 max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl menu-solid border border-border/50 shadow-xl p-3 z-50 md:hidden max-w-[calc(100vw-2rem)]"
                    >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const filtered = filteredResults;
                        if (filtered[searchHighlight]) {
                          const result = filtered[searchHighlight];
                          if (result.href) {
                            handleNavClick(result.href);
                            // Highlight the specific item based on type
                            setTimeout(() => {
                              let element: Element | null = null;
                              
                              if (result.type === 'project' && result.metadata?.project) {
                                element = document.querySelector(`[data-project-id="${result.metadata.project.id}"]`);
                              } else if (result.type === 'experience' && result.metadata?.experience) {
                                element = document.querySelector(`[data-experience-id="${result.metadata.experience.id}"]`);
                              } else if (result.type === 'education' && result.id) {
                                element = document.querySelector(`[data-education-id="${result.id}"]`);
                              } else if (result.type === 'skill' && result.id) {
                                element = document.querySelector(`[data-skill-name="${result.id}"]`);
                              } else if (result.type === 'certification' && result.id) {
                                element = document.querySelector(`[data-certification-id="${result.id}"]`);
                              }
                              
                              if (element) {
                                // Clear any existing highlights first
                                document.querySelectorAll('.search-highlight').forEach(el => {
                                  el.classList.remove('search-highlight');
                                });
                                
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                // Add highlight with custom CSS class
                                element.classList.add('search-highlight');
                                setTimeout(() => {
                                  element?.classList.remove('search-highlight');
                                }, 2000);
                              }
                            }, 500);
                          }
                          setIsSearchOpen(false);
                        } else if (filtered[0]) {
                          const result = filtered[0];
                          if (result.href) {
                            handleNavClick(result.href);
                            // Highlight the specific item based on type
                            setTimeout(() => {
                              let element: Element | null = null;
                              
                              if (result.type === 'project' && result.metadata?.project) {
                                element = document.querySelector(`[data-project-id="${result.metadata.project.id}"]`);
                              } else if (result.type === 'experience' && result.metadata?.experience) {
                                element = document.querySelector(`[data-experience-id="${result.metadata.experience.id}"]`);
                              } else if (result.type === 'education' && result.id) {
                                element = document.querySelector(`[data-education-id="${result.id}"]`);
                              } else if (result.type === 'skill' && result.id) {
                                element = document.querySelector(`[data-skill-name="${result.id}"]`);
                              } else if (result.type === 'certification' && result.id) {
                                element = document.querySelector(`[data-certification-id="${result.id}"]`);
                              }
                              
                              if (element) {
                                // Clear any existing highlights first
                                document.querySelectorAll('.search-highlight').forEach(el => {
                                  el.classList.remove('search-highlight');
                                });
                                
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                // Add highlight with custom CSS class
                                element.classList.add('search-highlight');
                                setTimeout(() => {
                                  element?.classList.remove('search-highlight');
                                }, 2000);
                              }
                            }, 500);
                          }
                          setIsSearchOpen(false);
                        }
                        const q = (debouncedSearchQuery || searchQuery).trim();
                        if (q) {
                          setRecentSearches((prev) => {
                            const next = [q, ...prev.filter((p) => p !== q)].slice(0, 5);
                            return next;
                          });
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/50 mb-2"
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsSearchOpen(true);
                          setSearchHighlight(0);
                        }}
                        onFocus={() => setIsSearchOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setSearchHighlight((prev) => Math.min(prev + 1, Math.max(filteredResults.length - 1, 0)));
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setSearchHighlight((prev) => Math.max(prev - 1, 0));
                          } else if (e.key === "Escape") {
                            setIsSearchOpen(false);
                          }
                        }}
                        placeholder="Search sections…"
                        className="bg-transparent outline-none text-sm placeholder:text-muted-foreground/80 flex-1"
                        ref={searchInputRef}
                        autoFocus
                      />
                    </form>
                    {(debouncedSearchQuery || searchQuery).trim().length === 0 ? (
                      <div>
                        <div className="px-2 py-1.5 text-[12px] uppercase tracking-wide text-muted-foreground/80">Available sections</div>
                        <div className="px-2 pb-2 flex flex-wrap gap-2">
                          {navItems.map((item) => (
                            <button
                              key={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                setIsSearchOpen(false);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card hover:bg-accent/30 border border-border/50 text-xs font-medium"
                            >
                              {item.icon && <item.icon className="w-3.5 h-3.5 text-primary" />}
                              {item.label}
                            </button>
                          ))}
                        </div>
                        {recentSearches.length > 0 && (
                          <>
                            <div className="px-2 py-1.5 text-[12px] uppercase tracking-wide text-muted-foreground/80">Recent</div>
                            <div className="px-2 pb-2 flex flex-wrap gap-2">
                              {recentSearches.map((q) => (
                                <button
                                  key={q}
                                  onClick={() => {
                                    setSearchQuery(q);
                                    const filtered = getFiltered(q);
                                    if (filtered[0]?.href) {
                                      handleNavClick(filtered[0].href);
                                    }
                                    setIsSearchOpen(false);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card hover:bg-accent/30 border border-border/50 text-xs font-medium"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        {filteredResults.length > 0 ? (
                          <div className="max-h-[60vh] overflow-y-auto">
                            {Object.entries(
                              filteredResults.reduce((acc, result) => {
                                if (!acc[result.type]) acc[result.type] = [];
                                acc[result.type].push(result);
                                return acc;
                              }, {} as Record<SearchResultType, SearchResult[]>)
                            ).map(([type, results]) => (
                              <div key={type} className="mb-3 last:mb-0">
                                <div className="px-2 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground/80 font-semibold flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${getTypeColor(type as SearchResultType).split(' ')[0]}`} />
                                  {getTypeLabel(type as SearchResultType)} ({results.length})
                                </div>
                                {results.map((result, idx) => {
                                  const globalIdx = filteredResults.indexOf(result);
                                  const Icon = result.icon || Search;
                                  return (
                                    <button
                                      key={`${result.type}-${result.id}`}
                                      onClick={() => {
                                        if (result.href) {
                                          handleNavClick(result.href);
                                          // Highlight the specific item based on type
                                          setTimeout(() => {
                                            let element: Element | null = null;
                                            
                                            if (result.type === 'project' && result.metadata?.project) {
                                              element = document.querySelector(`[data-project-id="${result.metadata.project.id}"]`);
                                            } else if (result.type === 'experience' && result.metadata?.experience) {
                                              element = document.querySelector(`[data-experience-id="${result.metadata.experience.id}"]`);
                                            } else if (result.type === 'education' && result.id) {
                                              element = document.querySelector(`[data-education-id="${result.id}"]`);
                                            } else if (result.type === 'skill' && result.id) {
                                              element = document.querySelector(`[data-skill-name="${result.id}"]`);
                                            } else if (result.type === 'certification' && result.id) {
                                              element = document.querySelector(`[data-certification-id="${result.id}"]`);
                                            }
                                            
                                            if (element) {
                                              // Clear any existing highlights first
                                              document.querySelectorAll('.search-highlight').forEach(el => {
                                                el.classList.remove('search-highlight');
                                              });
                                              
                                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                              // Add highlight with custom CSS class
                                              element.classList.add('search-highlight');
                                              setTimeout(() => {
                                                element?.classList.remove('search-highlight');
                                              }, 2000);
                                            }
                                          }, 500);
                                        }
                                        setIsSearchOpen(false);
                                      }}
                                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm flex items-start gap-3 group ${
                                        globalIdx === searchHighlight ? "bg-accent/40 border border-primary/20" : "hover:bg-muted/50"
                                      }`}
                                    >
                                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(type as SearchResultType)}`}>
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-medium text-foreground mb-0.5">
                                          {highlightText(result.title, debouncedSearchQuery || searchQuery)}
                                        </div>
                                        {result.subtitle && (
                                          <div className="text-xs text-muted-foreground line-clamp-1">
                                            {highlightText(result.subtitle, debouncedSearchQuery || searchQuery)}
                                          </div>
                                        )}
                                        {result.type === 'project' && result.metadata?.project && (
                                          <div className="flex items-center gap-2 mt-1.5">
                                            {result.metadata.project.githubUrl && (
                                              <a
                                                href={result.metadata.project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                              >
                                                <Github className="w-3 h-3" />
                                                <span>GitHub</span>
                                              </a>
                                            )}
                                            {result.metadata.project.liveUrl && (
                                              <a
                                                href={result.metadata.project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                              >
                                                <ExternalLink className="w-3 h-3" />
                                                <span>Live</span>
                                              </a>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="px-3 py-4 text-center">
                            <div className="text-sm text-muted-foreground mb-1">No matches found</div>
                            <div className="text-xs text-muted-foreground/70">Try searching for sections, projects, skills, or experience</div>
                          </div>
                        )}
                      </>
                    )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <ThemeToggle />
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-accent transition-colors flex items-center justify-center shadow-md hover:shadow-lg border border-border/50 touch-manipulation"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-2 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                    activeSection === item.href.slice(1)
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-primary-foreground shadow-lg shadow-amber-500/8"
                      : "bg-card hover:bg-accent border border-border/50 hover:border-primary/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

