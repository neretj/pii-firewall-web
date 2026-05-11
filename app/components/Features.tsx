"use client";

import { motion } from "framer-motion";
import GlowCard from "./ui/GlowCard";
import {
  Languages, RefreshCw, Stethoscope, ClipboardList,
  Trash2, Plug, Component, Timer, Radio
} from "lucide-react";

const features = [
  {
    Icon: Languages,
    title: "55+ Language Auto-Detection",
    desc: "Language detected per message with thread-level caching. Locale-specific patterns for Spanish DNI, US SSN, French INSEE, German Steuernummer, Italian CF, and more.",
    accent: "var(--accent2)",
    badge: "Zero config",
  },
  {
    Icon: RefreshCw,
    title: "Reversible Pseudonymization",
    desc: "In-memory or SQLite vault stores original token mappings per tenant/case/thread. [PERSON_001] always maps back to the same real name within a session.",
    accent: "var(--accent)",
    badge: "GDPR ready",
  },
  {
    Icon: Stethoscope,
    title: "Domain-Aware Keep Rules",
    desc: "Medical terms (diagnoses, medications, procedures) pass through untouched in the healthcare profile. Finance keeps amounts. Legal keeps citations. The LLM gets what it needs.",
    accent: "#ffd166",
    badge: "Smart",
  },
  {
    Icon: ClipboardList,
    title: "Full Audit Trace",
    desc: "Every call returns a TraceRecord with detected entities, confidence scores, and applied replacements. Feed your SIEM or build compliance dashboards on top.",
    accent: "var(--accent3)",
    badge: "Compliance",
  },
  {
    Icon: Trash2,
    title: "GDPR Right to Forget",
    desc: "A single API call wipes all vault mappings for a case or thread, satisfying Art. 17 GDPR. Per-tenant isolation ensures data never crosses customer boundaries.",
    accent: "var(--accent2)",
    badge: "Art. 17",
  },
  {
    Icon: Plug,
    title: "Any LLM, Any Framework",
    desc: "Works with OpenAI, Anthropic, Mistral, local models, or any HTTP endpoint. Deploy as Python SDK, FastAPI microservice, or Docker container.",
    accent: "var(--accent)",
    badge: "Provider-agnostic",
  },
  {
    Icon: Component,
    title: "Custom PII Detectors",
    desc: "Add regex rules at runtime with add_custom_regex(). Plug in any HuggingFace NER model as a Presidio recognizer subclass. Zero config files.",
    accent: "#ffd166",
    badge: "Extensible",
  },
  {
    Icon: Timer,
    title: "< 1ms Regex Mode",
    desc: "Pattern-based detection has effectively zero overhead. Presidio NER runs in 50-200ms. All modes work with async FastAPI and production workloads.",
    accent: "var(--accent3)",
    badge: "High performance",
  },
  {
    Icon: Radio,
    title: "Streaming Support",
    desc: "secure_call_stream() yields rehydrated tokens as they arrive from the LLM. Plug directly into SSE or WebSocket endpoints. No buffering.",
    accent: "var(--accent)",
    badge: "Real-time",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Features() {
  return (
    <section id="features" className="py-28" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(42,230,166,0.12)", border: "1px solid rgba(42,230,166,0.24)", color: "var(--accent2)" }}
          >
            Capabilities
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Everything you need for{" "}
            <span className="gradient-text">privacy-first AI</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Built for production. Designed for compliance. Zero compromise on LLM utility.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <GlowCard
                glowColor={`${f.accent}50`}
                className="h-full rounded-2xl p-5 card-hover flex flex-col gap-3"
                style={{
                  background: "linear-gradient(160deg, rgba(12, 21, 33, 0.9), rgba(8, 14, 24, 0.86))",
                  border: "1px solid var(--border)",
                  borderTop: `2px solid ${f.accent}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${f.accent}12`, border: `1px solid ${f.accent}28` }}
                  >
                    <f.Icon size={16} strokeWidth={1.75} color={f.accent} />
                  </div>
                  <span
                    className="shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${f.accent}18`, color: f.accent, border: `1px solid ${f.accent}35` }}
                  >
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                  {f.desc}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
