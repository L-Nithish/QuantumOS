import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(255,255,255,0.06)",
  ...props
}: TiltCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.015,
        borderColor: "rgba(255, 255, 255, 0.16)",
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      className={`relative rounded-3xl border border-white/[0.06] bg-[#0c0c0e]/45 transition-colors duration-300 ${className}`}
      {...props}
    >
      <div className="w-full h-full relative z-10">
        {children}
      </div>

      {/* Static subtle background radial gradient */}
      <div 
        className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          borderRadius: "inherit",
        }}
      />
    </motion.div>
  );
}
