"use client";

import { ArrowRight, Terminal, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import Counter from "./ui/Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

const metrics = [
  { to: 55, suffix: "+", label: "Languages" },
  { to: 7, suffix: "", label: "Dispositions" },
  { to: 7, suffix: "", label: "Detection backends" },
  { to: 4, suffix: "", label: "Domain profiles" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="aurora-1 hero-glow w-[700px] h-[700px] -top-48 -left-48 opacity-[0.18]"
        style={{ background: "radial-gradient(circle, #00c2ff 0%, transparent 65%)" }} />
      <div className="aurora-2 hero-glow w-[600px] h-[600px] top-1/2 -right-32 opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #2ae6a6 0%, transparent 65%)" }} />
      <div className="aurora-3 hero-glow w-[400px] h-[400px] bottom-0 left-1/3 opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #ff8f5e 0%, transparent 65%)" }} />

      <div className="absolute inset-0 opacity-[0.022]" style={{
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(0,194,255,0.12)", border: "1px solid rgba(0,194,255,0.28)", color: "#9fdfff" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--accent2)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent2)" }} />
            </span>
            Open Source · Apache 2.0
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-5xl md:text-6xl font-black leading-[1.04] tracking-tight mb-6">
            <span style={{ color: "var(--text)" }}>Privacy firewall</span>
            <br />
            <span className="gradient-text">for LLM apps</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: "var(--text-muted)" }}>
            Intercept and anonymize PII{" "}
            <strong style={{ color: "var(--text)" }}>before it reaches</strong>{" "}
            OpenAI, Anthropic, or any LLM — then rehydrate it in the response.
            Domain-aware, 55+ languages,{" "}
            <strong style={{ color: "var(--accent2)" }}>3 lines of code</strong>.
          </motion.p>

          {/* Animated metric counters */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-8 mb-10">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl font-black gradient-text">
                  <Counter to={m.to} suffix={m.suffix} duration={1.6} />
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{m.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-3">
            <a href="#quickstart"
              className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#032033] transition-all hover:opacity-90 hover:scale-[1.02]">
              Quick start <ArrowRight size={15} />
            </a>
            <a href="https://github.com/neretj/llm-pii-firewall" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:border-[var(--accent)] hover:text-[var(--text)]"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "rgba(13,22,34,0.5)" }}>
              <GitBranch size={15} /> GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="animate-float relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl glow-border tech-panel"
            style={{ border: "1px solid rgba(0,194,255,0.3)" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: "#08111c", borderColor: "var(--border)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <div className="flex items-center gap-1.5 ml-3" style={{ color: "var(--text-muted)" }}>
                <Terminal size={12} />
                <span className="text-xs font-mono">pii_demo.py</span>
              </div>
            </div>

            <pre className="p-6 text-sm leading-relaxed overflow-x-auto code-scan relative"
              style={{ background: "#08111c", color: "#d6e7f7" }}>
              <code>
                <span className="im">from</span>{" "}
                <span className="fn">privacy_firewall</span>{" "}
                <span className="im">import</span>{" "}
                <span className="fn">create_firewall</span>
                {"\n\n"}
                <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}># Domain-aware -- keeps diagnoses, strips PII</span>
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
                <span className="st">Patient John Doe, SSN 123-45-6789,{"\n"}          diagnosed with hypertension.</span>
                {`",\n    context={...},\n)\n\n`}
                <span style={{ color: "#6272a4", fontStyle: "italic" }}>
                  # -&gt; &quot;Patient{" "}
                  <span style={{ color: "#86b7ff" }}>[PERSON_001]</span>, [REDACTED], diagnosed{"\n"}
                  #    with hypertension.&quot;{"\n"}
                  # Medical terms preserved. PII stripped.
                </span>
              </code>
            </pre>
          </div>

          {/* Floating badges */}
          <div className="absolute -bottom-4 -right-4 rounded-xl px-3 py-1.5 text-xs font-semibold hidden md:block"
            style={{ background: "rgba(0,212,170,0.12)", border: "1px solid rgba(0,212,170,0.3)", color: "var(--accent2)" }}>
            Clinical context preserved
          </div>
          <div className="absolute -top-4 -left-4 rounded-xl px-3 py-1.5 text-xs font-semibold hidden md:block"
            style={{ background: "rgba(0,194,255,0.12)", border: "1px solid rgba(0,194,255,0.3)", color: "#9fdfff" }}>
            &lt;1ms regex · 50ms NER
          </div>
        </motion.div>
      </div>
    </section>
  );
}

