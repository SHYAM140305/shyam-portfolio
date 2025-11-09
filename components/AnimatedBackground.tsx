"use client";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Optimized: Use CSS animations instead of framer-motion for better performance */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 dark:opacity-20 bg-gradient-orb-1"
        style={{
          top: "20%",
          left: "10%",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />

      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-30 dark:opacity-20 bg-gradient-orb-2"
        style={{
          bottom: "20%",
          right: "10%",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      />

      {/* Subtle center accent - static for better performance */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-20 dark:opacity-15 bg-gradient-orb-3"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translateZ(0)",
        }}
      />
    </div>
  );
}

