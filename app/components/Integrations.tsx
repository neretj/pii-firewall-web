"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const integrations = [
  {
    id: "openai",
    label: "OpenAI",
    icon: "◆",
    iconColor: "#10a37f",
    code: `from openai import OpenAI
from privacy_firewall import create_firewall

client = OpenAI()
firewall = create_firewall("healthcare", detector_backend="presidio")
context = {"tenant_id": "acme", "case_id": "c1", "thread_id": "t1", "actor_id": "u1"}

def openai_llm(prompt: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
    )
    return resp.choices[0].message.content

# PII is stripped before reaching OpenAI, restored in the reply
result = firewall.secure_call(text=user_input, context=context, llm_client=openai_llm)
print(result.final_text)  # real names restored`,
  },
  {
    id: "anthropic",
    label: "Anthropic",
    icon: "◈",
    iconColor: "#d97757",
    code: `import anthropic
from privacy_firewall import create_firewall

ac = anthropic.Anthropic()
firewall = create_firewall("healthcare", detector_backend="presidio")

def anthropic_llm(prompt: str) -> str:
    msg = ac.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return msg.content[0].text

result = firewall.secure_call(
    text="Patient Ana García, DNI 12345678A, with hypertension.",
    context=context,
    llm_client=anthropic_llm,
)
print(result.final_text)  # "Patient Ana García, DNI 12345678A, with hypertension."`,
  },
  {
    id: "langchain",
    label: "LangChain",
    icon: "⛓",
    iconColor: "#1c7ed6",
    code: `from langchain_openai import ChatOpenAI
from privacy_firewall import create_firewall

llm = ChatOpenAI(model="gpt-4o")
firewall = create_firewall("generic", detector_backend="presidio")

def langchain_llm(prompt: str) -> str:
    return llm.invoke(prompt).content

result = firewall.secure_call(
    text="Contact John Doe at john@company.com.",
    context=context,
    llm_client=langchain_llm,
)
print(result.final_text)  # real email restored in reply`,
  },
  {
    id: "fastapi",
    label: "FastAPI",
    icon: "⚡",
    iconColor: "#009688",
    code: `from fastapi import FastAPI
from privacy_firewall import PrivacyFirewallSDK

app = FastAPI()
sdk = PrivacyFirewallSDK.create(domain="healthcare", detector_backend="presidio")

@app.post("/chat")
async def chat(req: dict):
    context = req["context"]
    anon = sdk.anonymize_text(text=req["message"], context=context)
    llm_response = await call_your_llm(anon.sanitized_text)
    final = sdk.rehydrate_text(text=llm_response, context=context)
    return {"response": final}`,
  },
  {
    id: "streaming",
    label: "Streaming",
    icon: "↝",
    iconColor: "#bd93f9",
    code: `from privacy_firewall import create_firewall

firewall = create_firewall("healthcare", detector_backend="presidio")

def streaming_llm(prompt: str):
    # yield tokens from OpenAI streaming, Anthropic streaming, etc.
    ...

# Rehydrated tokens streamed back as they arrive — no buffering
for token in firewall.secure_call_stream(
    text=user_input,
    context=context,
    llm_client=streaming_llm,
):
    yield token  # safe to send directly to SSE / WebSocket`,
  },
];

function CopyBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
      style={{
        color: copied ? "var(--accent2)" : "var(--text-muted)",
        background: copied ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? "rgba(0,212,170,0.3)" : "var(--border)"}`,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Integrations() {
  const [active, setActive] = useState("openai");
  const integ = integrations.find((i) => i.id === active)!;

  return (
    <section id="integrations" className="py-24" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)", color: "var(--accent)" }}
          >
            Integrations
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Drop into your stack{" "}
            <span className="gradient-text">in minutes</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Works with any LLM provider. Wrap any callable — no SDK lock-in.
          </p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Tab list */}
          <div className="flex lg:flex-col gap-2">
            {integrations.map((i) => (
              <button
                key={i.id}
                onClick={() => setActive(i.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all"
                style={
                  active === i.id
                    ? { background: "var(--surface)", border: "1px solid var(--accent)", color: "var(--text)" }
                    : { background: "transparent", border: "1px solid transparent", color: "var(--text-muted)" }
                }
              >
                <span style={{ color: i.iconColor, fontSize: "1rem" }}>{i.icon}</span>
                {i.label}
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: integ.iconColor, fontSize: "1rem" }}>{integ.icon}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {integ.label}
                </span>
              </div>
              <CopyBtn code={integ.code} />
            </div>

            {/* Code body */}
            <pre
              className="p-6 text-sm overflow-x-auto"
              style={{
                background: "#0d1117",
                color: "#c9d1d9",
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                lineHeight: 1.7,
                minHeight: "340px",
              }}
            >
              <code>{integ.code}</code>
            </pre>
          </div>
        </div>

        {/* Sub-footer note */}
        <p className="text-center text-sm mt-8" style={{ color: "var(--text-muted)" }}>
          No SDK lock-in — wrap any HTTP LLM endpoint, local model with Ollama, or LiteLLM proxy the same way.
        </p>
      </div>
    </section>
  );
}
