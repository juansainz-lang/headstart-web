"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Ships only the small animation core with the page; the full feature set
// (gestures, layout animations…) loads in a separate chunk right after.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
