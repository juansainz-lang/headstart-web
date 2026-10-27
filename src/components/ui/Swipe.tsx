"use client";

import { Children, useRef, useState, type ReactNode } from "react";

// Phone carousel: cards slide sideways and snap one by one, with tappable dots underneath
// showing where you are. From md up it's a normal grid (pass the grid classes in className).
export default function Swipe({
  as: Tag = "ul",
  className = "",
  dots = "light",
  children,
}: {
  as?: "ul" | "ol" | "div";
  className?: string;
  dots?: "light" | "dark";
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const itemsOf = (el: HTMLElement) => [...el.children] as HTMLElement[];
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const items = itemsOf(el);
    const start = items[0]?.offsetLeft ?? 0;
    let best = 0;
    items.forEach((it, i) => {
      if (Math.abs(it.offsetLeft - start - el.scrollLeft) < Math.abs(items[best].offsetLeft - start - el.scrollLeft)) best = i;
    });
    setActive(best);
  };
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const items = itemsOf(el);
    el.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  return (
    <>
      <Tag
        ref={(el: HTMLElement | null) => {
          ref.current = el;
        }}
        onScroll={onScroll}
        className={`swipe -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${className}`}
      >
        {children}
      </Tag>
      {count > 1 && (
        <div className="mt-3 flex justify-center gap-1 md:hidden">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === active}
              className="grid h-8 w-6 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-copper" : `w-1.5 ${dots === "dark" ? "bg-cream/25" : "bg-ink/20"}`}`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
