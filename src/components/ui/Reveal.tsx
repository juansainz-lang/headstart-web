"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

// Headline that reveals line by line on scroll. Pass each line as a string;
// `highlight` colors ONE key word in copper (first occurrence only).
export function RevealLines({
  lines,
  highlight,
  onLoad = false,
  as: Tag = "h2",
  className = "",
}: {
  lines: string[];
  highlight?: string;
  // Above-the-fold headlines: animate with CSS on page load so they never wait for JavaScript.
  onLoad?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const hlLine = highlight ? lines.findIndex((l) => l.includes(highlight)) : -1;
  const render = (line: string, i: number): ReactNode => {
    if (i !== hlLine || !highlight) return line;
    const at = line.indexOf(highlight);
    return (
      <>
        {line.slice(0, at)}
        <span className="text-copper">{highlight}</span>
        {line.slice(at + highlight.length)}
      </>
    );
  };
  const reduce = useReducedMotion();
  if (onLoad) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <span className="line-reveal block" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
              {render(line, i)}
            </span>
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // Observe the (unclipped) wrapper: the inner span starts hidden by
        // overflow, so it would never count as "in view" by itself.
        <m.span
          key={i}
          className="block overflow-hidden pb-[0.08em]"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <m.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, ease, delay: i * 0.09 }}
          >
            {render(line, i)}
          </m.span>
        </m.span>
      ))}
    </Tag>
  );
}

// Subtle fade + slide-in for any block.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </m.div>
  );
}
