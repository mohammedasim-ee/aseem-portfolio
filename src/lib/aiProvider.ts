const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class ProviderError extends Error {
  code: string;
  status?: number;
  constructor(message: string, code: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/**
 * Calls the AI provider (Anthropic's Claude API by default). The API key
 * lives only in server environment variables - this function only ever runs
 * on the server (inside a Next.js Route Handler), never in the browser.
 */
export async function askDigitalTwin(systemPrompt: string, messages: ChatMessage[]) {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "claude-sonnet-4-6";

  if (!apiKey) {
    throw new ProviderError("AI_API_KEY is not configured on the server.", "MISSING_API_KEY");
  }

  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[aiProvider] provider error detail:", detail);
    throw new ProviderError(`AI provider request failed (${response.status})`, "PROVIDER_ERROR", response.status);
  }

  const data = await response.json();
  const text = (data.content || [])
    .filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n")
    .trim();

  return text || "I wasn't able to generate a response. Please try rephrasing your question.";
}
