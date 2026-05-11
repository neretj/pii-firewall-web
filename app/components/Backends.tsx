"use client";

import { Zap, Crosshair, Layers, Infinity, CircuitBoard, ScanText } from "lucide-react";
import { motion } from "framer-motion";

const backends = [
  {
    id: "regex",
    name: "Regex",
    tag: "base",
    tagColor: "var(--accent2)",
    latency: "< 1 ms",
    latencyColor: "var(--accent2)",
    install: "No extras",
    strengths: ["Structured IDs", "Emails & phones", "Credit cards", "Zero ML deps"],
    best: "Zero-dependency environments or fast structured-data pipelines.",
    Icon: Zap,
  },
  {
    id: "presidio",
    name: "Presidio",
    tag: "recommended",
    tagColor: "#86b7ff",
    latency: "50–200 ms",
    latencyColor: "var(--accent)",
    install: "[presidio, langdetect]",
    strengths: ["Named entities (persons, orgs)", "Multi-language NER", "Best speed/accuracy balance", "Extensible"],
    best: "General-purpose production workloads with NER requirements.",
    Icon: Crosshair,
  },
  {
    id: "hybrid",
    name: "Hybrid",
    tag: "max coverage",
    tagColor: "var(--accent4)",
    latency: "50–250 ms",
    latencyColor: "#ffd166",
    install: "[presidio, langdetect]",
    strengths: ["Regex + Presidio combined", "Maximum entity coverage", "Catches structured IDs NER misses"],
    best: "High-risk domains where maximum recall matters more than latency.",
    Icon: Layers,
  },
  {
    id: "gliner",
    name: "GLiNER",
    tag: "zero-shot",
    tagColor: "var(--accent)",
    latency: "100–400 ms",
    latencyColor: "var(--accent)",
    install: "[gliner]",
    strengths: ["Zero-shot NER", "No fine-tuning needed", "Custom entity types on the fly"],
    best: "Custom entity types without labeled training data.",
    Icon: Infinity,
  },
  {
    id: "transformers",
    name: "Transformers",
    tag: "biomedical",
    tagColor: "var(--accent3)",
    latency: "100–500 ms",
    latencyColor: "var(--accent3)",
    install: "[transformers]",
    strengths: ["Biomedical NER (d4data, BC5CDR)", "Highest medical accuracy", "GPU acceleration", "HuggingFace catalog"],
    best: "Clinical NLP where biomedical entity accuracy is critical.",
    Icon: CircuitBoard,
  },
  {
    id: "opf",
    name: "OpenAI Privacy Filter",
    tag: "token-level",
    tagColor: "#50fa7b",
    latency: "50–200 ms",
    latencyColor: "#50fa7b",
    install: "[opf]",
    strengths: ["Token-level PII classifier", "Language-agnostic", "Structured output with spans", "Viterbi decoding"],
    best: "Environments needing a lightweight yet precise token classifier without Presidio.",
    Icon: ScanText,
  }
];

const dispositions = [
  { action: "KEEP", result: "Pass through unchanged", example: "hypertension → hypertension", reversible: true, color: "var(--accent2)" },
  { action: "PSEUDONYMIZE", result: "Replace with reversible token", example: "Ana García → [PERSON_001]", reversible: true, color: "#86b7ff" },
  { action: "REDACT", result: "Irreversible deletion/redaction", example: "john@co.com → [REDACTED]", reversible: false, color: "var(--accent3)" },
  { action: "GENERALIZE", result: "Keep category, drop precision", example: "43 years → [AGE_40-49]", reversible: false, color: "var(--accent4)" },
  { action: "MASK", result: "Partial reveal", example: "4111...1111 → 4111...1111", reversible: false, color: "var(--text-muted)" },
  { action: "HASH", result: "SHA-256 one-way hash (analytics only)", example: "value → a2f8c...", reversible: false, color: "var(--text-muted)" },
];

export default function Backends() {
  return (
    <section id="backends" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Detection Backends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.24)", color: "var(--accent)" }}
          >
            Detection Backends
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Mix and match detection engines
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            From zero-dependency regex to GPU-accelerated biomedical NER.
            Switch with a single parameter — no code refactoring.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-28">
          {backends.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-2xl p-6 card-hover flex flex-col gap-4"
              style={{ background: "linear-gradient(160deg, rgba(12, 21, 33, 0.9), rgba(8, 14, 24, 0.86))", border: "1px solid var(--border)" }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${b.tagColor}15`, border: `1px solid ${b.tagColor}30` }}
                >
                  <b.Icon size={18} color={b.tagColor} strokeWidth={1.75} />
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: `${b.tagColor}15`, color: b.tagColor, border: `1px solid ${b.tagColor}30` }}
                >
                  {b.tag}
                </span>
              </div>

              {/* Name + latency */}
              <div>
                <div className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>
                  {b.name}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold" style={{ color: b.latencyColor }}>
                    {b.latency}
                  </span>
                  <span className="text-xs" style={{ color: "var(--border)", userSelect: "none" }}>|</span>
                  <code className="text-xs" style={{ color: "var(--text-muted)" }}>
                    pip install pii-firewall{b.install === "No extras" ? "" : `[${b.install.replace(/[\[\]]/g, "").split(",")[0].trim()}]`}
                  </code>
                </div>
              </div>

              {/* Strengths */}
              <ul className="space-y-1.5 flex-1">
                {b.strengths.map((s) => (
                  <li key={s} className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: b.tagColor }} />
                    {s}
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div
                className="text-xs rounded-lg px-3 py-2 leading-relaxed"
                style={{ background: `${b.tagColor}08`, border: `1px solid ${b.tagColor}20`, color: "var(--text-muted)" }}
              >
                <span className="font-semibold" style={{ color: b.tagColor }}>Best for: </span>
                {b.best}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disposition actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,143,94,0.1)", border: "1px solid rgba(255,143,94,0.24)", color: "var(--accent3)" }}
          >
            Disposition Actions
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            6 ways to handle PII
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Each entity type in a domain profile gets a disposition — the precise transformation applied when that entity is detected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr style={{ background: "var(--surface2)" }}>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Action</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Result</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest hidden md:table-cell" style={{ color: "var(--text-muted)" }}>Example</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Reversible</th>
              </tr>
            </thead>
            <tbody>
              {dispositions.map((d, i) => (
                <tr
                  key={d.action}
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded"
                      style={{ background: `${d.color}18`, color: d.color, border: `1px solid ${d.color}35` }}
                    >
                      {d.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--text)" }}>
                    {d.result}
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <code className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {d.example}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold">
                    {d.action === "KEEP" ? (
                      <span style={{ color: "var(--text-muted)" }}>N/A</span>
                    ) : d.reversible ? (
                      <span style={{ color: "var(--accent2)" }}>Yes</span>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>

        <div
          className="mt-4 rounded-xl p-4 text-xs"
          style={{ background: "rgba(0,194,255,0.06)", border: "1px solid rgba(0,194,255,0.18)", color: "var(--text-muted)" }}
        >
          <strong style={{ color: "var(--text)" }}>Showcase convention:</strong> PSEUDONYMIZE emits reversible placeholders (scope follows profile.token_scope), REDACT is irreversible deletion ([REDACTED]), GENERALIZE uses category buckets (for example, [AGE_40-49]), and HASH is shown for analytics workflows (not used in built-in presets).
        </div>
      </div>
    </section>
  );
}
