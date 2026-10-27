"use client";

import { m, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

// Hand-drawn check: soft copper disc + a stroke that draws itself when it scrolls into view.
// Use it for every bullet or "done" mark (never a plain dot or a ✓ glyph).
export function CheckIcon({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 20 20" className={`shrink-0 ${className}`} aria-hidden>
      <circle cx="10" cy="10" r="9.25" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <m.path
        d="M5.8 10.3 8.7 13.1 14.3 7.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.55, delay, ease }}
      />
    </svg>
  );
}
