"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Home, User, Wrench, Code, Terminal, Trophy, Briefcase, GraduationCap, Mail, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

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
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update scrolled state if it changed significantly
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsScrolled(currentScrollY > 20);
        lastScrollY = currentScrollY;
      }

      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          // Update active section based on scroll position
          const sections = navItems.map((item) => item.href.slice(1));
          const current = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (current && current !== activeSection) {
            setActiveSection(current);
          }
          
          ticking = false;
          rafId = null;
        });
        
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [activeSection]);

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

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 150); // 150ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Fuzzy search helpers - Memoized
  const normalize = useCallback((s: string) => s.toLowerCase().trim(), []);
  const getScore = useCallback((label: string, query: string, aliases: string[] = []) => {
    const l = normalize(label);
    const q = normalize(query);
    if (!q) return 0;
    if (l === q) return 100;
    if (l.startsWith(q)) return 90;
    if (l.includes(q)) return 70;
    for (const a of aliases) {
      const an = normalize(a);
      if (an === q) return 85;
      if (an.startsWith(q)) return 75;
      if (an.includes(q)) return 55;
    }
    return 0;
  }, [normalize]);
  
  const getFiltered = useMemo(() => {
    return (query: string) =>
      navItems
        .map((it) => ({ ...it, score: getScore(it.label, query, (it as any).aliases || []) }))
        .filter((it) => it.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
  }, [getScore]);

  const highlightLabel = (label: string, query: string) => {
    const q = normalize(query);
    const l = label;
    if (!q) return <span>{l}</span>;
    const idx = l.toLowerCase().indexOf(q);
    if (idx === -1) return <span>{l}</span>;
    const before = l.slice(0, idx);
    const match = l.slice(idx, idx + q.length);
    const after = l.slice(idx + q.length);
    return (
      <span>
        {before}
        <span className="font-semibold text-foreground">{match}</span>
        {after}
      </span>
    );
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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      {/* Subtle gradient line when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
      )}
      <div className="container mx-auto px-4 py-4">
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
                  const filtered = getFiltered(debouncedSearchQuery || searchQuery);
                  if (filtered[searchHighlight]) {
                    handleNavClick(filtered[searchHighlight].href);
                    setIsSearchOpen(false);
                  } else if (filtered[0]) {
                    handleNavClick(filtered[0].href);
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
                    const filtered = getFiltered(debouncedSearchQuery || searchQuery);
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSearchHighlight((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSearchHighlight((prev) => Math.max(prev - 1, 0));
                    } else if (e.key === "Enter") {
                      // handled by onSubmit
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
                    className="absolute left-0 mt-2 w-80 rounded-xl menu-solid border border-border/50 shadow-xl p-2 z-50"
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
                                  if (filtered[0]) {
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
                        {getFiltered(debouncedSearchQuery || searchQuery)
                          .map((item, idx) => (
                            <button
                              key={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                setIsSearchOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                                idx === searchHighlight ? "bg-accent/30" : "hover:bg-muted"
                              }`}
                            >
                              {item.icon && <item.icon className="w-4 h-4 text-primary" />}
                              <span>{highlightLabel(item.label, debouncedSearchQuery || searchQuery)}</span>
                            </button>
                          ))}
                        {getFiltered(debouncedSearchQuery || searchQuery).length === 0 && (
                          <div className="px-3 py-2 text-sm text-muted-foreground">No matches</div>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
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
              {/* Mobile Search */}
              <div className="px-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const filtered = navItems.filter((i) =>
                      i.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
                    );
                    if (filtered[0]) {
                      setIsMobileMenuOpen(false);
                      handleNavClick(filtered[0].href);
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border/50 shadow-sm"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search…"
                    className="bg-transparent outline-none text-sm placeholder:text-muted-foreground/80 w-full"
                  />
                </form>
                {searchQuery.trim().length === 0 && (
                  <div className="mt-2 px-1">
                    <div className="px-2 py-1.5 text-[12px] uppercase tracking-wide text-muted-foreground/80">Available sections</div>
                    <div className="px-2 pb-2 flex flex-wrap gap-2">
                      {navItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleNavClick(item.href);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card hover:bg-accent/30 border border-border/50 text-xs font-medium"
                        >
                          {item.icon && <item.icon className="w-3.5 h-3.5 text-primary" />}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

