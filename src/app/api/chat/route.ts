import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/knowledgeBase";
import { askDigitalTwin, ProviderError, type ChatMessage } from "@/lib/aiProvider";
import { isRateLimited } from "@/lib/rateLimit";

const MAX_QUESTION_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 12;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before asking another question." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "That request wasn't valid JSON." }, { status: 400 });
    }

    const { question, history } = (body || {}) as { question?: unknown; history?: unknown };

    if (typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "Please type a question before sending." }, { status: 400 });
    }
    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: `Questions are limited to ${MAX_QUESTION_LENGTH} characters. Please shorten it.` },
        { status: 400 }
      );
    }

    const safeHistory: ChatMessage[] = Array.isArray(history)
      ? history
          .filter(
            (m): m is ChatMessage =>
              !!m &&
              typeof m === "object" &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-MAX_HISTORY_MESSAGES)
      : [];

    const systemPrompt = buildSystemPrompt(question);
    const messages: ChatMessage[] = [...safeHistory, { role: "user", content: question }];

    const answer = await askDigitalTwin(systemPrompt, messages);
    return NextResponse.json({ answer });
  } catch (err) {
    if (err instanceof ProviderError) {
      if (err.code === "MISSING_API_KEY") {
        return NextResponse.json(
          { error: "The Digital Twin isn't fully configured yet - the server is missing its AI API key." },
          { status: 500 }
        );
      }
      if (err.code === "PROVIDER_ERROR" && err.status === 429) {
        return NextResponse.json(
          { error: "The AI provider is rate-limiting requests right now. Please try again shortly." },
          { status: 429 }
        );
      }
    }
    console.error("[/api/chat] error:", err);
    return NextResponse.json({ error: "Something went wrong answering that question." }, { status: 500 });
  }
}
