"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The site's one orchestrated motion: the bio's word-by-word reveal, rebuilt
// from davidsenra.com's GSAP timing (docs/design/tokens.md). Opacity, not
// colour: white at 40% over black *is* the dim grey. Duration is twice the
// stagger, so each word's fade overlaps the next by half — that overlap is
// what makes it read as a wave rather than discrete pops.
const DUR = 0.1;
const STAG = 0.05;
const SMOOTH = 0.35; // seconds, exponential approach
const FROM = 0.4;

/**
 * Wraps text whose words are marked with `data-w` (see Bio). Without
 * JavaScript, or under prefers-reduced-motion, every word stays at full
 * opacity: the dim state is only applied once the effect is running.
 */
export function WordReveal({ className, children }: { className?: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (!words.length) return;

    const total = DUR + STAG * (words.length - 1);
    let target = 0;
    let current = 0;
    let last = performance.now();
    let frame = 0;

    const render = () => {
      for (let i = 0; i < words.length; i++) {
        const local = (current * total - i * STAG) / DUR;
        const k = local < 0 ? 0 : local > 1 ? 1 : local;
        words[i].style.opacity = (FROM + (1 - FROM) * k).toFixed(3);
      }
    };

    // Scroll range: the block's top entering the viewport bottom, to its
    // bottom reaching the viewport middle. Progress is clamped to [0, 1].
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = r.top + window.scrollY - vh;
      const end = r.top + window.scrollY + r.height - vh / 2;
      const p = (window.scrollY - start) / Math.max(1, end - start);
      target = p < 0 ? 0 : p > 1 ? 1 : p;
    };

    // Runs only while catching up with the scroll position, then sleeps.
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / SMOOTH));
      if (Math.abs(target - current) < 0.0005) current = target;
      render();
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      measure();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    measure();
    current = target;
    render();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      for (const w of words) w.style.opacity = "";
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
