"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Verzögerung in ms – für gestaffelte Listen */
  delay?: number;
  className?: string;
};

/** Blendet den Inhalt sanft ein, sobald er in den Viewport scrollt. */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);

    // Notbremse: falls der Observer aus irgendeinem Grund nie auslöst,
    // wird der Inhalt trotzdem sichtbar. Eine unsichtbare Seite wäre
    // schlimmer als eine ohne Animation.
    const failsafe = setTimeout(() => setShown(true), 2500);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
