"use client";

const languages = [
  { code: "es", name: "Spanish", flag: "🇪🇸", patterns: "DNI, NIE, IBAN-ES, phone" },
  { code: "en", name: "English", flag: "🇺🇸", patterns: "SSN, EIN, ZIP, US phone" },
  { code: "fr", name: "French", flag: "🇫🇷", patterns: "INSEE, SIREN, phone" },
  { code: "de", name: "German", flag: "🇩🇪", patterns: "Steuernummer, IBAN-DE" },
  { code: "it", name: "Italian", flag: "🇮🇹", patterns: "Codice Fiscale, phone" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", patterns: "NIF, NIS, phone" },
  { code: "55+", name: "Others", flag: "🌍", patterns: "Global patterns & auto-detect" },
];

const gdprFeatures = [
  {
    icon: "🗑️",
    title: "Right to Erasure (Art. 17)",
    desc: "firewall.forget() wipes all vault mappings for a thread or case. After deletion, rehydration will not restore any original values for that scope.",
    code: `deleted = firewall.forget(\n    tenant_id="hospital-001",\n    case_id="patient-123",\n    thread_id="consultation-1",\n)\n# → 14 mappings deleted`,
  },
  {
    icon: "🏢",
    title: "Tenant Isolation",
    desc: "Token mappings are scoped by tenant_id. The same PERSON_1 token in different tenants never shares a mapping. Hard isolation at the data layer.",
    code: `context = {\n    "tenant_id": "hospital-001",  # hard boundary\n    "case_id":   "patient-123",\n    "thread_id": "consultation-1",\n    "actor_id":  "doctor-456",\n}`,
  },
  {
    icon: "🔐",
    title: "Audit Trail",
    desc: "Every call produces a TraceRecord with entity types, confidence scores, and applied replacements — ready for your compliance dashboard or SIEM.",
    code: `result.trace.detected_entities\n# → [{type: "PERSON", text: "Ana García",\n#      confidence: 0.97}, ...]\n\nresult.trace.replacements\n# → [{"original": "Ana García",\n#      "token": "PERSON_1"}, ...]`,
  },
];

export default function Languages() {
  return (
    <section id="languages" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Language section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", color: "var(--accent2)" }}
            >
              Language Support
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
              55+ languages,{" "}
              <span className="gradient-text">zero configuration</span>
            </h2>
            <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
              Language is detected automatically per message with thread-level caching — zero latency after the first call. Locale-specific patterns ensure country IDs and formats are recognized correctly.
            </p>
            <div
              className="rounded-xl p-4 text-sm mb-6"
              style={{ background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.2)", color: "var(--text-muted)" }}
            >
              <strong style={{ color: "var(--accent2)" }}>Auto-detect or force a language:</strong>
              <pre className="mt-2 text-xs" style={{ fontFamily: "monospace", color: "#c9d1d9" }}>
                {`# Auto-detect (default)\nfirewall = create_firewall("healthcare")\n\n# Force Spanish, skip langdetect dependency  \nfirewall = create_firewall("healthcare", language="es")`}
              </pre>
            </div>
          </div>

          {/* Language grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {languages.map((l) => (
              <div
                key={l.code}
                className="rounded-xl p-4 card-hover"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="text-2xl mb-2">{l.flag}</div>
                <div className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
                  {l.name}
                </div>
                <div className="text-xs font-mono mb-1" style={{ color: "var(--accent)" }}>
                  {l.code}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {l.patterns}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GDPR section */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", color: "var(--accent3)" }}
          >
            GDPR Compliance
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Built for regulatory compliance
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            GDPR Art. 17 right to erasure, tenant isolation, and full audit traces — out of the box.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {gdprFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 card-hover"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
                {f.title}
              </h3>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {f.desc}
              </p>
              <pre
                className="text-xs rounded-lg p-3 overflow-x-auto"
                style={{
                  background: "#0d1117",
                  border: "1px solid var(--border)",
                  color: "#c9d1d9",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
              >
                {f.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
