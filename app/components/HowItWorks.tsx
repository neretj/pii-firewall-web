"use client";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    color: "var(--text-muted)",
    accent: "var(--border)",
    label: "Input",
    raw: `"Patient Ana García, DNI 12345678A, diagnosed with hypertension."`,
    desc: `Raw text with PII enters your system from the user or another service.`,
  },
  {
    num: "02",
    color: "#bd93f9",
    accent: "rgba(189,147,249,0.4)",
    label: "Detect",
    raw: `PERSON ── Ana García\nNATIONAL_ID ── 12345678A\nDIAGNOSIS ── hypertension ✓ (keep)`,
    desc: `One or more detection backends (regex, Presidio, GLiNER, Transformers) identify PII entities. Domain rules decide what to keep.`,
  },
  {
    num: "03",
    color: "var(--accent)",
    accent: "var(--accent-glow)",
    label: "Anonymize",
    raw: `"Patient PERSON_1, NATIONAL_ID_1, diagnosed with hypertension."`,
    desc: `Entities are replaced according to their disposition: pseudonymize, redact, mask, generalize, or suppress. A vault stores reversible mappings.`,
  },
  {
    num: "04",
    color: "var(--accent2)",
    accent: "rgba(0,212,170,0.3)",
    label: "LLM",
    raw: `LLM never sees\nreal personal data.`,
    desc: `The sanitized prompt is forwarded to any LLM provider — OpenAI, Anthropic, Mistral, local models, etc.`,
  },
  {
    num: "05",
    color: "#ffd166",
    accent: "rgba(255,209,102,0.3)",
    label: "Rehydrate",
    raw: `"Patient Ana García, DNI 12345678A, diagnosed with hypertension."`,
    desc: `The vault restores original values in the model's response. The end-user sees real names — the LLM never did.`,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.2)",
              color: "var(--accent)",
            }}
          >
            Architecture
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Detect · Anonymize · Rehydrate
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            PII Firewall acts as a transparent privacy layer between your
            application and any LLM — with zero changes to your existing prompt logic.
          </p>
        </div>

        {/* Flow diagram — desktop horizontal */}
        <div className="hidden lg:flex items-stretch gap-0 mb-16">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1 min-w-0">
              <div
                className="flex-1 rounded-2xl p-5 card-hover relative"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${s.accent}`,
                }}
              >
                <div
                  className="text-xs font-black mb-3 tracking-widest"
                  style={{ color: s.color }}
                >
                  {s.num}
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
                  {s.label}
                </div>
                <pre
                  className="text-xs rounded-lg p-2 mb-3 overflow-hidden"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    color: s.color,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {s.raw}
                </pre>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-shrink-0 px-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden flex flex-col gap-4 mb-16">
          {steps.map((s, i) => (
            <div key={s.num}>
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${s.accent}`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-black tracking-widest"
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                    {s.label}
                  </span>
                </div>
                <pre
                  className="text-xs rounded-lg p-2 mb-3"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    color: s.color,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {s.raw}
                </pre>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight
                    size={18}
                    className="rotate-90"
                    style={{ color: "var(--text-muted)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key insight callout */}
        <div
          className="rounded-2xl p-6 flex flex-wrap items-center gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,212,170,0.08) 100%)",
            border: "1px solid rgba(108,99,255,0.25)",
          }}
        >
          <div className="text-3xl">🔐</div>
          <div>
            <div className="font-bold mb-1" style={{ color: "var(--text)" }}>
              The LLM never sees real personal data
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Anonymization happens in your infrastructure. Real values never leave your trust boundary.
              Rehydration runs after the model responds, so end-users still see meaningful output.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
