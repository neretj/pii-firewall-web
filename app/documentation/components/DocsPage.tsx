"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Copy, Check } from "lucide-react";
import { docsSections } from "./docsData";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("python", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);

function escapeHtml(raw: string) {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function guessLanguage(code: string): "python" | "bash" | "javascript" | "typescript" | "json" {
  const trimmed = code.trim();

  if (
    trimmed.startsWith("pip ") ||
    trimmed.startsWith("pytest ") ||
    trimmed.startsWith("uvicorn ") ||
    trimmed.startsWith("python -c")
  ) {
    return "bash";
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return "json";
  }

  if (trimmed.includes("const ") || trimmed.includes("=>") || trimmed.includes("function ")) {
    return "javascript";
  }

  return "python";
}

function highlightCode(code: string): string {
  try {
    const language = guessLanguage(code);
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return escapeHtml(code);
  }
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border"
      style={{
        color: copied ? "#86efca" : copyError ? "#ffd38a" : "#eaf6ff",
        borderColor: copied
          ? "rgba(42,230,166,0.5)"
          : copyError
          ? "rgba(255,195,109,0.55)"
          : "rgba(125,214,255,0.55)",
        background: copied
          ? "rgba(42,230,166,0.14)"
          : copyError
          ? "rgba(255,195,109,0.14)"
          : "rgba(23,50,74,0.9)",
      }}
      aria-label={copied ? "Code copied" : copyError ? "Copy failed" : "Copy code"}
      title="Copy code"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : copyError ? "Retry" : "Copy"}
    </button>
  );
}

function toneColors(
  tone: "info" | "success" | "warn" | undefined,
  isLight: boolean
): { bg: string; border: string; text: string; softText: string } {
  if (tone === "success") {
    return isLight
      ? { bg: "rgba(0,168,126,0.1)", border: "rgba(0,168,126,0.35)", text: "#0f6b55", softText: "#2b5f54" }
      : { bg: "rgba(42,230,166,0.12)", border: "rgba(42,230,166,0.35)", text: "#86efca", softText: "#9ad9c1" };
  }
  if (tone === "warn") {
    return isLight
      ? { bg: "rgba(216,139,0,0.12)", border: "rgba(216,139,0,0.35)", text: "#8a5a00", softText: "#6b5726" }
      : { bg: "rgba(247,224,127,0.12)", border: "rgba(247,224,127,0.35)", text: "#f7e07f", softText: "#d7c890" };
  }

  return isLight
    ? { bg: "rgba(96,141,186,0.1)", border: "rgba(96,141,186,0.35)", text: "#2e4a66", softText: "#4f657c" }
    : { bg: "rgba(0,194,255,0.1)", border: "rgba(125,214,255,0.35)", text: "#8de2ff", softText: "#8ea5bd" };
}

function flattenIds() {
  const ids: string[] = [];
  for (const section of docsSections) {
    ids.push(section.id);
    for (const sub of section.subsections) ids.push(sub.id);
  }
  return ids;
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const desktopSidebarRef = useRef<HTMLDivElement | null>(null);
  const mobileSidebarRef = useRef<HTMLDivElement | null>(null);
  const allIds = useMemo(() => flattenIds(), []);

  const themeVars = isLight
    ? {
        "--bg": "#f3f8fd",
        "--surface": "#ffffff",
        "--surface2": "#e9f1fa",
        "--border": "#c3d5e7",
        "--accent": "#0077c8",
        "--accent2": "#00a87e",
        "--text": "#14283d",
        "--text-muted": "#4f657c",
      }
    : {};

  useEffect(() => {
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-24% 0px -64% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [allIds]);

  useEffect(() => {
    const desktopContainer = desktopSidebarRef.current;
    if (desktopContainer) {
      const activeDesktopLink = desktopContainer.querySelector<HTMLAnchorElement>(`a[data-doc-id="${activeId}"]`);
      activeDesktopLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    const mobileContainer = mobileSidebarRef.current;
    if (mobileContainer && mobileOpen) {
      const activeMobileLink = mobileContainer.querySelector<HTMLAnchorElement>(`a[data-doc-id="${activeId}"]`);
      activeMobileLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId, mobileOpen]);

  const onLinkClick = () => setMobileOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ ...(themeVars as CSSProperties), background: "var(--bg)" }}>
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{
          background: isLight ? "rgba(245,250,255,0.92)" : "rgba(8,14,22,0.88)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="w-full h-[68px] px-6 lg:px-10 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-wide" style={{ color: "var(--text)" }}>
            PII Firewall
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" style={{ color: "var(--text-muted)" }} className="hover:text-[var(--text)] transition-colors">Home</Link>
            <Link href="/documentation" style={{ color: "var(--text)" }} className="font-semibold">Documentation</Link>
            <a href="https://github.com/neretj/llm-pii-firewall" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }} className="hover:text-[var(--text)] transition-colors">GitHub</a>
            <button
              onClick={() => setIsLight((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-colors"
              style={{
                color: "var(--text)",
                borderColor: "var(--border)",
                background: isLight ? "rgba(20,40,61,0.06)" : "rgba(255,255,255,0.04)",
              }}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLight ? <Moon size={13} /> : <Sun size={13} />}
              {isLight ? "Dark" : "Light"}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 rounded-lg border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: isLight ? "rgba(20,40,61,0.05)" : "rgba(255,255,255,0.03)" }}
              onClick={() => setIsLight((v) => !v)}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="p-2 rounded-lg border"
              style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle docs navigation"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main
        className="w-full px-6 lg:px-10 py-8 pt-[84px]"
        style={{
          background: isLight
            ? "radial-gradient(1200px circle at 66% -10%, rgba(0,119,200,0.1), transparent 38%), radial-gradient(900px circle at 80% 20%, rgba(0,168,126,0.08), transparent 45%)"
            : "radial-gradient(1200px circle at 66% -10%, rgba(0,194,255,0.06), transparent 38%), radial-gradient(900px circle at 80% 20%, rgba(42,230,166,0.06), transparent 45%)",
        }}
      >
        <aside className="hidden lg:block fixed top-[88px] left-10 w-[290px] h-[calc(100vh-104px)] z-30">
          <nav
            ref={desktopSidebarRef}
            className="h-full overflow-y-auto overflow-x-hidden rounded-2xl p-4 pr-2"
            style={{
              border: "1px solid var(--border)",
              background: isLight ? "rgba(255,255,255,0.9)" : "rgba(8,14,22,0.74)",
              scrollBehavior: "smooth",
              scrollPaddingTop: "10px",
              scrollPaddingBottom: "10px",
              overscrollBehavior: "contain",
            }}
          >
            <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-muted)" }}>
              On this page
            </p>
            <div className="space-y-2">
              {docsSections.map((section) => {
                const sectionActive = activeId === section.id || section.subsections.some((s) => s.id === activeId);
                return (
                  <div key={section.id}>
                    <a
                      href={`#${section.id}`}
                      data-doc-id={section.id}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
                      style={{
                        color: sectionActive ? "var(--text)" : "var(--text-muted)",
                        background: sectionActive ? "rgba(0,194,255,0.1)" : "transparent",
                      }}
                    >
                      {section.title}
                    </a>
                    <div className="mt-1 ml-2 border-l pl-2 space-y-1" style={{ borderColor: "rgba(102,136,168,0.28)" }}>
                      {section.subsections.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          data-doc-id={sub.id}
                          className="block rounded-md px-2 py-1.5 text-xs transition-colors"
                          style={{
                            color: activeId === sub.id ? "var(--text)" : "var(--text-muted)",
                            background: activeId === sub.id ? "rgba(42,230,166,0.1)" : "transparent",
                          }}
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </aside>

        <section className="lg:ml-[330px] lg:mr-0 w-auto lg:flex lg:justify-center">
          {mobileOpen && (
            <div
              className="lg:hidden mb-4 rounded-2xl p-4"
              style={{
                border: "1px solid var(--border)",
                background: isLight ? "rgba(255,255,255,0.96)" : "rgba(8,14,22,0.9)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-muted)" }}>
                Navigate
              </p>
              <div
                ref={mobileSidebarRef}
                className="max-h-[52vh] overflow-y-auto overflow-x-hidden space-y-2 pr-1"
                style={{
                  scrollBehavior: "smooth",
                  scrollPaddingTop: "8px",
                  scrollPaddingBottom: "8px",
                  overscrollBehavior: "contain",
                }}
              >
                {docsSections.map((section) => (
                  <div key={section.id}>
                    <a
                      href={`#${section.id}`}
                      data-doc-id={section.id}
                      onClick={onLinkClick}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold"
                      style={{ color: "var(--text)", background: "rgba(0,194,255,0.1)" }}
                    >
                      {section.title}
                    </a>
                    <div className="mt-1 ml-2 border-l pl-2 space-y-1" style={{ borderColor: "rgba(102,136,168,0.28)" }}>
                      {section.subsections.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          data-doc-id={sub.id}
                          onClick={onLinkClick}
                          className="block rounded-md px-2 py-1.5 text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className="rounded-2xl p-6 md:p-10 w-full max-w-[1120px]"
            style={{
              border: "1px solid var(--border)",
              background: isLight
                ? "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,252,255,0.94))"
                : "linear-gradient(180deg, rgba(10,19,31,0.9), rgba(8,14,22,0.78))",
              boxShadow: isLight ? "0 22px 70px rgba(20,40,61,0.12)" : "0 26px 90px rgba(2,8,16,0.35)",
            }}
          >
            <div className="max-w-[940px] mx-auto">
              <div className="mb-12 border-b pb-8" style={{ borderColor: "rgba(102,136,168,0.25)" }}>
                <p className="text-xs uppercase tracking-[0.22em] mb-3" style={{ color: "var(--accent)" }}>
                  Documentation
                </p>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
                  PII Firewall Developer Guide
                </h1>
                <p className="text-[15px] md:text-[17px] leading-8 max-w-[84ch]" style={{ color: "var(--text-muted)" }}>
                  This documentation is structured for fast onboarding and deep implementation work. Start with Overview and Quickstart, then move to API, profiles, detectors, and operational compliance.
                </p>
              </div>

              <div className="space-y-14">
                {docsSections.map((section, idx) => {
                  const tone = {
                    chipBg: "rgba(0,194,255,0.14)",
                    chipBorder: "rgba(0,194,255,0.35)",
                    chipColor: "#8de2ff",
                    cardBg: isLight
                      ? "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(247,251,255,0.95))"
                      : "linear-gradient(180deg, rgba(5,11,18,0.66), rgba(4,9,15,0.48))",
                    cardBorder: isLight ? "rgba(164,189,214,0.65)" : "rgba(102,136,168,0.22)",
                    codeBg: "#0e1d31",
                    codeBorder: "rgba(125,214,255,0.44)",
                  };

                  return (
                <article key={section.id} id={section.id} className="scroll-mt-24 border-b pb-10" style={{ borderColor: "rgba(102,136,168,0.18)" }}>
                  <div className="mb-5">
                    <div>
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                        style={{ background: tone.chipBg, border: `1px solid ${tone.chipBorder}`, color: tone.chipColor }}
                      >
                        Section {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "var(--text)" }}>
                        {section.title}
                      </h2>
                      <p className="text-[15px] leading-7 mt-2 max-w-[88ch]" style={{ color: "var(--text-muted)" }}>
                        {section.intro}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {section.subsections.map((sub) => (
                      <section
                        key={sub.id}
                        id={sub.id}
                        className="scroll-mt-24 rounded-xl p-5 md:p-6"
                        style={{ border: `1px solid ${tone.cardBorder}`, background: tone.cardBg }}
                      >
                        <h3 className="text-lg md:text-xl font-bold mb-2.5" style={{ color: "var(--text)" }}>
                          {sub.title}
                        </h3>
                        {sub.tags && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {sub.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase"
                                style={{
                                  background: isLight ? "rgba(96,141,186,0.12)" : "rgba(125,214,255,0.14)",
                                  border: `1px solid ${isLight ? "rgba(96,141,186,0.35)" : "rgba(125,214,255,0.35)"}`,
                                  color: isLight ? "#2e4a66" : "#8de2ff",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-[15px] leading-7 max-w-[86ch]" style={{ color: "var(--text-muted)" }}>
                          {sub.body}
                        </p>

                        {sub.metrics && (
                          <div className="mt-4 grid sm:grid-cols-3 gap-2.5">
                            {sub.metrics.map((metric) => {
                              const colors = toneColors(metric.tone, isLight);
                              return (
                                <div
                                  key={metric.label}
                                  className="rounded-lg px-3 py-2.5"
                                  style={{ border: `1px solid ${colors.border}`, background: colors.bg }}
                                >
                                  <p className="text-[11px] uppercase tracking-[0.12em] font-semibold" style={{ color: colors.softText }}>
                                    {metric.label}
                                  </p>
                                  <p className="text-[14px] mt-1 font-semibold" style={{ color: colors.text }}>
                                    {metric.value}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {sub.callout && (
                          (() => {
                            const colors = toneColors(sub.callout?.tone, isLight);
                            return (
                          <div
                            className="mt-4 rounded-lg p-4"
                            style={{
                              border: `1px solid ${colors.border}`,
                              background: colors.bg,
                            }}
                          >
                            <p className="text-xs uppercase tracking-[0.14em] font-semibold mb-1.5" style={{ color: colors.text }}>
                              {sub.callout.label}
                            </p>
                            <p className="text-[14px] leading-6" style={{ color: colors.softText }}>
                              {sub.callout.text}
                            </p>
                          </div>
                            );
                          })()
                        )}

                        {sub.points && (
                          <ul className="mt-4 space-y-2 text-[15px] leading-7 list-disc pl-5" style={{ color: "var(--text-muted)" }}>
                            {sub.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        )}

                        {sub.checklist && (
                          <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                            {sub.checklist.map((item) => (
                              <div
                                key={item}
                                className="rounded-lg px-3 py-2 text-[14px]"
                                style={{
                                  border: `1px solid ${isLight ? "rgba(164,189,214,0.75)" : "rgba(102,136,168,0.3)"}`,
                                  background: isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.02)",
                                  color: "var(--text-muted)",
                                }}
                              >
                                <span style={{ color: isLight ? "#0f6baa" : "var(--accent)" }}>- </span>
                                {item}
                              </div>
                            ))}
                          </div>
                        )}

                        {sub.steps && (
                          <div className="mt-4 space-y-2.5">
                            {sub.steps.map((step, stepIndex) => (
                              <div
                                key={`${sub.id}-step-${stepIndex}`}
                                className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                                style={{
                                  border: `1px solid ${isLight ? "rgba(164,189,214,0.75)" : "rgba(102,136,168,0.3)"}`,
                                  background: isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.02)",
                                }}
                              >
                                <span
                                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full text-[11px] font-bold mt-0.5"
                                  style={{
                                    background: isLight ? "rgba(96,141,186,0.2)" : "rgba(125,214,255,0.16)",
                                    color: isLight ? "#2e4a66" : "#8de2ff",
                                  }}
                                >
                                  {stepIndex + 1}
                                </span>
                                <p className="text-[14px] leading-6" style={{ color: "var(--text-muted)" }}>
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {sub.doDont && (
                          <div className="mt-4 grid md:grid-cols-2 gap-3">
                            <div
                              className="rounded-lg p-3.5"
                              style={{
                                border: `1px solid ${isLight ? "rgba(0,168,126,0.35)" : "rgba(42,230,166,0.35)"}`,
                                background: isLight ? "rgba(0,168,126,0.08)" : "rgba(42,230,166,0.1)",
                              }}
                            >
                              <p className="text-xs uppercase tracking-[0.14em] font-semibold mb-2" style={{ color: isLight ? "#0f6b55" : "#86efca" }}>
                                Do
                              </p>
                              <ul className="space-y-1.5 text-[14px] leading-6" style={{ color: "var(--text-muted)" }}>
                                {sub.doDont.do.map((item) => (
                                  <li key={item}>- {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div
                              className="rounded-lg p-3.5"
                              style={{
                                border: `1px solid ${isLight ? "rgba(216,139,0,0.35)" : "rgba(247,224,127,0.35)"}`,
                                background: isLight ? "rgba(216,139,0,0.08)" : "rgba(247,224,127,0.09)",
                              }}
                            >
                              <p className="text-xs uppercase tracking-[0.14em] font-semibold mb-2" style={{ color: isLight ? "#8a5a00" : "#f7e07f" }}>
                                Avoid
                              </p>
                              <ul className="space-y-1.5 text-[14px] leading-6" style={{ color: "var(--text-muted)" }}>
                                {sub.doDont.avoid.map((item) => (
                                  <li key={item}>- {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {sub.table && (
                          <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${tone.codeBorder}` }}>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr style={{ background: isLight ? "rgba(96,141,186,0.12)" : "rgba(255,255,255,0.06)" }}>
                                    {sub.table.columns.map((col) => (
                                      <th
                                        key={col}
                                        className="text-left px-3.5 py-2.5 text-xs uppercase tracking-[0.12em] font-semibold"
                                        style={{ color: isLight ? "#2e4a66" : "#c8deef", borderBottom: `1px solid ${tone.codeBorder}` }}
                                      >
                                        {col}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sub.table.rows.map((row, rowIndex) => (
                                    <tr
                                      key={`${sub.id}-row-${rowIndex}`}
                                      style={{
                                        background: rowIndex % 2 === 0
                                          ? (isLight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.015)")
                                          : "transparent",
                                      }}
                                    >
                                      {row.map((cell, cellIndex) => (
                                        <td
                                          key={`${sub.id}-cell-${rowIndex}-${cellIndex}`}
                                          className="px-3.5 py-2.5 align-top"
                                          style={{ color: "var(--text-muted)", borderBottom: `1px solid ${isLight ? "rgba(164,189,214,0.45)" : "rgba(102,136,168,0.2)"}` }}
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {sub.code && (
                          <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${tone.codeBorder}` }}>
                            <div
                              className="px-4 py-2 flex items-center justify-between gap-3"
                              style={{
                                background: "#15283b",
                                borderBottom: "1px solid #33516d",
                              }}
                            >
                              <span className="text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "#f2f8ff" }}>
                                Example
                              </span>
                              <CopyCodeButton code={sub.code} />
                            </div>
                            <pre
                              className="p-4 text-[13px] overflow-x-auto docs-code-dark"
                              style={{
                                background: tone.codeBg,
                                color: "#f5fbff",
                                lineHeight: 1.72,
                              }}
                            >
                              <code
                                className="hljs"
                                dangerouslySetInnerHTML={{ __html: highlightCode(sub.code) }}
                              />
                            </pre>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
