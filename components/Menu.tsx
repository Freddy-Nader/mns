"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import styles from "./Menu.module.css";

/**
 * The hamburger is present at every width (docs/design/landing-page.md §1):
 * on desktop it holds everything the five-item nav omits.
 */
export function Menu({
  openLabel,
  closeLabel,
  children,
}: {
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) close.current?.focus();
    else if (wasOpen.current) burger.current?.focus();
    wasOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Following a link closes the menu, including same-page anchors.
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <>
      <button
        ref={burger}
        className={styles.burger}
        type="button"
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div id="menu" className={`${styles.menu} on-dark`} hidden={!open} onClick={onClick}>
        <button
          ref={close}
          className={styles.close}
          type="button"
          aria-label={closeLabel}
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {children}
      </div>
    </>
  );
}
