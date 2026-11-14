"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  triggerOnHover?: boolean;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * 21st.dev / Magic UI HyperText component.
 * Scrambles characters into a high-tech decryption animation on hover or mount.
 */
export function HyperText({
  children,
  className = "",
  duration = 800,
  triggerOnHover = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const isAnimating = useRef(false);
  const iterations = useRef(0);

  const triggerAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    iterations.current = 0;

    const totalSteps = children.length;
    const intervalTime = duration / (totalSteps * 2);

    const interval = setInterval(() => {
      setDisplayText(() =>
        children
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations.current) {
              return children[index];
            }
            return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
          })
          .join("")
      );

      iterations.current += 1 / 2;

      if (iterations.current >= totalSteps) {
        clearInterval(interval);
        setDisplayText(children);
        isAnimating.current = false;
      }
    }, intervalTime);
  };

  useEffect(() => {
    triggerAnimation();
  }, [children]);

  return (
    <motion.span
      onMouseEnter={() => {
        if (triggerOnHover) triggerAnimation();
      }}
      className={`inline-block font-mono cursor-default select-none tracking-tight ${className}`}
    >
      {displayText}
    </motion.span>
  );
}
