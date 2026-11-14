"use client";

import React from "react";

interface MeteorShowerProps {
  number?: number;
  className?: string;
}

/**
 * 21st.dev / Magic UI Meteors Component.
 * Diagonal shooting stars with trailing glow across dark backgrounds.
 */
export function MeteorShower({
  number = 20,
  className = "",
}: MeteorShowerProps) {
  const meteors = new Array(number).fill(true);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {meteors.map((_, idx) => {
        const left = Math.floor(Math.random() * 800 - 400) + "px";
        const delay = Math.random() * 1 + 0.2 + "s";
        const duration = Math.floor(Math.random() * 8 + 2) + "s";

        return (
          <span
            key={"meteor" + idx}
            style={{
              top: "-40px",
              left: `calc(50% + ${left})`,
              animationDelay: delay,
              animationDuration: duration,
            }}
            className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor-fall rounded-[9999px] bg-slate-300 shadow-[0_0_0_1px_#ffffff10]"
          >
            {/* Meteor Trail */}
            <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-400 to-transparent" />
          </span>
        );
      })}
    </div>
  );
}
