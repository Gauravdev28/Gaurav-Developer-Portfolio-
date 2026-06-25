import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function Card3D({ children, className = "", maxTilt = 12 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse tracking normalized coordinates (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth spring configuration
  const springX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.6 });

  // Map normalized coordinate progress to tilt angle rotations
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  // Glow position indicators
  const shineX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="perspective-card-wrapper h-full w-full" style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
        }}
        className={`relative h-full w-full transition-all duration-300 ease-out ${className}`}
      >
        {/* Specular Shine Sheen Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 0.12 : 0,
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.7) 0%, transparent 60%)`,
          }}
        />
        
        {/* Visual offset wrapper */}
        <div className="h-full w-full" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
