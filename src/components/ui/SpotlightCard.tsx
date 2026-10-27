"use client";

import type { PointerEvent, ReactNode } from "react";

// Card with a soft copper spotlight that follows the cursor.
export default function SpotlightCard({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div id={id} onPointerMove={onPointerMove} className={`group relative isolate scroll-mt-24 overflow-hidden ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(184 115 51 / 0.18), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
