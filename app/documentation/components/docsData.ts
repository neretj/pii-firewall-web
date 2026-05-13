export type DocSubsection = {
  id: string;
  title: string;
  body: string;
  tags?: string[];
  points?: string[];
  checklist?: string[];
  steps?: string[];
  metrics?: Array<{ label: string; value: string; tone?: "info" | "success" | "warn" }>;
  doDont?: { do: string[]; avoid: string[] };
  callout?: {
    label: string;
    text: string;
    tone?: "info" | "success" | "warn";
  };
  table?: {
    columns: string[];
    rows: string[][];
  };
  code?: string;
};

export type DocSection = {
  id: string;
  title: string;
  intro: string;
  subsections: DocSubsection[];
};

export const docsSections: DocSection[] = [

  // ─── 1. INSTALL ─────────────────────────────────────────────────────────────
  {
    id: "install",
    title: "Install",
    intro: "Package is pii-firewall on PyPI. Import from privacy_firewall.",
    subsections: [
      {
        id: "install-options",
        title: "Pick your install",
        body: "Start with the recommended option. Add extras only when you need them.",
        table: {
          columns: ["Command", "What you get"],
          rows: [
            ["pip install pii-firewall", "Regex-only. No ML. Good for IDs, emails, phones."],
            ['pip install "pii-firewall[presidio,langdetect]"', "Recommended. Named entities + 55-language auto-detect."],
            ['pip install "pii-firewall[all]"', "Every backend: GLiNER, Transformers, OPF, Nemotron."],
            ['pip install "pii-firewall[gliner]"', "Zero-shot NER, no fine-tuning."],
            ['pip install "pii-firewall[transformers]"', "Biomedical NER (BioBERT, d4data)."],
          ],
        },
        code: "# Recommended\npip install \"pii-firewall[presidio,langdetect]\"\n\n# Download spaCy models for the languages you use\npython -m spacy download en_core_web_sm\npython -m spacy download es_core_news_sm\npython -m spacy download fr_core_news_sm",
        callout: {
          label: "Single-language apps",
          text: "Skip [langdetect] and pass language=\"es\" to create_firewall. Saves a dependency and removes auto-detection overhead.",
          tone: "info",
        },
      },
    ],
  },

  // ─── 2. QUICKSTART ──────────────────────────────────────────────────────────
  {
    id: "quickstart",
    title: "Quickstart",
    intro: "One import, one call. The firewall anonymizes input, calls the model, and restores real values in the response.",
    subsections: [
      {
        id: "quickstart-minimal",
        title: "Minimal example",
        body: "process() runs the full detect → anonymize → LLM → rehydrate cycle.",
        code: "from privacy_firewall import create_firewall\n\nfirewall = create_firewall(\"healthcare\")\n\nresult = firewall.process(\n    text=\"Ana García, 43 años, hipertensión. Prescripción: enalapril 10mg.\",\n    context={\n        \"tenant_id\": \"hospital-001\",\n        \"case_id\":   \"patient-123\",\n        \"thread_id\": \"consultation-1\",\n        \"actor_id\":  \"doctor-456\",\n    },\n)\n\nprint(result.sanitized_text)\n# → \"[PERSON_001], 40-49, hipertensión. enalapril 10mg.\"\n#   Name pseudonymized. Age generalized. Medical terms KEPT.\n\nprint(result.final_text)\n# → LLM response with real names restored.",
      },
      {
        id: "quickstart-context",
        title: "Context fields",
        body: "All calls require these four fields. thread_id drives token-mapping continuity across turns.",
        table: {
          columns: ["Field", "Role"],
          rows: [
            ["tenant_id", "Hard isolation boundary between customers."],
            ["thread_id", "Maps tokens consistently across a conversation. [PERSON_001] always means the same person."],
            ["case_id", "Groups related threads (e.g. one patient). Used for GDPR forget()."],
            ["actor_id", "Audit trail. Does not affect token logic."],
          ],
        },
      },
    ],
  },

  // ─── 3. PROFILES ────────────────────────────────────────────────────────────
  {
    id: "profiles",
    title: "Domain Profiles",
    intro: "Profiles define what survives the anonymization pass — what the model is allowed to see — and what action is taken on everything else.",
    subsections: [
      {
        id: "profiles-presets",
        title: "Built-in presets",
        body: "Pass the preset name to create_firewall(). Treat presets as starting points, then copy and customize the profile or backend mix. See the custom profile example below.",
        table: {
          columns: ["Profile", "Keeps", "Pseudonymizes", "Transforms"],
          rows: [
            ["healthcare", "Diagnoses, medications, procedures, lab values", "Names, IDs, addresses", "Ages → decade range, dates → month/year"],
            ["finance", "Company names; amounts pass through as non-PII", "Names, account numbers, IBANs, tax IDs", "Credit cards masked (************1111)"],
            ["legal", "Court/firm names, statutes, case citations (public record)", "Party names, strong identifiers", "All dates → month/year"],
            ["generic", "Safe defaults for any domain", "Names, emails, phones, IDs", "—"],
          ],
        },
        code: "firewall = create_firewall(\"healthcare\")        # or \"finance\", \"legal\", \"generic\"\nfirewall = create_firewall(\"healthcare\", detector_backend=\"presidio\")\nfirewall = create_firewall(\"healthcare\", detector_backend=\"presidio\", language=\"es\")",
      },
      {
        id: "profiles-custom",
        title: "Custom profile",
        body: "Create a profile from scratch and set per-entity actions.",
        code: "from privacy_firewall import (\n    create_custom_profile,\n    EntityDisposition,\n    DispositionAction,\n    create_firewall,\n)\n\nprofile = create_custom_profile(\"my_domain\")\n\nprofile.add_disposition(EntityDisposition(\n    entity_type=\"EMPLOYEE_ID\",\n    action=DispositionAction.PSEUDONYMIZE,\n    confidence_threshold=0.9,\n))\nprofile.add_disposition(EntityDisposition(\n    entity_type=\"CASE_NUMBER\",\n    action=DispositionAction.KEEP,\n    confidence_threshold=0.8,\n))\n\nfirewall = create_firewall(\"generic\", profile=profile)",
      },
      {
        id: "profiles-actions",
        title: "Disposition actions",
        body: "Only PSEUDONYMIZE is reversible — vault stores the original. Every other action permanently discards it.",
        table: {
          columns: ["Action", "Example", "Reversible?"],
          rows: [
            ["KEEP", "hipertensión → hipertensión", "N/A"],
            ["PSEUDONYMIZE", "Ana García → [PERSON_001]", "Yes — vault mapping"],
            ["GENERALIZE", "43 años → 40-49", "No"],
            ["MASK", "4111 1111 1111 1111 → ************1111", "No"],
            ["HASH", "SHA-256 digest", "No"],
            ["REDACT", "span removed entirely", "No"],
          ],
        },
      },
    ],
  },

  // ─── 4. BACKENDS ────────────────────────────────────────────────────────────
  {
    id: "backends",
    title: "Detection Backends",
    intro: "Switch backends with a single parameter. Start from a preset, then customize the profile or backend mix with custom regex, recognizers, or model IDs.",
    subsections: [
      {
        id: "backends-table",
        title: "Backend comparison",
        body: "presidio is the default for production. regex for zero-dependency paths. hybrid is the fallback when you want maximum coverage.",
        table: {
          columns: ["Backend", "Extra install", "Best for", "Latency"],
          rows: [
            ["regex", "(none)", "Structured IDs, emails, phones", "< 1 ms"],
            ["presidio", "[presidio] + spaCy model", "Named entities — best balance", "50–200 ms"],
            ["gliner", "[gliner]", "Zero-shot NER", "100–400 ms"],
            ["transformers", "[transformers]", "Biomedical NER (d4data, BC5CDR)", "100–500 ms"],
            ["opf", "[opf]", "Language-agnostic token classifier", "50–200 ms"],
            ["nemotron", "[opf]", "High recall on free text", "100–300 ms"],
            ["hybrid", "[presidio,langdetect]", "Regex + Presidio combined", "50–250 ms"],
          ],
        },
        code: "firewall = create_firewall(\"healthcare\", detector_backend=\"presidio\")   # recommended\nfirewall = create_firewall(\"healthcare\", detector_backend=\"regex\")      # zero deps\nfirewall = create_firewall(\"healthcare\", detector_backend=\"gliner\")      # zero-shot NER\nfirewall = create_firewall(\"healthcare\", detector_backend=\"transformers\", transformer_model_id=\"d4data/biomedical-ner-all\")\nfirewall = create_firewall(\"healthcare\", detector_backend=\"opf\")          # token classifier\nfirewall = create_firewall(\"healthcare\", detector_backend=\"hybrid\")        # max coverage",
      },
    ],
  },

  // ─── 5. INTEGRATIONS ─────────────────────────────────────────────────────────
  {
    id: "integrations",
    title: "Integrations",
    intro: "Pass any callable(prompt: str) -> str as llm_client. Works with OpenAI, Anthropic, LangChain, local models — anything. For FastAPI, use the microservice pattern below.",
    subsections: [
      {
        id: "integrations-openai",
        title: "OpenAI",
        body: "",
        tags: ["OpenAI", "GPT-4o"],
        code: "from openai import OpenAI\nfrom privacy_firewall import create_firewall\n\nclient   = OpenAI()\nfirewall = create_firewall(\"healthcare\", detector_backend=\"presidio\")\nctx      = {\"tenant_id\": \"t1\", \"case_id\": \"c1\", \"thread_id\": \"th1\", \"actor_id\": \"u1\"}\n\ndef llm(prompt: str) -> str:\n    return client.chat.completions.create(\n        model=\"gpt-4o\",\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    ).choices[0].message.content\n\nresult = firewall.secure_call(text=user_input, context=ctx, llm_client=llm)\nprint(result.final_text)   # real names restored",
      },
      {
        id: "integrations-anthropic",
        title: "Anthropic",
        body: "",
        tags: ["Anthropic", "Claude"],
        code: "import anthropic\nfrom privacy_firewall import create_firewall\n\nac       = anthropic.Anthropic()\nfirewall = create_firewall(\"healthcare\", detector_backend=\"presidio\")\n\ndef llm(prompt: str) -> str:\n    return ac.messages.create(\n        model=\"claude-opus-4-5\",\n        max_tokens=1024,\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n    ).content[0].text\n\nresult = firewall.secure_call(text=user_input, context=ctx, llm_client=llm)",
      },
      {
        id: "integrations-langchain",
        title: "LangChain",
        body: "",
        tags: ["LangChain"],
        code: "from langchain_openai import ChatOpenAI\nfrom privacy_firewall import create_firewall\n\nllm_chain = ChatOpenAI(model=\"gpt-4o\")\nfirewall   = create_firewall(\"generic\", detector_backend=\"presidio\")\n\nresult = firewall.secure_call(\n    text=user_input,\n    context=ctx,\n    llm_client=lambda prompt: llm_chain.invoke(prompt).content,\n)",
      },
      {
        id: "integrations-streaming",
        title: "Streaming (SSE / WebSocket)",
        body: "Yields rehydrated tokens as they arrive from the model. No buffering needed.",
        tags: ["Streaming", "SSE"],
        code: "# secure_call_stream yields tokens with real names already restored\nfor token in firewall.secure_call_stream(\n    text=user_input,\n    context=ctx,\n    llm_client=your_streaming_llm,\n):\n    yield token   # send to SSE / WebSocket immediately",
      },
    ],
  },

  // ─── 6. MICROSERVICE PATTERN ─────────────────────────────────────────────────
  {
    id: "microservice",
    title: "Microservice Pattern",
    intro: "Run the firewall as a sidecar HTTP service. Any language can call it — Node.js, Go, Java, anything with fetch.",
    subsections: [
      {
        id: "microservice-python",
        title: "Python microservice",
        body: "Configure via env vars. Expose /sanitize and /rehydrate.",
        code: "# main.py\nimport os\nfrom contextlib import asynccontextmanager\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nfrom privacy_firewall import PrivacyFirewallSDK\n\nSDK = None\n\n@asynccontextmanager\nasync def lifespan(app):\n    global SDK\n    SDK = PrivacyFirewallSDK.create(\n        domain=os.getenv(\"PII_DOMAIN\", \"healthcare\"),\n        language=os.getenv(\"PII_LANGUAGE\") or None,\n        detector_backend=os.getenv(\"PII_BACKEND\", \"presidio\"),\n    )\n    yield\n\napp = FastAPI(lifespan=lifespan)\n\nclass Req(BaseModel):\n    text: str\n    context: dict\n\n@app.post(\"/sanitize\")\nasync def sanitize(req: Req):\n    if not SDK: raise HTTPException(503)\n    return {\"sanitized_text\": SDK.anonymize_text(req.text, req.context).sanitized_text}\n\n@app.post(\"/rehydrate\")\nasync def rehydrate(req: Req):\n    if not SDK: raise HTTPException(503)\n    return {\"final_text\": SDK.rehydrate_text(req.text, req.context)}\n\n@app.get(\"/health\")\nasync def health(): return {\"ok\": SDK is not None}",
      },
      {
        id: "microservice-node",
        title: "Calling from TypeScript / Node.js",
        body: "",
        code: "const BASE = process.env.PII_URL ?? \"http://localhost:8000\";\n\nexport async function sanitize(text: string, ctx: Record<string, string>) {\n  const r = await fetch(`${BASE}/sanitize`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ text, context: ctx }),\n  });\n  return (await r.json()).sanitized_text as string;\n}\n\nexport async function rehydrate(text: string, ctx: Record<string, string>) {\n  const r = await fetch(`${BASE}/rehydrate`, {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify({ text, context: ctx }),\n  });\n  return (await r.json()).final_text as string;\n}",
      },
      {
        id: "microservice-env",
        title: "Environment variables",
        body: "These are read by your bootstrap code — not by the library itself.",
        table: {
          columns: ["Variable", "Default", "Values"],
          rows: [
            ["PII_DOMAIN", "healthcare", "healthcare, finance, legal, generic"],
            ["PII_LANGUAGE", "(auto)", "es, en, fr, de, it, pt — or omit for auto-detect"],
            ["PII_BACKEND", "presidio", "presidio, regex, hybrid, gliner, transformers, opf, nemotron"],
          ],
        },
      },
    ],
  },

  // ─── 7. VAULT & GDPR ─────────────────────────────────────────────────────────
  {
    id: "vault",
    title: "Vault & GDPR",
    intro: "The vault stores token ↔ original-value mappings per tenant + case + thread. Use forget() to satisfy Art. 17 GDPR erasure requests.",
    subsections: [
      {
        id: "vault-options",
        title: "Vault backends",
        body: "Default is in-memory. Switch to SQLite for persistence across restarts.",
        code: "# In-memory (default) — wiped on restart\nfirewall = create_firewall(\"healthcare\")\n\n# SQLite — survives restarts\nfrom privacy_firewall import SQLiteMappingVault\nvault    = SQLiteMappingVault(\"privacy_vault.db\")\nfirewall = create_firewall(\"healthcare\", vault=vault)",
      },
      {
        id: "vault-manual",
        title: "Manual anonymize / rehydrate",
        body: "Split the round-trip when your LLM call lives outside the firewall process.",
        code: "# Step 1 — Anonymize before sending to LLM\nanon       = firewall.anonymize(text=raw_text, context=ctx)\nclean_text = anon.sanitized_text\n\n# Step 2 — Call LLM with sanitized text\nllm_out = my_llm(clean_text)\n\n# Step 3 — Rehydrate on the way back\nfinal = firewall.rehydrate(text=llm_out, context=ctx)\nprint(final)   # original names restored",
      },
      {
        id: "vault-gdpr",
        title: "GDPR right to be forgotten",
        body: "forget() removes all vault mappings for the given scope. After this call rehydration will not restore values for that thread.",
        code: "deleted = firewall.forget(\n    tenant_id=\"hospital-001\",\n    case_id=\"patient-123\",\n    thread_id=\"consultation-1\",\n)\nprint(f\"Deleted {deleted} mappings\")",
        callout: {
          label: "Note",
          text: "Only vault mappings are deleted. LLM responses or logs your application has already stored are outside the library's scope.",
          tone: "warn",
        },
      },
    ],
  },

  // ─── 8. CUSTOM ENTITIES ──────────────────────────────────────────────────────
  {
    id: "custom-entities",
    title: "Custom Entities",
    intro: "Register your own entity types at runtime — no config files. Option A (regex) works with any backend. Option B (recognizer) requires presidio.",
    subsections: [
      {
        id: "custom-entities-regex",
        title: "Option A — Regex (any backend)",
        body: "Fastest path. Pass a regex string and a disposition action.",
        code: "# One-liner\nfirewall.add_custom_regex(\n    entity_type=\"EMPLOYEE_ID\",\n    regex=r\"\\bEMP-\\d{6}\\b\",\n    locales=[\"GLOBAL\"],          # or [\"US\"], [\"ES\"]...\n    confidence=0.95,\n    context_words=[\"employee\", \"staff\"],\n    disposition_action=\"pseudonymize\",   # keep / pseudonymize / generalize / mask / redact\n)\n\n# Full EntityPattern for more control\nimport re\nfrom privacy_firewall.patterns.catalog import EntityPattern\n\nfirewall.add_custom_pattern(EntityPattern(\n    entity_type=\"CASE_NUMBER\",\n    locale=\"ES\",\n    pattern=re.compile(r\"\\bEXP-\\d{4}/\\d{6}\\b\"),\n    confidence=0.98,\n    context_words=(\"expediente\", \"exp\"),\n    description=\"Spanish legal case number\",\n))",
      },
      {
        id: "custom-entities-presidio",
        title: "Option B — Presidio recognizer",
        body: "Use create_custom_recognizer() as a shortcut, or subclass EntityRecognizer for full control.",
        code: "from privacy_firewall import create_firewall\nfrom privacy_firewall.presidio_integration import create_custom_recognizer\n\nrecognizer = create_custom_recognizer(\n    entity_type=\"EMPLOYEE_ID\",\n    patterns=[r\"\\bEMP\\d{6}\\b\"],\n    context_words=[\"employee\", \"badge\"],\n    score=0.9,\n)\n\nfirewall = create_firewall(\n    \"generic\",\n    detector_backend=\"presidio\",\n    custom_recognizers=[recognizer],\n)\n\n# ── Full ML-based recognizer ──────────────────────────────────\nfrom presidio_analyzer import EntityRecognizer, RecognizerResult\n\nclass MyRecognizer(EntityRecognizer):\n    def load(self): ...\n    def analyze(self, text, entities, nlp_artifacts):\n        return [\n            RecognizerResult(\"CUSTOM\", s.start, s.end, s.score)\n            for s in my_model.predict(text)\n        ]\n\nfirewall = create_firewall(\n    \"generic\",\n    detector_backend=\"presidio\",\n    custom_recognizers=[MyRecognizer(supported_entities=[\"CUSTOM\"])],\n)",
      },
    ],
  },

  // ─── 9. CUSTOM MODELS ────────────────────────────────────────────────────────
  {
    id: "custom-models",
    title: "Custom HuggingFace Models",
    intro: "Pass any HuggingFace model ID to the transformers backend. The model is downloaded automatically on first call.",
    subsections: [
      {
        id: "custom-models-install",
        title: "Install",
        body: "",
        code: "pip install \"pii-firewall[transformers]\"",
      },
      {
        id: "custom-models-usage",
        title: "Usage",
        body: "Swap transformer_model_id for any HF NER model.",
        code: "from privacy_firewall import create_firewall\n\n# Any HuggingFace NER model ID\nfirewall = create_firewall(\n    \"healthcare\",\n    detector_backend=\"transformers\",\n    transformer_model_id=\"dslim/bert-base-NER\",\n)\n\n# GPU (0 = first card, -1 = CPU default)\nfirewall = create_firewall(\n    \"healthcare\",\n    detector_backend=\"transformers\",\n    transformer_model_id=\"d4data/biomedical-ner-all\",\n    transformer_device=0,\n)\n\n# Use the built-in curated catalog\nfrom privacy_firewall.transformers_ner.models import get_model_for_domain\nconfig   = get_model_for_domain(\"medical\", \"en\")\nfirewall = create_firewall(\"healthcare\", detector_backend=\"transformers\", transformer_model_id=config.model_id)",
      },
      {
        id: "custom-models-catalog",
        title: "Curated models",
        body: "Pre-vetted models shipped in transformers_ner/models.py.",
        table: {
          columns: ["Domain", "Language", "Model ID"],
          rows: [
            ["General", "en", "dslim/bert-base-NER"],
            ["General", "multilingual", "Davlan/xlm-roberta-base-ner-hrl"],
            ["General", "fr", "Jean-Baptiste/camembert-ner"],
            ["Medical", "en", "d4data/biomedical-ner-all"],
            ["Medical", "es", "PlanTL-GOB-ES/bsc-bio-ehr-es"],
          ],
        },
      },
      {
        id: "custom-models-hf-hybrid",
        title: "Combine HF model with regex (Presidio hybrid)",
        body: "Wrap the HF model as a Presidio recognizer so you can mix it with locale regex patterns in one pipeline.",
        code: "from presidio_analyzer import EntityRecognizer, RecognizerResult\nfrom transformers import pipeline\n\nclass HFRecognizer(EntityRecognizer):\n    def __init__(self, model_id: str):\n        super().__init__(supported_entities=[\"PERSON\", \"ORG\", \"LOC\"])\n        self._pipe = pipeline(\"ner\", model=model_id, aggregation_strategy=\"simple\")\n    def load(self): ...\n    def analyze(self, text, entities, nlp_artifacts):\n        return [\n            RecognizerResult(s[\"entity_group\"], s[\"start\"], s[\"end\"], s[\"score\"])\n            for s in self._pipe(text)\n        ]\n\nfirewall = create_firewall(\n    \"healthcare\",\n    detector_backend=\"presidio\",\n    custom_recognizers=[HFRecognizer(\"dslim/bert-base-NER\")],\n)",
      },
    ],
  },

  // ─── 10. LANGUAGE SUPPORT ────────────────────────────────────────────────────
  {
    id: "languages",
    title: "Language Support",
    intro: "Auto-detects 55+ languages. Thread-level cache means 0 ms overhead after the first request. Six locales have dedicated country-document patterns.",
    subsections: [
      {
        id: "languages-locales",
        title: "Locale patterns",
        body: "Other languages fall back to global patterns (email, phone, credit card, IBAN).",
        table: {
          columns: ["Language", "Code", "Country patterns", "spaCy model"],
          rows: [
            ["Spanish", "es", "DNI, NIE, IBAN-ES", "es_core_news_sm"],
            ["English (US)", "en", "SSN, EIN, ZIP", "en_core_web_sm"],
            ["French", "fr", "INSEE, SIREN", "fr_core_news_sm"],
            ["German", "de", "Steuernummer, IBAN-DE", "de_core_news_sm"],
            ["Italian", "it", "Codice Fiscale", "it_core_news_sm"],
            ["Portuguese", "pt", "NIF, NIS", "pt_core_news_sm"],
          ],
        },
        code: "# Force a single language (skips auto-detect)\nfirewall = create_firewall(\"healthcare\", language=\"es\")\n\n# Pre-warm spaCy models at startup — avoids lazy-load latency\nfirewall.preload_languages([\"es\", \"en\", \"fr\"])",
      },
    ],
  },

  // ─── 11. API REFERENCE ───────────────────────────────────────────────────────
  {
    id: "api-reference",
    title: "API Reference",
    intro: "Key methods and return fields.",
    subsections: [
      {
        id: "api-create",
        title: "create_firewall()",
        body: "",
        table: {
          columns: ["Parameter", "Type", "Default", "Notes"],
          rows: [
            ["domain", "str", "\"generic\"", "\"healthcare\", \"finance\", \"legal\", \"generic\""],
            ["profile", "DomainProfile", "None", "Custom profile — overrides domain."],
            ["language", "str | None", "None (auto)", "\"es\", \"en\", \"fr\", \"de\", \"it\", \"pt\""],
            ["detector_backend", "str", "\"regex\"", "\"regex\", \"presidio\", \"hybrid\", \"gliner\", \"transformers\", \"opf\", \"nemotron\""],
            ["vault", "MappingVaultProtocol", "InMemory", "Pass SQLiteMappingVault for persistence."],
            ["custom_recognizers", "list", "[]", "Presidio EntityRecognizer instances."],
            ["transformer_model_id", "str", "None", "HF model ID (transformers backend)."],
            ["transformer_device", "int", "-1", "GPU index. -1 = CPU."],
          ],
        },
      },
      {
        id: "api-methods",
        title: "PrivacyFirewall methods",
        body: "",
        table: {
          columns: ["Method", "Returns", "Description"],
          rows: [
            ["process(text, context)", "ProcessResult", "anonymize + call LLM + rehydrate."],
            ["secure_call(text, context, llm_client)", "ProcessResult", "Explicit LLM client version of process()."],
            ["secure_call_stream(text, context, llm_client)", "Iterator[str]", "Streaming — yields rehydrated tokens."],
            ["anonymize(text, context)", "ProcessResult", "Detect + replace only. No LLM call."],
            ["rehydrate(text, context)", "str", "Restore vault values in text."],
            ["forget(tenant_id, case_id, thread_id)", "int", "Delete vault scope. Returns deleted count."],
            ["add_custom_regex(...)", "None", "Register regex entity at runtime."],
            ["add_custom_pattern(EntityPattern)", "None", "Register full EntityPattern at runtime."],
            ["preload_languages(list)", "None", "Pre-warm spaCy models at startup."],
          ],
        },
      },
      {
        id: "api-result",
        title: "ProcessResult fields",
        body: "",
        table: {
          columns: ["Field", "Description"],
          rows: [
            ["sanitized_text", "Anonymized text sent to the LLM."],
            ["model_output", "Raw LLM response (tokens not yet replaced)."],
            ["final_text", "Rehydrated LLM output — real values restored."],
            ["trace.detected_entities", "All detected entities with type, span, confidence."],
            ["trace.entities_kept", "Entities that received KEEP disposition."],
            ["trace.replacements", "Applied substitutions: original → token."],
            ["trace.language", "Detected or forced language code."],
            ["trace.cleanup_warnings", "Residual PII warnings after cleanup passes."],
          ],
        },
      },
    ],
  },

];
