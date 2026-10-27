"use client";

import { useEffect, useRef, type RefObject } from "react";

// Hero "chaos → order": hundreds of fine lines, tangled on the left (manual work) and
// perfectly parallel on the right (automated). The cursor untangles the lines it passes;
// scrolling through the pinned hero puts everything in order. Plain canvas, a few ms per frame: pauses
// off screen, thins itself on slow devices, draws one still frame for reduced motion.

const TAU = Math.PI * 2;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Line = { t: number; seed: number; alpha: number; width: number; copper: boolean; phase: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLines(count: number): Line[] {
  const rand = mulberry32(42);
  const copperAt = new Set([0.3, 0.52, 0.71].map((f) => Math.round(f * (count - 1))));
  return Array.from({ length: count }, (_, i) => {
    const r = rand();
    return {
      t: i / (count - 1),
      seed: rand(),
      alpha: i % 9 === 0 ? 0.42 : 0.08 + 0.22 * r * r,
      width: 0.6 + rand() * 0.6,
      copper: copperAt.has(i),
      phase: rand(),
    };
  });
}

export default function HeroFlow({
  mobile,
  reduced,
  hero,
}: {
  mobile: boolean;
  reduced: boolean;
  hero: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let lines = buildLines(mobile ? 64 : 150);
    let W = 1;
    let H = 1;
    let dprCap = mobile ? 1.5 : 1.75;
    let raf = 0;
    let running = false;
    let visible = true;
    let downgraded = false;
    const frameTimes: number[] = [];
    const st = { time: reduced ? 8 : 0, intro: reduced ? 1 : 0, scroll: 0, last: 0 };
    const pointer = { x: 0, y: 0, active: false, sx: -9999, sy: -9999, on: 0 };

    const measure = () => {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Where line `l` sits at horizontal position x, given how ordered the world is.
    const yAt = (l: Line, x: number, order: number, band: number, cy: number) => {
      const u = x / W;
      let ord = smooth(0.1, 0.8, u);
      ord += (1 - ord) * order;
      const spread = H * 0.04 + l.t * H * 0.92;
      const neat = cy + (l.t - 0.5) * band;
      const base = spread + (neat - spread) * ord;
      // The cursor untangles: chaos fades inside a soft circle around it.
      const dx = x - pointer.sx;
      const dy = base - pointer.sy;
      const calm = pointer.on * Math.exp(-(dx * dx + dy * dy) / (2 * 170 * 170));
      const chaos = (1 - ord) * (1 - calm * 0.9);
      const t = st.time;
      const n =
        Math.sin(x * 0.0062 + l.seed * TAU + t * 0.55) * 0.55 +
        Math.sin(x * 0.0131 - l.t * 9 + t * 0.9 + l.seed * 3) * 0.3 +
        Math.sin(x * 0.0029 + l.t * 4 - t * 0.35) * 0.65;
      return base + n * chaos * H * 0.17 + (base - pointer.sy) * calm * 0.06;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const s = st.scroll;
      const order = smooth(0, 0.55, s);
      const band = H * (mobile ? 0.36 : 0.3) * (1 - 0.45 * smooth(0.4, 1, s));
      const cy = H * 0.52;
      const glow = 1 + smooth(0.5, 1, s) * 0.9;
      const step = mobile ? 8 : 6;

      for (const l of lines) {
        const reveal = easeOut(clamp01(st.intro * 1.45 - l.t * 0.3 - l.seed * 0.15));
        if (reveal <= 0) continue;
        const xMax = W * reveal;
        ctx.beginPath();
        for (let x = 0; x <= xMax + step; x += step) {
          const px = Math.min(x, xMax);
          const y = yAt(l, px, order, band, cy);
          if (x === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        if (l.copper) {
          ctx.strokeStyle = `rgba(208,140,74,${0.1 * glow})`;
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.strokeStyle = `rgba(222,160,96,${Math.min(1, 0.85 * glow)})`;
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = `rgba(245,240,230,${Math.min(0.9, l.alpha * glow)})`;
          ctx.lineWidth = l.width;
        }
        ctx.stroke();

        // A pulse of light travels each copper line toward order.
        if (l.copper && st.intro > 0.6) {
          const head = ((st.time * 0.085 + l.phase) % 1) * W;
          for (let k = 0; k < 7; k++) {
            const hx = head - k * 9;
            if (hx < 0 || hx > xMax) continue;
            const hy = yAt(l, hx, order, band, cy);
            const a = (1 - k / 7) * 0.9;
            ctx.fillStyle = `rgba(255,214,170,${a})`;
            ctx.beginPath();
            ctx.arc(hx, hy, 2.2 - k * 0.22, 0, TAU);
            ctx.fill();
          }
          const hy = yAt(l, Math.min(head, xMax), order, band, cy);
          const g = ctx.createRadialGradient(head, hy, 0, head, hy, 28);
          g.addColorStop(0, "rgba(208,140,74,0.45)");
          g.addColorStop(1, "rgba(208,140,74,0)");
          ctx.fillStyle = g;
          ctx.fillRect(head - 28, hy - 28, 56, 56);
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      raf = 0;
      const elapsed = st.last ? Math.min((now - st.last) / 1000, 0.25) : 0.016;
      const dt = Math.min(elapsed, 0.05);
      st.last = now;

      // Too slow to keep ~45 fps after the intro? Draw fewer lines, at lower resolution.
      if (!downgraded && st.intro >= 1) {
        frameTimes.push(dt);
        if (frameTimes.length >= 60) {
          const sorted = [...frameTimes].sort((a, b) => a - b);
          if (sorted[30] > 0.022) {
            lines = buildLines(Math.round(lines.length * 0.55));
            dprCap = 1;
            measure();
          }
          downgraded = true; // measure once
        }
      }

      st.time += elapsed;
      st.intro = Math.min(1, st.intro + elapsed / 2.2);

      // Scroll progress across the pinned range (or the hero's own height if it isn't pinned).
      const heroH = hero.current?.offsetHeight ?? window.innerHeight;
      const pinned = heroH > window.innerHeight * 1.3;
      const range = pinned ? heroH - window.innerHeight : heroH * 0.85;
      const target = clamp01(window.scrollY / Math.max(range, 1));
      st.scroll += (target - st.scroll) * Math.min(1, dt * 6);

      // The untangling follows the cursor softly.
      if (pointer.active) {
        const r = canvas.getBoundingClientRect();
        const tx = pointer.x - r.left;
        const ty = pointer.y - r.top;
        if (pointer.sx < -999) {
          pointer.sx = tx;
          pointer.sy = ty;
        }
        pointer.sx += (tx - pointer.sx) * Math.min(1, dt * 7);
        pointer.sy += (ty - pointer.sy) * Math.min(1, dt * 7);
      }
      pointer.on += ((pointer.active ? 1 : 0) - pointer.on) * Math.min(1, dt * 3);

      draw();
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || reduced) return;
      running = true;
      st.last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    // Resizing clears the canvas: redraw right away so it's never blank, even while paused.
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(canvas);

    measure();
    if (reduced) draw();
    else start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mobile, reduced, hero]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
