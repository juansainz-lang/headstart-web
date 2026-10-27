"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

// Browser-tab title follows the section in the middle of the screen.
export default function SectionTitle({ titles }: { titles: [id: string, label: string][] }) {
  useEffect(() => {
    const original = document.title;
    const labels = new Map<string, string | null>([["top", null], ...titles]);
    const set = (id: string) => {
      const label = labels.get(id);
      document.title = label ? `${label} · ${site.name}` : site.name;
    };
    set("top");

    // A zero-height line across the middle of the viewport: one section crosses it at a time.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) set(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of labels.keys()) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => {
      io.disconnect();
      document.title = original;
    };
  }, [titles]);

  return null;
}
