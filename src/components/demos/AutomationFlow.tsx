"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import type { Content } from "@/lib/content";
import { ease } from "@/lib/motion";
import { CheckIcon } from "@/components/ui/Check";

type Flow = Content["flow"];
const STEPS = 5;
const STEP_MS = 1300;

// One automation from the inside: a request arrives, AI classifies it, pulls out the data,
// triggers the actions and logs the result. Plays when on screen; pick another request or
// replay any time. FICTIONAL companies and data (tagged "Example").
export default function AutomationFlow({ t }: { t: Flow }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "0px 0px -25% 0px" });
  const [ex, setEx] = useState(0);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const shown = reduce ? STEPS : step;
  const e = t.examples[ex];

  useEffect(() => {
    if (!inView || reduce || step >= STEPS) return;
    const id = setTimeout(() => setStep((s) => s + 1), step === 0 ? 450 : STEP_MS);
    return () => clearTimeout(id);
  }, [inView, reduce, step, run]);

  const restart = (next = ex) => {
    setEx(next);
    setStep(0);
    setRun((r) => r + 1);
  };

  return (
    <div ref={box} className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white text-ink shadow-[0_40px_100px_-40px_rgb(15_27_45/0.45)]">
      {/* Header: pick a request */}
      <div className="flex items-center justify-between gap-2 bg-navy px-3 py-3 text-cream sm:gap-3 sm:px-7 sm:py-4">
        <div role="tablist" aria-label={t.pick} className="swipe flex min-w-0 gap-1 overflow-x-auto sm:flex-wrap sm:gap-1.5">
          {t.examples.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={ex === i}
              onClick={() => restart(i)}
              className={`relative min-h-11 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors sm:min-h-0 sm:px-3.5 ${
                ex === i ? "text-white" : "text-cream/60 hover:text-cream"
              }`}
            >
              {ex === i && (
                <m.span layoutId="flow-tab" className="absolute inset-0 rounded-full bg-copper" transition={{ type: "spring", stiffness: 300, damping: 26 }} />
              )}
              <span className="relative">{x.tab}</span>
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            onClick={() => restart()}
            aria-label={t.replay}
            className="label grid size-11 place-items-center rounded-full border border-cream/15 text-cream/75 hover:text-cream sm:size-auto sm:border-0 sm:text-[0.58rem] sm:underline sm:decoration-copper/60 sm:underline-offset-4"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] sm:hidden">
              <path d="M3 12a9 9 0 1 0 2.6-6.4" />
              <path d="M3 3.5V9h5.5" />
            </svg>
            <span className="hidden sm:inline">↻ {t.replay}</span>
          </button>
          {/* On phones the footnote below carries the "Example" label, so the three requests fit. */}
          <span className="label hidden rounded-full border border-cream/20 px-2.5 py-1 text-[0.55rem] text-cream/65 sm:inline-flex">{t.exampleTag}</span>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* The incoming email */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-ink/10 bg-cream/60 p-3 sm:p-5">
            <p className="label flex items-center gap-2 text-[0.58rem] text-ink/45">
              <span className="relative inline-flex size-2">
                {shown >= 1 && shown < STEPS && <span className="animate-ping-soft absolute inset-0 rounded-full bg-copper" />}
                <span className="relative size-2 rounded-full bg-copper" />
              </span>
              {t.inbox}
            </p>
            <AnimatePresence mode="wait">
              {shown >= 1 ? (
                <m.div
                  key={`${e.id}-${run}`}
                  initial={reduce ? false : { opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="mt-3 rounded-xl border border-ink/10 bg-white p-3.5 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] sm:p-4"
                >
                  <p className="truncate font-mono text-[0.7rem] text-ink/50">{e.from}</p>
                  <p className="mt-1 font-semibold leading-snug">{e.subject}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/65 lg:line-clamp-none">{e.body}</p>
                  <div className="mt-3 flex min-h-7 flex-wrap gap-1.5 lg:mt-4">
                    {shown >= 2 && (
                      <>
                        <Chip tone="copper">{e.intent}</Chip>
                        <Chip tone="ink">{e.priority}</Chip>
                      </>
                    )}
                  </div>
                </m.div>
              ) : (
                <div key="empty" className="mt-3 grid h-28 place-items-center rounded-xl border border-dashed border-ink/15 lg:h-40">
                  <span className="label text-[0.55rem] text-ink/30">…</span>
                </div>
              )}
            </AnimatePresence>
          </div>
          <div className="hidden lg:block">
            <Done show={shown >= STEPS} text={t.done} reduce={!!reduce} />
          </div>
        </div>

        {/* The pipeline */}
        <ol className="relative min-w-0">
          <span aria-hidden className="absolute top-3 bottom-3 left-[13px] w-px bg-ink/10" />
          <m.span
            aria-hidden
            className="absolute top-3 left-[13px] w-px origin-top bg-copper"
            style={{ bottom: 12 }}
            initial={false}
            animate={{ scaleY: Math.max(0, (shown - 1) / (STEPS - 1)) }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          />
          {t.steps.map((name, i) => {
            const done = shown > i;
            const active = shown === i + 1 && shown < STEPS;
            const latest = i === Math.min(shown, STEPS) - 1;
            return (
              <li key={name} className="relative pb-3.5 pl-11 last:pb-0 lg:pb-5">
                <span
                  className={`absolute top-0 left-0 grid size-7 place-items-center rounded-full border text-[0.6rem] font-mono transition-colors duration-300 ${
                    done ? "border-copper bg-copper text-white" : "border-ink/15 bg-white text-ink/40"
                  } ${active ? "shadow-[0_0_0_6px_rgb(184_115_51/0.18)]" : ""}`}
                >
                  {done ? <CheckIcon className="size-3.5" /> : `0${i + 1}`}
                </span>
                <p className={`pt-1 font-semibold tracking-tight transition-colors ${done ? "text-ink" : "text-ink/40"}`}>{name}</p>
                <AnimatePresence initial={false}>
                  {done && (
                    <m.div
                      key={`${e.id}-${run}-${i}`}
                      initial={reduce ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className={`overflow-hidden ${latest ? "" : "max-lg:hidden"}`}
                    >
                      <StepBody i={i} e={e} />
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
        <div className="lg:hidden">
          <Done show={shown >= STEPS} text={t.done} reduce={!!reduce} />
        </div>
      </div>
      <p className="label border-t border-ink/10 px-5 py-3 text-[0.52rem] text-ink/35 sm:px-7">{t.footnote}</p>
    </div>
  );
}

function Done({ show, text, reduce }: { show: boolean; text: string; reduce: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <m.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="font-display text-lg font-bold tracking-tight lg:mt-5 lg:text-2xl"
        >
          {text}
        </m.p>
      )}
    </AnimatePresence>
  );
}

function StepBody({ i, e }: { i: number; e: Flow["examples"][number] }) {
  if (i === 0) return <p className="mt-1.5 truncate text-sm text-ink/55">{e.subject}</p>;
  if (i === 1)
    return (
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip tone="copper">{e.intent}</Chip>
        <Chip tone="ink">{e.priority}</Chip>
      </div>
    );
  if (i === 2)
    return (
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-xl bg-cream/60 px-3 py-2.5 text-sm">
        {e.fields.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-mono text-[0.68rem] text-ink/45 uppercase">{k}</dt>
            <dd className="truncate font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    );
  if (i === 3)
    return (
      <ul className="mt-2 space-y-1.5 text-sm">
        {e.actions.map((a) => (
          <li key={a} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-copper" />
            {a}
          </li>
        ))}
      </ul>
    );
  return <p className="mt-2 rounded-xl border border-copper/30 bg-copper/[0.07] px-3 py-2 font-mono text-[0.72rem] text-ink/75">{e.report}</p>;
}

function Chip({ tone, children }: { tone: "copper" | "ink"; children: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${
        tone === "copper" ? "bg-copper/15 text-copper" : "bg-ink/[0.06] text-ink/65"
      }`}
    >
      {children}
    </span>
  );
}
