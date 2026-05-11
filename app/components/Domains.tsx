"use client";
import { useState } from "react";
import { ActivitySquare, TrendingUp, Scale, Globe } from "lucide-react";

const domains = [
  {
    id: "healthcare",
    Icon: ActivitySquare,
    label: "Healthcare",
    color: "var(--accent2)",
    tagline: "Keep clinical context. Anonymize patient identifiers and account data.",
    keeps: ["Diagnoses (hipertensión, diabetes)", "Medications (enalapril, lisinopril)", "Procedures & observations"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PERSON", example: "Ana García → [PERSON_001]" },
      { action: "REDACT", entity: "NATIONAL ID", example: "12345678A → [REDACTED]" },
      { action: "GENERALIZE", entity: "AGE", example: "43 años → 40-49" },
      { action: "GENERALIZE", entity: "DATE", example: "15/03/2024 → 2024" },
      { action: "REDACT", entity: "EMAIL", example: "ana@clinic.es → [REDACTED]" },
      { action: "REDACT", entity: "IBAN", example: "ES12345678 → [REDACTED]" },
    ],
    codeInput: `"Paciente Ana García, DNI 12345678A, 43 años,\nhipertensión. Consulta: 15/03/2024.\nEmail: ana@clinic.es. Prescripción: enalapril 10mg."`,
    codeOutput: `"Paciente [PERSON_001], [REDACTED], 40-49,\nhipertensión. Consulta: 2024.\nEmail: [REDACTED]. Prescripción: enalapril 10mg."`,
  },
  {
    id: "finance",
    Icon: TrendingUp,
    label: "Finance",
    color: "var(--accent4)",
    tagline: "Keep amounts and transaction context. Anonymize account and medical data.",
    keeps: ["Company names", "Transaction amounts (2.500€ passes through)", "Currency codes"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PERSON", example: "María López → [PERSON_001]" },
      { action: "MASK", entity: "CREDIT_CARD", example: "4111111111111111 → ************1111" },
      { action: "PSEUDONYMIZE", entity: "IBAN", example: "ES12345678 → [IBAN_001]" },
      { action: "PSEUDONYMIZE", entity: "TAX_ID", example: "B12345678 → [TAX_ID_001]" },
      { action: "REDACT", entity: "DIAGNOSIS", example: "diabetes tipo 2 → [REDACTED]" },
      { action: "REDACT", entity: "DRUG", example: "metformina 850mg → [REDACTED]" },
    ],
    codeInput: `"Cliente María López, tarjeta 4111111111111111,\ntransferencia de 2.500€. IBAN: ES1234567890123456789012.\nDiagnóstico: diabetes tipo 2."`,
    codeOutput: `"Cliente [PERSON_001], tarjeta ************1111,\ntransferencia de 2.500€. IBAN: [IBAN_001].\nDiagnóstico: [REDACTED]."`,
  },
  {
    id: "legal",
    Icon: Scale,
    label: "Legal",
    color: "var(--accent)",
    tagline: "Maximum anonymity for parties. Anonymize medical data. Public records pass through.",
    keeps: ["Company & firm names (courts, agencies)", "Statutes & case citations", "Case reference numbers"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PARTY NAMES", example: "Juan Pérez → [PERSON_001]" },
      { action: "REDACT", entity: "NATIONAL ID", example: "12345678A → [REDACTED]" },
      { action: "GENERALIZE", entity: "DATES", example: "15 marzo 2024 → Mar 2024" },
      { action: "REDACT", entity: "DIAGNOSIS", example: "esquizofrenia → [REDACTED]" },
      { action: "REDACT", entity: "DRUG", example: "risperidona 2mg → [REDACTED]" },
    ],
    codeInput: `"El demandante Juan Pérez, DNI 12345678A,\npresentó recurso el 15 de marzo de 2024.\nAntecedentes: esquizofrenia, risperidona 2mg."`,
    codeOutput: `"El demandante [PERSON_001], [REDACTED],\npresentó recurso el Mar 2024.\nAntecedentes: [REDACTED], [REDACTED]."`,
  },
  {
    id: "generic",
    Icon: Globe,
    label: "Generic",
    color: "var(--accent3)",
    tagline: "Sensible defaults. Anonymizes all PII including medical and account data.",
    keeps: ["Non-PII business context"],
    transforms: [
      { action: "PSEUDONYMIZE", entity: "PERSON", example: "John Doe → [PERSON_001]" },
      { action: "REDACT", entity: "EMAIL", example: "john@company.com → [REDACTED]" },
      { action: "REDACT", entity: "PHONE", example: "+1 555-123-4567 → [REDACTED]" },
      { action: "REDACT", entity: "DIAGNOSIS", example: "hypertension → [REDACTED]" },
      { action: "REDACT", entity: "IBAN", example: "ES12345678 → [REDACTED]" },
    ],
    codeInput: `"Contact John Doe at john@company.com.\nDiagnosis: hypertension. IBAN: ES12345678.\nCall +1 555-123-4567."`,
    codeOutput: `"Contact [PERSON_001] at [REDACTED].\nDiagnosis: [REDACTED]. IBAN: [REDACTED].\nCall [REDACTED]."`,
  },
];

const actionColors: Record<string, string> = {
  PSEUDONYMIZE: "#86b7ff",
  REDACT: "var(--accent3)",
  GENERALIZE: "var(--accent4)",
  MASK: "var(--accent2)",
  KEEP: "var(--accent2)",
};

export default function Domains() {
  const [active, setActive] = useState("healthcare");
  const domain = domains.find((d) => d.id === active)!;

  return (
    <section id="domains" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,143,94,0.12)",
              border: "1px solid rgba(255,143,94,0.24)",
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
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Domain profiles">
          {domains.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              role="tab"
              aria-selected={active === d.id}
              aria-controls={`domain-panel-${d.id}`}
              id={`domain-tab-${d.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                active === d.id
                  ? {
                      background: `${d.color}1f`,
                      border: `1px solid ${d.color}`,
                      color: d.color,
                    }
                  : {
                      background: "rgba(13,22,34,0.55)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }
              }
            >
              <d.Icon size={14} strokeWidth={1.75} />
              {d.label}
            </button>
          ))}
        </div>

        {/* Domain detail panel */}
        <div
          role="tabpanel"
          id={`domain-panel-${domain.id}`}
          aria-labelledby={`domain-tab-${domain.id}`}
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
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${domain.color}18`, border: `1px solid ${domain.color}35` }}
              >
                <domain.Icon size={20} strokeWidth={1.75} color={domain.color} />
              </div>
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
            <div className="p-8" style={{ background: "linear-gradient(165deg, rgba(13,22,34,0.96), rgba(9,16,27,0.93))" }}>
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
                <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)", background: "rgba(8, 15, 24, 0.7)" }}>
                  <table className="w-full min-w-[520px] text-xs">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                        <th className="text-left px-3 py-2.5 font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                          Action
                        </th>
                        <th className="text-left px-3 py-2.5 font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                          Entity
                        </th>
                        <th className="text-left px-3 py-2.5 font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                          Example
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {domain.transforms.map((t, idx) => (
                        <tr
                          key={`${t.action}-${t.entity}-${idx}`}
                          className="transition-colors hover:bg-white/[0.03]"
                          style={{ borderTop: "1px solid var(--border)", background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}
                        >
                          <td className="px-3 py-2.5 align-top">
                            <span
                              className="inline-block text-[11px] font-bold px-2 py-0.5 rounded"
                              style={{
                                background: `${actionColors[t.action]}20`,
                                color: actionColors[t.action],
                                border: `1px solid ${actionColors[t.action]}40`,
                              }}
                            >
                              {t.action}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-semibold align-top" style={{ color: "var(--text)" }}>
                            {t.entity}
                          </td>
                          <td className="px-3 py-2.5 font-mono align-top" style={{ color: "var(--text-muted)" }}>
                            {t.example}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: code example */}
            <div className="p-8" style={{ background: "linear-gradient(160deg, rgba(9,16,27,0.95), rgba(6,11,17,0.98))" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Live example
              </div>

              <div className="mb-3">
                <div className="text-xs mb-1.5 font-semibold" style={{ color: "var(--accent3)" }}>Input</div>
                <pre
                  className="rounded-xl p-4 text-xs whitespace-pre-wrap"
                  style={{ background: "#08111c", border: "1px solid var(--border)", color: "#d6e7f7", fontFamily: "monospace" }}
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
                  style={{ background: "#08111c", border: `1px solid ${domain.color}40`, color: domain.color, fontFamily: "monospace" }}
                >
                  {domain.codeOutput}
                </pre>
              </div>

              <div className="mt-6 p-3 rounded-xl text-xs" style={{ background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.18)", color: "var(--text-muted)" }}>
                <code
                  className="block"
                  style={{ fontFamily: "monospace", color: "#d6e7f7" }}
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
