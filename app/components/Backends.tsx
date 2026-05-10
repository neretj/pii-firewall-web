"use client";

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
    icon: "⚡",
  },
  {
    id: "presidio",
    name: "Presidio",
    tag: "recommended",
    tagColor: "var(--accent)",
    latency: "50–200 ms",
    latencyColor: "var(--accent)",
    install: "[presidio, langdetect]",
    strengths: ["Named entities (persons, orgs)", "Multi-language NER", "Best speed/accuracy balance", "Extensible"],
    best: "General-purpose production workloads with NER requirements.",
    icon: "🎯",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    tag: "max coverage",
    tagColor: "#ffd166",
    latency: "50–250 ms",
    latencyColor: "#ffd166",
    install: "[presidio, langdetect]",
    strengths: ["Regex + Presidio combined", "Maximum entity coverage", "Catches structured IDs NER misses"],
    best: "High-risk domains where maximum recall matters more than latency.",
    icon: "🔀",
  },
  {
    id: "gliner",
    name: "GLiNER",
    tag: "zero-shot",
    tagColor: "#bd93f9",
    latency: "100–400 ms",
    latencyColor: "#bd93f9",
    install: "[gliner]",
    strengths: ["Zero-shot NER", "No fine-tuning needed", "Custom entity types on the fly"],
    best: "Custom entity types without labeled training data.",
    icon: "🧠",
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
    icon: "🤗",
  },
  {
    id: "opf",
    name: "OPF",
    tag: "token-level",
    tagColor: "#50fa7b",
    latency: "50–200 ms",
    latencyColor: "#50fa7b",
    install: "[opf]",
    strengths: ["Token-level PII classifier", "Language-agnostic", "Structured output with spans", "Viterbi decoding"],
    best: "Environments needing a lightweight yet precise token classifier without Presidio.",
    icon: "🔬",
  },
  {
    id: "nemotron",
    name: "Nemotron",
    tag: "nvidia",
    tagColor: "#76b900",
    latency: "100–300 ms",
    latencyColor: "#76b900",
    install: "[opf]",
    strengths: ["NVIDIA privacy-filter fine-tune", "OPF-compatible runtime", "High recall on free text", "GPU acceleration"],
    best: "Maximum precision on unstructured free-form text using NVIDIA's fine-tuned model.",
    icon: "🟢",
  },
];

const dispositions = [
  { action: "KEEP", result: "Pass through unchanged", example: "hypertension → hypertension", reversible: true, color: "var(--accent2)" },
  { action: "PSEUDONYMIZE", result: "Replace with stable token + vault", example: "Ana García → PERSON_1", reversible: true, color: "#bd93f9" },
  { action: "REDACT", result: "Replace with constant marker", example: "john@co.com → [REDACTED]", reversible: false, color: "var(--accent3)" },
  { action: "GENERALIZE", result: "Keep category, drop precision", example: "43 years → [AGE_40-49]", reversible: false, color: "#ffd166" },
  { action: "MASK", result: "Partial reveal", example: "4111...1111 → 4111...1111", reversible: false, color: "var(--text-muted)" },
  { action: "HASH", result: "SHA-256 one-way hash", example: "value → a2f8c...", reversible: false, color: "var(--text-muted)" },
  { action: "SUPPRESS", result: "Remove entirely", example: '"suffix" → ""', reversible: false, color: "var(--text-muted)" },
];

export default function Backends() {
  return (
    <section id="backends" className="py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Detection Backends */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(189,147,249,0.1)", border: "1px solid rgba(189,147,249,0.2)", color: "#bd93f9" }}
          >
            Detection Backends
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Mix and match detection engines
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            From zero-dependency regex to GPU-accelerated biomedical NER. Switch with one parameter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-24">
          {backends.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl p-5 card-hover flex flex-col"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <div className="text-2xl mb-3">{b.icon}</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
                  {b.name}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-semibold"
                  style={{ background: `${b.tagColor}20`, color: b.tagColor, border: `1px solid ${b.tagColor}40` }}
                >
                  {b.tag}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-xs font-bold" style={{ color: b.latencyColor }}>
                  ⚡ {b.latency}
                </span>
              </div>

              <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--text)" }}>Install: </span>
                <code style={{ color: "#bd93f9", fontFamily: "monospace" }}>{b.install}</code>
              </div>

              <ul className="space-y-1 mb-3 flex-1">
                {b.strengths.map((s) => (
                  <li key={s} className="text-xs flex items-start gap-1.5" style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: b.tagColor }}>•</span> {s}
                  </li>
                ))}
              </ul>

              <p className="text-xs" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                {b.best}
              </p>
            </div>
          ))}
        </div>

        {/* Disposition actions */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", color: "var(--accent3)" }}
          >
            Disposition Actions
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            7 ways to handle PII
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Each entity type in a domain profile gets a disposition — the precise transformation applied when that entity is detected.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm">
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
                  <td className="px-5 py-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded"
                      style={{ background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}40` }}
                    >
                      {d.action}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--text)" }}>
                    {d.result}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <code className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                      {d.example}
                    </code>
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold">
                    {d.action === "KEEP" ? (
                      <span style={{ color: "var(--text-muted)" }}>N/A</span>
                    ) : d.reversible ? (
                      <span style={{ color: "var(--accent2)" }}>✅ Yes</span>
                    ) : (
                      <span style={{ color: "var(--accent3)" }}>❌ No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="mt-6 rounded-xl p-4 text-sm"
          style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)", color: "var(--text-muted)" }}
        >
          <strong style={{ color: "var(--text)" }}>Only PSEUDONYMIZE is reversible</strong> — it stores a token↔original mapping in the vault for rehydration. All other actions intentionally destroy or alter the original value. If you need recoverability for an entity, choose PSEUDONYMIZE.
        </div>
      </div>
    </section>
  );
}
