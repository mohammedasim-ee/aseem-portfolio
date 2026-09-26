"use client";

import { useState } from "react";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable - fail silently, not fatal.
    }
  }

  return (
    <div className="relative mt-2 overflow-hidden rounded-lg border border-white/10 bg-black/40">
      <button
        onClick={copy}
        className="absolute right-2 top-2 rounded bg-white/10 px-2 py-1 text-xs text-slate-200 hover:bg-white/20"
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-3 text-sm text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} className="rounded bg-white/10 px-1 py-0.5 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

export function ChatMarkdown({ text }: { text: string }) {
  const blocks = text.split(/```/g);
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const isCode = blockIndex % 2 === 1;
    if (isCode) {
      const firstBreak = block.indexOf("\n");
      const code = firstBreak === -1 ? block : block.slice(firstBreak + 1);
      nodes.push(<CodeBlock key={`code-${blockIndex}`} code={code.replace(/\n$/, "")} />);
      return;
    }

    const paragraphs = block.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    paragraphs.forEach((para, pIndex) => {
      const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
      const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l));

      if (isList) {
        nodes.push(
          <ul key={`ul-${blockIndex}-${pIndex}`} className="ml-4 list-disc space-y-1">
            {lines.map((l, li) => (
              <li key={li}>{renderInline(l.replace(/^[-*]\s+/, ""), `li-${blockIndex}-${pIndex}-${li}`)}</li>
            ))}
          </ul>
        );
      } else {
        nodes.push(
          <p key={`p-${blockIndex}-${pIndex}`} className="leading-relaxed">
            {renderInline(lines.join(" "), `p-${blockIndex}-${pIndex}`)}
          </p>
        );
      }
    });
  });

  return <div className="space-y-2">{nodes}</div>;
}
