"use client";

import { ArrowRight, Terminal, Shield } from "lucide-react";

const codeSnippet = `from privacy_firewall import create_firewall

firewall = create_firewall("healthcare")

result = firewall.process(
    text="Patient John Doe, SSN 123-45-6789, diagnosed
          with hypertension. Prescribed lisinopril 10mg.",
    context={
        "tenant_id": "hospital-001",
        "case_id":   "patient-123",
        "thread_id": "consultation-1",
    },
)

# → "Patient PERSON_1, [REDACTED], diagnosed with
#    hypertension. Prescribed lisinopril 10mg."
# Medical terms are KEPT. PII is stripped.`;

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "var(--bg)" }}
    >
      {/* Background glows */}
      <div
        className="hero-glow w-[600px] h-[600px] -top-32 -left-32 opacity-20"
        style={{ background: "radial-gradient(circle, #6c63ff 0%, transparent 70%)" }}
      />
      <div
        className="hero-glow w-[400px] h-[400px] -bottom-20 right-0 opacity-15"
        style={{ background: "radial-gradient(circle, #00d4aa 0%, transparent 70%)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(108,99,255,0.15)",
              border: "1px solid rgba(108,99,255,0.3)",
              color: "#a89dff",
            }}
          >
            <Shield size={12} />
            Open Source · Apache 2.0
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            <span style={{ color: "var(--text)" }}>LLMs deserve </span>
            <br />
            <span className="gradient-text">privacy-first</span>
            <br />
            <span style={{ color: "var(--text)" }}>AI.</span>
          </h1>

          <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            PII Firewall intercepts text <strong style={{ color: "var(--text)" }}>before</strong> it
            reaches your LLM, strips or transforms sensitive data, forwards the sanitized prompt,
            and re-hydrates the response — all transparently. In{" "}
            <strong style={{ color: "var(--accent2)" }}>55+ languages</strong>.
          </p>

          {/* Metrics row */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { value: "55+", label: "Languages" },
              { value: "7", label: "Disposition actions" },
              { value: "5", label: "Detection backends" },
              { value: "3", label: "Domain profiles" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-black gradient-text">{m.value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#quickstart"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Quick start <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right — code preview */}
        <div className="animate-float">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 0 60px rgba(108,99,255,0.12)",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: "#0d1117", borderColor: "var(--border)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <div className="flex items-center gap-1.5 ml-3" style={{ color: "var(--text-muted)" }}>
                <Terminal size={12} />
                <span className="text-xs">pii_demo.py</span>
              </div>
            </div>

            {/* Code */}
            <pre
              className="p-6 text-sm leading-relaxed overflow-x-auto"
              style={{ background: "#0d1117", color: "#c9d1d9", fontFamily: "'Fira Code', 'JetBrains Mono', monospace" }}
            >
              <code>
                <span className="im">from</span>{" "}
                <span className="fn">privacy_firewall</span>{" "}
                <span className="im">import</span>{" "}
                <span className="fn">create_firewall</span>
                {"\n\n"}
                <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>{`# Create a domain-aware firewall`}</span>
                {"\n"}
                firewall <span style={{ color: "#ff79c6" }}>=</span>{" "}
                <span className="fn">create_firewall</span>
                <span style={{ color: "#8be9fd" }}>(</span>
                <span className="st">&quot;healthcare&quot;</span>
                <span style={{ color: "#8be9fd" }}>)</span>
                {"\n\n"}
                result <span style={{ color: "#ff79c6" }}>=</span> firewall.
                <span className="fn">process</span>
                {`(\n    text="`}
                <span className="st">
                  Patient John Doe, SSN 123-45-6789,{"\n"}
                  {"          "}diagnosed with hypertension.
                </span>
                {`",\n    context={...},\n)\n\n`}
                <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                  # → &quot;Patient{" "}
                  <span style={{ color: "#bd93f9" }}>PERSON_1</span>, [REDACTED], diagnosed{"\n"}
                  #    with hypertension. Prescribed lisinopril 10mg.&quot;{"\n"}
                  # Medical terms KEPT. PII is stripped.
                </span>
              </code>
            </pre>
          </div>

          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -right-4 rounded-xl px-4 py-2 text-xs font-semibold"
            style={{
              background: "rgba(0,212,170,0.15)",
              border: "1px solid rgba(0,212,170,0.3)",
              color: "var(--accent2)",
            }}
          >
            ✓ Medical terms preserved
          </div>
        </div>
      </div>
    </section>
  );
}
