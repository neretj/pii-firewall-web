"use client";

import { useState, useEffect } from "react";
import { Shield, GitBranch, Menu, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Domains", href: "#domains" },
  { label: "Backends", href: "#backends" },
  { label: "Quick start", href: "#quickstart" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#how-it-works");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:px-3 focus:py-2 focus:text-xs focus:font-semibold"
        style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--accent)" }}
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{ background: "rgba(0,194,255,0.16)", border: "1px solid rgba(0,194,255,0.38)" }}
          >
            <Shield size={16} color="var(--accent)" />
          </div>
          <span className="text-sm font-bold tracking-wide" style={{ color: "var(--text)" }}>
            PII Firewall
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1.5 tech-pill rounded-xl px-2 py-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={activeHref === l.href ? "page" : undefined}
              className="px-3 py-1.5 text-sm rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-[var(--text)]"
              style={{
                color: activeHref === l.href ? "var(--text)" : "var(--text-muted)",
                background: activeHref === l.href ? "rgba(0,194,255,0.12)" : "transparent",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/neretj/llm-pii-firewall"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--text)]"
            style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "rgba(13,22,34,0.6)" }}
          >
            <GitBranch size={14} />
            GitHub
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-mono"
              style={{ background: "rgba(0,194,255,0.14)", color: "var(--accent)" }}
            >
              <Star size={10} className="inline mr-0.5 mb-0.5" />
              OSS
            </span>
          </a>
          <a
            href="#quickstart"
            className="text-sm px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(130deg, var(--accent), var(--accent2))", color: "#032033" }}
          >
            Get started
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg transition-colors border"
          style={{ color: "var(--text-muted)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t overflow-hidden"
            style={{ background: "rgba(9,17,27,0.95)", borderColor: "var(--border)" }}
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={activeHref === l.href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm rounded-lg transition-colors hover:text-[var(--text)]"
                  style={{
                    color: activeHref === l.href ? "var(--text)" : "var(--text-muted)",
                    background: activeHref === l.href ? "rgba(0,194,255,0.1)" : "transparent",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <a
                  href="#quickstart"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: "linear-gradient(130deg, var(--accent), var(--accent2))", color: "#032033" }}
                >
                  Get started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}


