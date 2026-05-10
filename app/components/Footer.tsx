"use client";
import { Shield, GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      {/* CTA band */}
      <div
        className="py-20"
        style={{
          background: "linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,212,170,0.06) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Ready to protect your AI?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Open source, Apache 2.0. No vendor lock-in. Works with any LLM provider.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#quickstart"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Get started now
            </a>
            <a
              href="https://github.com/your-org/pii-firewall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <GitBranch size={16} /> View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}
          >
            <Shield size={14} color="#6c63ff" />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
            PII Firewall
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            v0.1
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
          <span>Apache 2.0 License</span>
          <span>Built for privacy-first AI applications</span>
          <a
            href="https://github.com/your-org/pii-firewall"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <GitBranch size={13} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
