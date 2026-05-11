"use client";

import { motion } from "framer-motion";
import { Trash2, Building2, ScrollText } from "lucide-react";
import GlowCard from "./ui/GlowCard";

const languages = [
  { code: "es", name: "Spanish", abbr: "ES", patterns: "DNI, NIE, IBAN-ES, phone" },
  { code: "en", name: "English", abbr: "EN", patterns: "SSN, EIN, ZIP, US phone" },
  { code: "fr", name: "French", abbr: "FR", patterns: "INSEE, SIREN, phone" },
  { code: "de", name: "German", abbr: "DE", patterns: "Steuernummer, IBAN-DE" },
  { code: "it", name: "Italian", abbr: "IT", patterns: "Codice Fiscale, phone" },
  { code: "pt", name: "Portuguese", abbr: "PT", patterns: "NIF, NIS, phone" },
  { code: "55+", name: "Others", abbr: "55+", patterns: "Global patterns & auto-detect" },
];

const gdprFeatures = [
  {
    Icon: Trash2,
    color: "var(--accent3)",
    title: "Right to Erasure (Art. 17)",
    desc: "firewall.forget() wipes all vault mappings for a thread or case. After deletion, rehydration will not restore any original values for that scope.",
    code: `deleted = firewall.forget(\n    tenant_id="hospital-001",\n    case_id="patient-123",\n    thread_id="consultation-1",\n)\n# -> 14 mappings deleted`,
  },
  {
    Icon: Building2,
    color: "#86b7ff",
    title: "Tenant Isolation",
    desc: "Token mappings are scoped by tenant_id. The same [PERSON_001] token in different tenants never shares a mapping. Hard isolation at the data layer.",
    code: `context = {\n    "tenant_id": "hospital-001",  # hard boundary\n    "case_id":   "patient-123",\n    "thread_id": "consultation-1",\n    "actor_id":  "doctor-456",\n}`,
  },
  {
    Icon: ScrollText,
    color: "var(--accent4)",
    title: "Audit Trail",
    desc: "Every call produces a TraceRecord with entity types, confidence scores, and applied replacements — ready for your compliance dashboard or SIEM.",
    code: `result.trace.detected_entities\n# [{type:"PERSON", text:"Ana Garcia",\n#   confidence: 0.97}, ...]\n\nresult.trace.replacements\n# [{"original":"Ana Garcia",\n#    "token":"[PERSON_001]"}, ...]`,
  },
];

export default function Languages() {
  return (
    <section id="languages" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Language section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
            <p className="text-base mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Language detected automatically per message with thread-level caching — zero latency after the first call. Locale-specific patterns ensure country IDs and formats are recognized correctly.
            </p>
            <div
              className="rounded-xl p-4 text-sm"
              style={{ background: "rgba(42,230,166,0.06)", border: "1px solid rgba(42,230,166,0.22)", color: "var(--text-muted)" }}
            >
              <strong style={{ color: "var(--accent2)" }}>Auto-detect or force a language:</strong>
              <pre className="mt-2 text-xs" style={{ color: "#d6e7f7" }}>
                {`# Auto-detect (default)\nfirewall = create_firewall("healthcare")\n\n# Force Spanish\nfirewall = create_firewall("healthcare", language="es")`}
              </pre>
            </div>
          </motion.div>

          {/* Language grid — replace flags with styled abbr badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {languages.map((l, i) => (
              <motion.div
                key={l.code}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <GlowCard
                  glowColor="rgba(0,212,170,0.3)"
                  className="rounded-xl p-4 card-hover h-full"
                  style={{ background: "linear-gradient(160deg, rgba(12, 21, 33, 0.9), rgba(8, 14, 24, 0.86))", border: "1px solid var(--border)" }}
                >
                  <div
                    className="text-xs font-black font-mono mb-2 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", color: "var(--accent2)" }}
                  >
                    {l.abbr}
                  </div>
                  <div className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{l.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{l.patterns}</div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* GDPR section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,143,94,0.12)", border: "1px solid rgba(255,143,94,0.24)", color: "var(--accent3)" }}
          >
            GDPR Compliance
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Built for regulatory compliance
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            GDPR Art. 17 right to erasure, tenant isolation, and full audit traces — out of the box.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {gdprFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <GlowCard
                glowColor={`${f.color}40`}
                className="rounded-2xl p-6 card-hover h-full flex flex-col gap-3"
                style={{ background: "linear-gradient(160deg, rgba(12, 21, 33, 0.9), rgba(8, 14, 24, 0.86))", border: "1px solid var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}28` }}
                >
                  <f.Icon size={16} strokeWidth={1.75} color={f.color} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
                <pre
                  className="text-xs rounded-lg p-3 overflow-x-auto mt-auto"
                  style={{ background: "#08111c", border: "1px solid var(--border)", color: "#d6e7f7", whiteSpace: "pre-wrap" }}
                >
                  {f.code}
                </pre>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
