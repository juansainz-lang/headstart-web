"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, m, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { Content } from "@/lib/content";

const WEEKS_PER_YEAR = 46; // working weeks, after holidays and PTO
const WEEK_HOURS = 40;

// How manual work typically splits (illustrative proportions; labels come from the copy).
const shares = [0.3, 0.3, 0.2, 0.2];

function Slider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="label text-[0.6rem] text-cream/55">{label}</span>
        <span className="font-mono text-2xl font-semibold text-cream">
          {value}
          <span className="ml-1 text-sm text-cream/45">{unit}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-4"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </label>
  );
}

// "How many hours does your team spend on busywork?" — built only from the visitor's numbers.
export default function TimeCalculator({ t }: { t: Content["calc"] }) {
  const tasks = t.tasks.map((label, i) => ({ id: `task-${i}`, label, share: shares[i] ?? 0.25 }));
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const [people, setPeople] = useState(8);
  const [hours, setHours] = useState(6);
  const [who, setWho] = useState<"team" | "ai">("team");
  const [touched, setTouched] = useState(false);

  const yearly = people * hours * WEEKS_PER_YEAR;
  const weeks = Math.round(yearly / WEEK_HOURS);
  const spring = useSpring(yearly, { stiffness: 80, damping: 20 });
  const locale = t.numberLocale;
  const shown = useTransform(spring, (v) => Math.round(v).toLocaleString(locale));
  useEffect(() => spring.set(yearly), [yearly, spring]);

  // Play the "AI takes the paperwork" moment once, unless the visitor got there first.
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const id = setTimeout(() => setWho("ai"), 1600);
    return () => clearTimeout(id);
  }, [inView, touched, reduce]);

  const realWork = WEEK_HOURS - hours;
  const pick = (w: "team" | "ai") => {
    setTouched(true);
    setWho(w);
  };

  // In the person's lane a task can be too thin for its label; the AI lane always has room.
  const block = (task: (typeof tasks)[number], lane: "person" | "ai") => (
    <m.div
      key={task.id}
      layoutId={reduce ? undefined : task.id}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="flex min-w-0 items-center justify-center overflow-hidden rounded-lg border border-wine/50 bg-wine/35 px-1 text-[0.6rem] font-medium whitespace-nowrap text-cream/90"
      style={{ flexGrow: hours * task.share, flexBasis: 0 }}
      title={`${task.label}: ${(hours * task.share).toFixed(1)} h`}
    >
      {(lane === "ai" || hours * task.share >= 2.5) && <span className="truncate">{task.label}</span>}
    </m.div>
  );

  return (
    <div
      ref={ref}
      className="grain relative overflow-hidden rounded-[2rem] border border-cream/10 bg-navy-deep p-5 text-cream shadow-[0_40px_120px_-40px_rgb(0_0_0/0.7)] sm:p-8 md:p-10"
    >
      <div aria-hidden className="dot-grid-dark absolute inset-0" />
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Inputs */}
        <div className="space-y-8">
          <p className="label text-[0.6rem] text-copper-light">{t.yourNumbers}</p>
          <Slider
            label={t.people}
            value={people}
            min={1}
            max={50}
            unit={people === 1 ? t.personUnit : t.peopleUnit}
            onChange={(v) => {
              setTouched(true);
              setPeople(v);
            }}
          />
          <Slider
            label={t.hours}
            value={hours}
            min={1}
            max={20}
            unit="h"
            onChange={(v) => {
              setTouched(true);
              setHours(v);
            }}
          />
          <p className="text-sm text-cream/45">{t.note.replace("{weeks}", String(WEEKS_PER_YEAR))}</p>
        </div>

        {/* Result */}
        <div>
          <p className="font-display text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.9] font-bold tracking-tight text-copper-light tabular-nums">
            <m.span>{shown}</m.span>
          </p>
          <p className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
            {t.result}
          </p>
          <p className="mt-2 text-cream/60">
            {t.weeksLead} <span className="font-semibold text-cream">{weeks.toLocaleString(locale)} {t.weeksTail}</span>.{" "}
            {t.every}
          </p>

          {/* A typical week: who does the busywork? */}
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="label text-[0.58rem] text-cream/50">{t.weekTitle}</p>
              <div className="inline-flex rounded-full border border-cream/15 p-1" role="radiogroup" aria-label={t.weekAria}>
                {(["team", "ai"] as const).map((w) => (
                  <button
                    key={w}
                    role="radio"
                    aria-checked={who === w}
                    onClick={() => pick(w)}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      who === w ? "text-white" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {who === w && (
                      <m.span
                        layoutId="who-pill"
                        className="absolute inset-0 rounded-full bg-copper"
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      />
                    )}
                    <span className="relative">{w === "team" ? t.yourTeam : t.ai}</span>
                  </button>
                ))}
              </div>
            </div>

            <LayoutGroup>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <span className="label text-[0.55rem] text-cream/50">{t.person}</span>
                  <div className="flex h-11 gap-1">
                    <m.div
                      layout={!reduce}
                      transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      className="flex min-w-0 items-center justify-center rounded-lg bg-copper text-xs font-semibold text-white"
                      style={{ flexGrow: who === "ai" ? WEEK_HOURS : realWork, flexBasis: 0 }}
                    >
                      <span className="truncate px-2">
                        {t.focus} · {who === "ai" ? WEEK_HOURS : realWork} h
                      </span>
                    </m.div>
                    {who === "team" && tasks.map((task) => block(task, "person"))}
                  </div>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <span className="label text-[0.55rem] text-copper-light">{t.aiLane}</span>
                  <div className="flex h-11 gap-1 rounded-lg border border-dashed border-cream/15 p-1">
                    {who === "ai" ? (
                      tasks.map((task) => block(task, "ai"))
                    ) : (
                      <span className="label flex flex-1 items-center justify-center text-[0.52rem] text-cream/30">
                        {t.idle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </LayoutGroup>
            <m.p
              key={who}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-cream/70"
            >
              {who === "ai"
                ? t.aiLine
                : t.teamLine.replace("{focus}", String(realWork)).replace("{hours}", String(hours))}
            </m.p>
          </div>
        </div>
      </div>
    </div>
  );
}
