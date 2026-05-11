"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({ to, suffix = "", duration = 1.8, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  const proxy = useRef({ val: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          proxy.current.val = 0;
          gsap.to(proxy.current, {
            val: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              if (el) el.textContent = Math.round(proxy.current.val) + suffix;
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
