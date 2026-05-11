"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    color: "var(--text-muted)",
    accent: "var(--border)",
    label: "Input",
    raw: `"Patient Ana Garcia, DNI 12345678A,\ndiagnosed with hypertension."`,
    desc: `Raw text containing PII arrives from user or upstream service.`,
  },
  {
    num: "02",
    color: "#86b7ff",
    accent: "rgba(134,183,255,0.35)",
    label: "Detect",
    raw: `PERSON -- Ana Garcia\nNATIONAL_ID -- 12345678A\nDIAGNOSIS -- hypertension (keep)`,
    desc: `One or more backends (regex, Presidio, GLiNER, Transformers) detect entities. Domain rules decide what to keep.`,
  },
  {
    num: "03",
    color: "var(--accent)",
    accent: "var(--accent-glow)",
    label: "Anonymize",
    raw: `"Patient [PERSON_001], [REDACTED],\ndiagnosed with hypertension."`,
    desc: `Entities replaced per their disposition: keep, pseudonymize, redact, generalize, mask, or hash. Profile rules decide which action applies per entity type.`,
  },
  {
    num: "04",
    color: "var(--accent2)",
    accent: "rgba(0,212,170,0.3)",
    label: "-> LLM",
    raw: `LLM processes sanitized prompt.\nReal PII never transmitted.`,
    desc: `Sanitized prompt forwarded to any provider: OpenAI, Anthropic, Mistral, local models. Zero changes to prompt logic.`,
  },
  {
    num: "05",
    color: "#ffd166",
    accent: "rgba(255,209,102,0.3)",
    label: "Rehydrate",
    raw: `"Patient Ana Garcia, DNI 12345678A,\ndiagnosed with hypertension."`,
    desc: `Vault restores original values in the model's response. End-users see real names - the LLM never did.`,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,194,255,0.1)",
              border: "1px solid rgba(0,194,255,0.24)",
              color: "var(--accent)",
            }}
          >
            Architecture
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Detect · Anonymize · Rehydrate
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            A transparent privacy layer between your app and any LLM.
            Zero changes to your existing prompt logic.
          </p>
        </motion.div>

        {/* Flow diagram -- desktop horizontal */}
        <div className="hidden lg:flex items-stretch gap-0">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="flex-1 rounded-2xl p-5 card-hover relative tech-panel"
                style={{
                  border: `1px solid ${s.accent}`,
                }}
              >
                <div className="text-xs font-black mb-2 tracking-widest" style={{ color: s.color }}>
                  {s.num}
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
                  {s.label}
                </div>
                <pre
                  className="text-xs rounded-lg p-2.5 mb-3 overflow-hidden"
                  style={{
                    background: "rgba(4, 10, 18, 0.66)",
                    color: s.color,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {s.raw}
                </pre>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {s.desc}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 px-1" style={{ color: "var(--text-muted)" }}>
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden flex flex-col gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-2xl p-5 tech-panel"
              style={{ border: `1px solid ${s.accent}` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black tracking-widest" style={{ color: s.color }}>{s.num}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.label}</span>
              </div>
              <pre
                className="text-xs rounded-lg p-2 mb-2"
                style={{ background: "rgba(4, 10, 18, 0.66)", color: s.color, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {s.raw}
              </pre>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

