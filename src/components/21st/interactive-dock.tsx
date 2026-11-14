"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Home,
  Sparkles,
  Shield,
  TrendingUp,
  Compass,
  Box,
  Heart,
  Mail,
} from "lucide-react";

interface DockItemProps {
  mouseX: any;
  icon: React.ReactNode;
  label: string;
  href: string;
}

function DockIcon({ mouseX, icon, label, href }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [42, 68, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height: width }}
      className="group relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-[#140f2e]/80 text-white backdrop-blur-xl shadow-xl transition-colors hover:border-purple-400/60 hover:bg-[#201847]"
    >
      <div className="flex h-5 w-5 items-center justify-center text-neutral-300 group-hover:text-amber-200 transition-colors">
        {icon}
      </div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-[#0a0718] border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
        {label}
      </span>
    </motion.a>
  );
}

export function InteractiveDock({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(Infinity);

  const ITEMS = [
    { icon: <Home className="h-4 w-4" />, label: "Início", href: "#hero" },
    { icon: <Sparkles className="h-4 w-4" />, label: "Flagship Bloom", href: "#historia" },
    { icon: <Shield className="h-4 w-4" />, label: "Virtudes", href: "#virtudes" },
    { icon: <TrendingUp className="h-4 w-4" />, label: "Estatísticas", href: "#estatisticas" },
    { icon: <Compass className="h-4 w-4" />, label: "Capítulos Apple", href: "#scrolly-chapter" },
    { icon: <Box className="h-4 w-4" />, label: "Cubos 3D", href: "#memorias" },
    { icon: <Heart className="h-4 w-4" />, label: "Interatividade", href: "#interatividade" },
    { icon: <Mail className="h-4 w-4" />, label: "Carta do Pai", href: "#letter" },
  ];

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-end gap-3 rounded-3xl border border-white/20 bg-[#0e0a24]/75 p-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}
    >
      {ITEMS.map((item, idx) => (
        <DockIcon
          key={idx}
          mouseX={mouseX}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </div>
  );
}
