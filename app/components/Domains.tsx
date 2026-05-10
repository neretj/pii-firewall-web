"use client";
import { useState } from "react";

const domains = [
  {
    id: "healthcare",
    icon: "🏥",
    label: "Healthcare",
    color: "var(--accent3)",
    tagline: "Keep clinical context. Anonymize patient identifiers and account data.",
    keeps: ["Diagnoses (hypertension, diabetes)", "Medications (enalapril, lisinopril)", "Procedures & observations"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PERSON", example: "Ana García → PERSON_1" },
      { action: "REDACT", entity: "SSN / DNI / NATIONAL ID", example: "123-45-6789 → [REDACTED]" },
      { action: "GENERALIZE", entity: "AGE", example: "43 → [AGE_40-49]" },
      { action: "MASK", entity: "PHONE", example: "555-1234 → 555-****" },
      { action: "PSEUDONYMIZE", entity: "ACCOUNT / IBAN", example: "ES12345678 → ACCOUNT_1" },
      { action: "REDACT", entity: "EMAIL", example: "ana@clinic.es → [REDACTED]" },
    ],
    codeInput: `"Paciente Ana García, DNI 12345678A, 43 años,\nhipertensión. Email: ana@clinic.es.\nIBAN: ES12345678. Prescripción: enalapril 10mg."`,
    codeOutput: `"Paciente PERSON_1, [REDACTED], [AGE_40-49],\nhipertensión. Email: [REDACTED].\nIBAN: ACCOUNT_1. Prescripción: enalapril 10mg."`,
  },
  {
    id: "finance",
    icon: "💼",
    label: "Finance",
    color: "#ffd166",
    tagline: "Keep amounts and transaction context. Anonymize account and medical data.",
    keeps: ["Company names", "Transaction amounts & rates", "Currency codes"],
    transforms: [
      { action: "MASK", entity: "CREDIT_CARD", example: "4111111111111111 → 4111...1111" },
      { action: "PSEUDONYMIZE", entity: "ACCOUNT / IBAN", example: "ES12345 → ACCOUNT_1" },
      { action: "REDACT", entity: "CUSTOMER PII", example: "María López → [REDACTED]" },
      { action: "PSEUDONYMIZE", entity: "TAX_ID", example: "B12345678 → TAX_ID_1" },
      { action: "REDACT", entity: "MEDICAL DATA", example: "diabetes tipo 2 → [REDACTED]" },
      { action: "REDACT", entity: "MEDICATIONS", example: "metformina 850mg → [REDACTED]" },
    ],
    codeInput: `"Cliente María López, tarjeta 4111111111111111,\ntransferencia de 2.500€. Diagnóstico: diabetes tipo 2.\nMedicación: metformina 850mg."`,
    codeOutput: `"Cliente PERSON_1, tarjeta 4111...1111,\ntransferencia de 2.500€. Diagnóstico: [REDACTED].\nMedicación: [REDACTED]."`,
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Legal",
    color: "var(--accent)",
    tagline: "Maximum anonymity for parties. Anonymize medical data. Public records pass through.",
    keeps: ["Company & firm names (public record)", "Statutes & citations", "Case reference numbers"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PARTY NAMES", example: "Juan Pérez → PERSON_1" },
      { action: "GENERALIZE", entity: "DATES", example: "15 marzo 2024 → 2024" },
      { action: "REDACT", entity: "Strong IDs", example: "DNI 12345678A → [REDACTED]" },
      { action: "REDACT", entity: "MEDICAL DATA", example: "esquizofrenia → [REDACTED]" },
      { action: "REDACT", entity: "MEDICATIONS", example: "risperidona 2mg → [REDACTED]" },
    ],
    codeInput: `"El demandante Juan Pérez, DNI 12345678A, presentó\nrecurso el 15 de marzo de 2024. Antecedentes\nmédicos: esquizofrenia, risperidona 2mg."`,
    codeOutput: `"El demandante PERSON_1, [REDACTED], presentó\nrecurso en 2024. Antecedentes\nmédicos: [REDACTED], [REDACTED]."`,
  },
  {
    id: "generic",
    icon: "🌐",
    label: "Generic",
    color: "var(--accent2)",
    tagline: "Sensible defaults. Anonymizes all PII including medical and account data.",
    keeps: ["Non-PII business context"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PERSON", example: "John Doe → PERSON_1" },
      { action: "REDACT", entity: "EMAIL", example: "john@co.com → [REDACTED]" },
      { action: "REDACT", entity: "PHONE", example: "+1 555-1234 → [REDACTED]" },
      { action: "REDACT", entity: "MEDICAL DATA", example: "hypertension → [REDACTED]" },
      { action: "REDACT", entity: "IDs / ACCOUNTS", example: "SSN, IBAN → [REDACTED]" },
    ],
    codeInput: `"Contact John Doe at john@company.com.\nDiagnosis: hypertension. Account: ES12345678.\nCall +1 555-123-4567."`,
    codeOutput: `"Contact PERSON_1 at [REDACTED].\nDiagnosis: [REDACTED]. Account: [REDACTED].\nCall [REDACTED]."`,
  },
];

const actionColors: Record<string, string> = {
  PSEUDONYMIZE: "#bd93f9",
  REDACT: "var(--accent3)",
  GENERALIZE: "#ffd166",
  MASK: "var(--accent2)",
  KEEP: "var(--accent2)",
};

export default function Domains() {
  const [active, setActive] = useState("healthcare");
  const domain = domains.find((d) => d.id === active)!;

  return (
    <section id="domains" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.2)",
              color: "var(--accent3)",
            }}
          >
            Domain Profiles
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Built-in presets for your industry
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Each domain profile decides what&apos;s sensitive and what the LLM must see to do its job.
            Fully customizable.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                active === d.id
                  ? {
                      background: `${d.color}25`,
                      border: `1px solid ${d.color}`,
                      color: d.color,
                    }
                  : {
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }
              }
            >
              {d.icon} {d.label}
            </button>
          ))}
        </div>

        {/* Domain detail panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${domain.color}40` }}
        >
          {/* Header */}
          <div
            className="px-8 py-6 border-b"
            style={{
              background: `linear-gradient(135deg, ${domain.color}12 0%, transparent 100%)`,
              borderColor: `${domain.color}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{domain.icon}</span>
              <div>
                <h3 className="text-xl font-black" style={{ color: "var(--text)" }}>
                  {domain.label} Profile
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {domain.tagline}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            {/* Left: dispositions */}
            <div className="p-8" style={{ background: "var(--surface)" }}>
              {/* Keeps */}
              {domain.keeps.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent2)" }}>
                    ✓ Keeps (pass-through)
                  </div>
                  <ul className="space-y-1.5">
                    {domain.keeps.map((k) => (
                      <li key={k} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--accent2)" }}>•</span> {k}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Transforms */}
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                  Transforms
                </div>
                <div className="space-y-3">
                  {domain.transforms.map((t) => (
                    <div key={t.entity} className="flex items-start gap-3">
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-0.5 rounded mt-0.5"
                        style={{
                          background: `${actionColors[t.action]}20`,
                          color: actionColors[t.action],
                          border: `1px solid ${actionColors[t.action]}40`,
                        }}
                      >
                        {t.action}
                      </span>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                          {t.entity}
                        </div>
                        <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                          {t.example}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: code example */}
            <div className="p-8" style={{ background: "var(--bg)" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Live example
              </div>

              <div className="mb-3">
                <div className="text-xs mb-1.5 font-semibold" style={{ color: "var(--accent3)" }}>Input</div>
                <pre
                  className="rounded-xl p-4 text-xs whitespace-pre-wrap"
                  style={{ background: "#0d1117", border: "1px solid var(--border)", color: "#c9d1d9", fontFamily: "monospace" }}
                >
                  {domain.codeInput}
                </pre>
              </div>

              <div
                className="flex items-center justify-center py-2 text-sm"
                style={{ color: "var(--accent)" }}
              >
                ↓ PII Firewall
              </div>

              <div>
                <div className="text-xs mb-1.5 font-semibold" style={{ color: "var(--accent2)" }}>Output (sanitized)</div>
                <pre
                  className="rounded-xl p-4 text-xs whitespace-pre-wrap"
                  style={{ background: "#0d1117", border: `1px solid ${domain.color}40`, color: domain.color, fontFamily: "monospace" }}
                >
                  {domain.codeOutput}
                </pre>
              </div>

              <div className="mt-6 p-3 rounded-xl text-xs" style={{ background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.15)", color: "var(--text-muted)" }}>
                <code
                  className="block"
                  style={{ fontFamily: "monospace", color: "#c9d1d9" }}
                >
                  firewall = create_firewall(<span style={{ color: "#f1fa8c" }}>&quot;{domain.id}&quot;</span>)
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
