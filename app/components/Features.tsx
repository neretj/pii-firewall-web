"use client";

const features = [
  {
    icon: "🌍",
    title: "55+ Language Auto-Detection",
    desc: "Language is detected automatically per message with thread-level caching for zero latency after the first call. Locale-specific patterns for Spanish DNI, US SSN, French INSEE, German Steuernummer, Italian CF, Portuguese NIF, and global fallbacks.",
    accent: "var(--accent2)",
    badge: "Zero config",
  },
  {
    icon: "🔄",
    title: "Reversible Pseudonymization",
    desc: "A secure in-memory (or SQLite) vault stores original↔token mappings per tenant/case/thread. PERSON_1 always maps back to the same real name within a conversation. Rehydration is automatic.",
    accent: "var(--accent)",
    badge: "GDPR ready",
  },
  {
    icon: "🏥",
    title: "Domain-Aware Keep Rules",
    desc: "Medical terms (diagnoses, medications, procedures) are kept — not redacted — in the healthcare profile. Finance keeps amounts. Legal keeps case numbers. The LLM still receives the context it needs.",
    accent: "#ffd166",
    badge: "Smart",
  },
  {
    icon: "📋",
    title: "Full Audit Trace",
    desc: "Every call produces a TraceRecord with detected entities, their types, confidence scores, applied replacements, and residual PII warnings. Build compliance dashboards or feed your SIEM.",
    accent: "var(--accent3)",
    badge: "Compliance",
  },
  {
    icon: "🗑️",
    title: "GDPR Right to Forget",
    desc: "A single API call wipes all vault mappings for a case or thread, satisfying Art. 17 GDPR right to erasure. Per-tenant isolation ensures data never crosses customer boundaries.",
    accent: "var(--accent2)",
    badge: "Art. 17",
  },
  {
    icon: "🔌",
    title: "Any LLM, Any Framework",
    desc: "Works with OpenAI, Anthropic, Mistral, local models, or any HTTP LLM endpoint. Deploy as a Python SDK, FastAPI microservice, or Docker container. Node.js integration example included.",
    accent: "var(--accent)",
    badge: "Provider-agnostic",
  },
  {
    icon: "🧩",
    title: "Custom PII Detectors",
    desc: "Add regex rules at runtime with add_custom_regex(). Plug in any HuggingFace NER model as a Presidio recognizer subclass. Zero config files — just code.",
    accent: "#ffd166",
    badge: "Extensible",
  },
  {
    icon: "⚡",
    title: "< 1ms Regex Mode",
    desc: "Pattern-based detection has effectively zero overhead. Presidio NER runs in 50–200ms. All modes are compatible with async FastAPI services and production workloads.",
    accent: "var(--accent3)",
    badge: "High performance",
  },
  {
    icon: "🔁",
    title: "Streaming Support",
    desc: "secure_call_stream() yields rehydrated tokens as soon as they arrive from the LLM — no buffering. Plug into SSE or WebSocket endpoints for real-time privacy-safe chat applications.",
    accent: "var(--accent)",
    badge: "Real-time",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
      style={{ background: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,212,170,0.1)",
              border: "1px solid rgba(0,212,170,0.2)",
              color: "var(--accent2)",
            }}
          >
            Capabilities
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Everything you need for{" "}
            <span className="gradient-text">privacy-first AI</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Built for production. Designed for compliance. Zero compromise on LLM utility.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 card-hover"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${f.accent}`,
              }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold leading-tight" style={{ color: "var(--text)" }}>
                  {f.title}
                </h3>
              </div>
              <span
                className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-semibold"
                style={{
                  background: `${f.accent}20`,
                  color: f.accent,
                  border: `1px solid ${f.accent}40`,
                }}
              >
                {f.badge}
              </span>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
