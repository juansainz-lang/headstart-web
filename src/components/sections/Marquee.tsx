"use client";

import { useEffect, useRef } from "react";
import Wave from "@/components/ui/Wave";

// Editorial ticker that speeds up with scroll velocity and follows scroll direction.
export default function Marquee({ facts }: { facts: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let dir = 1;
    let skew = 0;
    let lastY = window.scrollY;
    let prev = performance.now();
    let raf = 0;
    // Width of one copy of the text, measured on resize (not every frame).
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    // Only animate while on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        prev = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(loop);
      }
    });

    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const y = window.scrollY;
      const v = (y - lastY) / Math.max(dt, 1e-3); // px per second
      lastY = y;
      if (Math.abs(v) > 30) dir = v > 0 ? 1 : -1;
      const speed = 45 + Math.min(Math.abs(v) * 0.4, 1100);
      x -= speed * dt * dir;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      skew += (Math.max(-7, Math.min(7, v * 0.006)) - skew) * 0.12;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${(-skew).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {facts.map((f) => (
        <li
          key={f}
          className="flex items-center whitespace-nowrap font-display text-[1.6rem] font-bold tracking-tight text-ink md:text-[2.4rem]"
        >
          <span className="px-6 md:px-9">{f}</span>
          <span className="text-[0.7em] text-copper">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 bg-cream">
      <Wave tone="cream" />
      <div className="overflow-hidden border-b border-ink/10 py-5 md:py-7">
        <div ref={track} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
