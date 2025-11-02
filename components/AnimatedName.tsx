"use client";

import { useState, useEffect, useRef } from "react";

export function AnimatedName() {
  const name = "Shyam J";
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [gyroTilt, setGyroTilt] = useState({ x: 0, y: 0 });

  // Different muted colors for each letter
  const letterColors = [
    "#60a5fa", // Soft Blue - S
    "#a78bfa", // Soft Purple - h
    "#f472b6", // Soft Pink - y
    "#34d399", // Soft Cyan - a
    "#4ade80", // Soft Emerald - m
    "#fbbf24", // Soft Amber - space (will be transparent)
    "#f87171", // Soft Red - J
  ];

  // Mouse move tracking for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setTilt({
        x: Math.max(-1, Math.min(1, x)) * 15, // Max 15 degrees
        y: Math.max(-1, Math.min(1, y)) * 15,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Gyroscope/device orientation tracking
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        const beta = Math.max(-90, Math.min(90, e.beta || 0));
        const gamma = Math.max(-90, Math.min(90, e.gamma || 0));
        
        setGyroTilt({
          x: (gamma / 90) * 10, // Scale to max 10 degrees
          y: (beta / 90) * 10,
        });
      }
    };

    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      // Request permission for iOS 13+
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((response: string) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(() => {
            // Permission denied, continue without gyro
          });
      } else {
        // Non-iOS devices
        window.addEventListener("deviceorientation", handleOrientation);
      }
      
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, []);

  // Combine mouse and gyro tilt
  const combinedTilt = {
    x: tilt.x + gyroTilt.x,
    y: tilt.y + gyroTilt.y,
  };

  return (
    <h1
      ref={containerRef}
      className="hero-name text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 sm:mb-8 leading-[1.1] overflow-visible px-4"
      style={{
        transform: `perspective(1000px) rotateX(${-combinedTilt.y}deg) rotateY(${combinedTilt.x}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      <span className="hero-name-container">
        {name.split("").map((letter, index) => {
          if (letter === " ") {
            return <span key={index} className="hero-letter-space" />;
          }
          
          const color = letterColors[index % letterColors.length];
          
          return (
            <span
              key={index}
              className="hero-letter"
              style={{
                "--letter-color": color,
              } as React.CSSProperties}
            >
              {letter}
            </span>
          );
        })}
      </span>
    </h1>
  );
}