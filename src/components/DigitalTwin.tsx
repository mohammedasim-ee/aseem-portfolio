"use client";

import { useEffect, useRef, useState } from "react";
import { askDigitalTwin, type ChatTurn } from "@/lib/chatClient";
import { ChatMarkdown } from "./ChatMarkdown";

type Msg = ChatTurn | { role: "error"; content: string };

const SUGGESTED = [
  "Who is Aseem?",
  "What are his verified projects?",
  "What is Aseem's OOP practice repo about?",
  "Explain what a REST API is.",
  "What does Aseem want to specialize in?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Aseem's AI Digital Twin. Ask about him or his verified GitHub projects and I'll answer from a checked knowledge base — or ask a general tech/AI question and I'll answer like a normal assistant. I'll say plainly if something about Aseem isn't something I actually know.",
};

export default function DigitalTwin() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const history = messages.filter((m): m is ChatTurn => m.role === "user" || m.role === "assistant");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askDigitalTwin(trimmed, history);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: err instanceof Error ? err.message : "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="twin" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> AI Digital Twin
          </div>
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Ask me anything about Aseem</h2>
          <p className="mt-2 max-w-xl text-slate-400">
            Personal and project questions are answered strictly from a verified knowledge base.
            Technical and general questions are answered normally, like any AI assistant.
          </p>
        </div>

        <div className="flex h-[560px] max-h-[75vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <div className="font-serif text-white">Aseem&apos;s AI Digital Twin</div>
              <div className="flex items-center gap-1.5 text-xs text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Online
              </div>
            </div>
            <button
              onClick={() => setMessages([WELCOME])}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-400 hover:text-amber-300"
            >
              Clear chat
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm " +
                  (m.role === "user"
                    ? "ml-auto rounded-br-sm border border-amber-400/30 bg-amber-400/10 text-slate-100"
                    : m.role === "error"
                    ? "rounded-bl-sm border border-red-400/40 bg-red-400/10 text-red-300"
                    : "rounded-bl-sm border border-white/10 bg-white/5 text-slate-100")
                }
              >
                {m.role === "assistant" ? <ChatMarkdown text={m.content} /> : m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[60%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:0.4s]" />
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:border-teal-400 hover:text-white disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-white/10 p-4"
          >
            <label htmlFor="twin-input" className="sr-only">
              Ask the Digital Twin a question
            </label>
            <textarea
              id="twin-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              disabled={loading}
              placeholder="Type your question..."
              className="max-h-28 flex-1 resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-teal-400 px-4 font-semibold text-slate-900 disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
