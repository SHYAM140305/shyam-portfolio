"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface HeroRoleTickerProps {
  roles: string[];
  className?: string;
}

const BASE_CLASS =
  "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground tracking-tight px-2";

const HeroRoleTickerComponent = ({ roles, className }: HeroRoleTickerProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const staticLabel = useMemo(() => roles.join(" • "), [roles]);

  useEffect(() => {
    if (!roles.length) return;

    if (shouldReduceMotion) {
      if (typedText !== staticLabel) {
        setTypedText(staticLabel);
      }
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    const typeSpeed = 65;
    const deleteSpeed = 35;
    const holdDelay = 550;

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting) {
      if (typedText.length < currentRole.length) {
        timer = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdDelay);
      }
    } else if (typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentRole.slice(0, typedText.length - 1));
      }, deleteSpeed);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [roles, roleIndex, typedText, isDeleting, shouldReduceMotion, staticLabel]);

  const displayText = shouldReduceMotion
    ? staticLabel
    : typedText || "\u00A0";

  return (
    <div className={`${BASE_CLASS} ${className ?? ""}`.trim()}>
      <span className="inline-flex items-center gap-2">
        <span className="min-h-[1.4em] gradient-text font-semibold tracking-tight">
          {displayText}
        </span>
        {!shouldReduceMotion && <span className="golden-caret" aria-hidden="true" />}
      </span>
    </div>
  );
};

export const HeroRoleTicker = memo(HeroRoleTickerComponent);
HeroRoleTicker.displayName = "HeroRoleTicker";

