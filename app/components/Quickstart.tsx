
"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all"
      style={{
        color: copied ? "var(--accent2)" : "var(--text-muted)",
        background: copied ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? "rgba(0,212,170,0.3)" : "var(--border)"}`,
      }}
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const installSteps = [
  {
    step: "1",
    title: "Install the package",
    code: `pip install "pii-firewall[presidio,langdetect]"\n\n# Download a spaCy language model\npython -m spacy download en_core_web_sm  # English\npython -m spacy download es_core_news_sm # Spanish`,
    note: "Use [all] for all backends or just pip install pii-firewall for regex-only (no ML deps).",
  },
  {
    step: "2",
    title: "Create a firewall",
    code: `from privacy_firewall import create_firewall\n\n# Pick a domain profile\nfirewall = create_firewall("healthcare")  # or "finance", "legal", "generic"`,
    note: null,
  },
  {
    step: "3",
    title: "Anonymize & rehydrate",
    code: `context = {\n    "tenant_id": "hospital-001",\n    "case_id":   "patient-123",\n    "thread_id": "consultation-1",\n    "actor_id":  "doctor-456",\n}\n\n# Anonymize before sending to LLM\nanon = firewall.anonymize(text=user_input, context=context)\nllm_response = my_llm(anon.sanitized_text)\n\n# Rehydrate — restore real names in the response\nfinal = firewall.rehydrate(text=llm_response, context=context)\nprint(final)  # End-user sees real values`,
    note: "Or use firewall.process() for a single-call anonymize→LLM→rehydrate round-trip.",
  },
];

const extraExamples = [
  {
    title: "As a FastAPI microservice",
    code: `from fastapi import FastAPI
from privacy_firewall import PrivacyFirewallSDK

app = FastAPI()
sdk = PrivacyFirewallSDK.create(domain="healthcare", detector_backend="presidio")

@app.post("/privacy/sanitize")
async def sanitize(req: dict):
    result = sdk.anonymize_text(text=req["text"], context=req["context"])
    return {"sanitized_text": result.sanitized_text}`,
  },
  {
    title: "Custom regex entity at runtime",
    code: `firewall.add_custom_regex(
    entity_type="EMPLOYEE_ID",
    regex=r"\\bEMP-\\d{6}\\b",
    locales=["GLOBAL"],
    confidence=0.95,
    context_words=["employee", "staff"],
    disposition_action="redact",
)`,
  },
  {
    title: "GDPR — forget a thread",
    code: `deleted = firewall.forget(
    tenant_id="hospital-001",
    case_id="patient-123",
    thread_id="consultation-1",
)
print(f"Deleted {deleted} mappings")
# Art. 17 GDPR right to erasure satisfied`,
  },
];

export default function Quickstart() {
  return (
    <section id="quickstart" className="py-24" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", color: "var(--accent)" }}
          >
            Quick Start
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Up and running in minutes
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Three steps from install to your first anonymized LLM call.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {installSteps.map((s, i) => (
            <div
              key={s.step}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* Step header */}
              <div
                className="flex items-center gap-4 px-6 py-4 border-b"
                style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  {s.step}
                </div>
                <h3 className="font-bold" style={{ color: "var(--text)" }}>
                  {s.title}
                </h3>
              </div>

              {/* Code */}
              <div style={{ background: "#0d1117" }}>
                <div className="flex items-center justify-between px-4 pt-3 pb-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  </div>
                  <CopyButton code={s.code} />
                </div>
                <pre
                  className="p-6 text-sm overflow-x-auto"
                  style={{
                    color: "#c9d1d9",
                    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                    lineHeight: 1.7,
                  }}
                >
                  <code>{s.code}</code>
                </pre>
              </div>

              {s.note && (
                <div
                  className="px-6 py-3 text-xs border-t"
                  style={{
                    background: "rgba(108,99,255,0.06)",
                    borderColor: "rgba(108,99,255,0.2)",
                    color: "var(--text-muted)",
                  }}
                >
                  💡 <strong style={{ color: "var(--text)" }}>Tip:</strong> {s.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Extra examples */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black" style={{ color: "var(--text)" }}>
            More examples
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {extraExamples.map((e) => (
            <div
              key={e.title}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="px-4 py-3 text-xs font-bold border-b flex items-center justify-between"
                style={{
                  background: "var(--surface2)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <span>{e.title}</span>
                <CopyButton code={e.code} />
              </div>
              <pre
                className="p-4 text-xs overflow-x-auto"
                style={{
                  background: "#0d1117",
                  color: "#c9d1d9",
                  fontFamily: "monospace",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                <code>{e.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
