"use client";

import { useState } from "react";
import { Copy, Check, Workflow } from "lucide-react";
import { siAnthropic, siFastapi, siLangchain } from "simple-icons";

type Integration = {
  id: string;
  label: string;
  subtitle: string;
  iconColor: string;
  icon: JSX.Element;
  stackTag: string;
  code: string;
};

function BrandIcon({
  path,
  title,
  color,
}: {
  path: string;
  title: string;
  color: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      role="img"
      aria-label={title}
      style={{ display: "block" }}
    >
      <path d={path} fill={color} />
    </svg>
  );
}

function OpenAIMark() {
  return (
    <svg viewBox="0 0 320 320" width="16" height="16" role="img" aria-label="OpenAI" style={{ display: "block" }}>
      <path
        d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"
        fill="#10a37f"
      />
    </svg>
  );
}

const integrations: Integration[] = [
  {
    id: "openai",
    label: "OpenAI",
    subtitle: "Provider",
    icon: <OpenAIMark />,
    iconColor: "#10a37f",
    stackTag: "Chat Completions",
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
    subtitle: "Provider",
    icon: <BrandIcon path={siAnthropic.path} title={siAnthropic.title} color="#d97757" />,
    iconColor: "#d97757",
    stackTag: "Claude Messages",
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
    subtitle: "Framework",
    icon: <BrandIcon path={siLangchain.path} title={siLangchain.title} color="#1c7ed6" />,
    iconColor: "#1c7ed6",
    stackTag: "Runnable wrapper",
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
    subtitle: "API Server",
    icon: <BrandIcon path={siFastapi.path} title={siFastapi.title} color="#00b89c" />,
    iconColor: "#009688",
    stackTag: "HTTP endpoint",
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
    subtitle: "Transport",
    icon: <Workflow size={15} color="#86b7ff" strokeWidth={2.2} aria-hidden="true" />,
    iconColor: "#86b7ff",
    stackTag: "SSE / WebSocket",
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
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2200);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
      style={{
        color: copied ? "var(--accent2)" : copyError ? "var(--accent3)" : "var(--text-muted)",
        background: copied ? "rgba(0,212,170,0.1)" : copyError ? "rgba(255,143,94,0.1)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? "rgba(0,212,170,0.3)" : copyError ? "rgba(255,143,94,0.35)" : "var(--border)"}`,
      }}
      aria-live="polite"
      aria-label={copied ? "Code copied" : copyError ? "Copy failed" : "Copy code"}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : copyError ? "Retry" : "Copy"}
    </button>
  );
}

export default function Integrations() {
  const [active, setActive] = useState("openai");
  const integ = integrations.find((i) => i.id === active)!;

  return (
    <section
      id="integrations"
      className="py-24"
      style={{
        background:
          "radial-gradient(900px circle at 12% 0%, rgba(0,194,255,0.1), transparent 48%), radial-gradient(780px circle at 90% 12%, rgba(42,230,166,0.08), transparent 42%), var(--bg)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.24)", color: "var(--accent)" }}
          >
            Integrations
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Drop into your stack{" "}
            <span className="gradient-text">in minutes</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Pick your ecosystem, paste the wrapper, and ship. Provider, framework, and transport examples are tuned for fast copy-paste.
          </p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Tab list */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 snap-x snap-mandatory">
            {integrations.map((i) => (
              <button
                key={i.id}
                onClick={() => setActive(i.id)}
                className="group flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-sm text-left transition-all whitespace-nowrap snap-start min-w-[220px] lg:min-w-0"
                style={
                  active === i.id
                    ? {
                        background: "linear-gradient(140deg, rgba(10,22,34,0.96), rgba(8,17,28,0.96))",
                        border: "1px solid rgba(0,194,255,0.52)",
                        color: "var(--text)",
                        boxShadow: "0 12px 30px rgba(2,12,22,0.35), 0 0 0 1px rgba(0,194,255,0.18) inset",
                      }
                    : {
                        background: "rgba(10,18,29,0.42)",
                        border: "1px solid rgba(102,136,168,0.22)",
                        color: "var(--text-muted)",
                      }
                }
                aria-pressed={active === i.id}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="grid place-items-center rounded-lg"
                    style={{
                      width: 28,
                      height: 28,
                      background: active === i.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${active === i.id ? "rgba(255,255,255,0.18)" : "rgba(102,136,168,0.24)"}`,
                    }}
                  >
                    {i.icon}
                  </span>
                  <span>
                    <span className="block font-semibold">{i.label}</span>
                    <span className="block text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {i.subtitle}
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              border: "1px solid rgba(102,136,168,0.4)",
              boxShadow: "0 26px 80px rgba(2,8,16,0.45), 0 0 0 1px rgba(0,194,255,0.07) inset",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.75), transparent)" }}
            />

            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ background: "#0c1623", borderColor: "rgba(102,136,168,0.32)" }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="grid place-items-center rounded-lg"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(102,136,168,0.36)",
                  }}
                >
                  {integ.icon}
                </span>
                <div>
                  <span className="text-sm font-bold block" style={{ color: "var(--text)" }}>
                    {integ.label}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {integ.stackTag}
                  </span>
                </div>
              </div>
              <CopyBtn code={integ.code} />
            </div>

            {/* Code body */}
            <pre
              className="p-6 text-sm overflow-x-auto"
              style={{
                background: "#08111c",
                color: "#d6e7f7",
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
