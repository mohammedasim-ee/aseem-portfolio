"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

type SendState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<SendState>("idle");
  const [copied, setCopied] = useState(false);

  const contactEmail = profile.contact.email; // null until you set a real one in profile.ts

  function validate(): string | null {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!name.trim()) return "Please enter your name.";
    if (!emailOk) return "Please enter a valid email address.";
    if (!message.trim()) return "Please enter a message.";
    return null;
  }

  function openMailto() {
    if (!contactEmail) return;
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  async function send() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      if (res.ok) {
        setState("sent");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      const data = await res.json().catch(() => ({ error: "" }));

      if (res.status === 503 && data.error === "NOT_CONFIGURED") {
        // Real email sending isn't set up on the server yet - fall back to
        // the mailto: link so the message still reaches someone, rather than
        // just failing silently.
        if (contactEmail) {
          openMailto();
          setState("idle");
        } else {
          setState("error");
          setError("Email sending isn't configured yet, and no fallback address is set either.");
        }
        return;
      }

      setState("error");
      setError(data.error || "Something went wrong sending that message.");
    } catch {
      // Network failure (offline, server unreachable) - fall back to mailto
      // if we have an address, rather than leaving the person stuck.
      if (contactEmail) {
        openMailto();
        setState("idle");
      } else {
        setState("error");
        setError("Couldn't reach the server, and no fallback email is configured.");
      }
    }
  }

  async function copyEmail() {
    if (!contactEmail) return;
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError(`Could not copy automatically — the address is ${contactEmail}`);
    }
  }

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center gap-2 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Resume &amp; Contact
        </div>
        <h2 className="font-serif text-2xl text-white sm:text-3xl">Get in touch</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 font-semibold text-white">Message Aseem</h3>
            <p className="mb-3 text-xs text-slate-500">
              This sends a real email through the server when configured (see{" "}
              <code className="rounded bg-white/10 px-1">RESEND_API_KEY</code> in{" "}
              <code className="rounded bg-white/10 px-1">.env.local</code>) — otherwise it falls
              back to opening your email app with the message pre-filled.
            </p>

            {state === "sent" ? (
              <p className="rounded-lg border border-teal-400/30 bg-teal-400/10 p-3 text-sm text-teal-200">
                Message sent — thanks for reaching out.
              </p>
            ) : (
              <div className="space-y-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={state === "sending"}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:outline-none disabled:opacity-50"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  type="email"
                  disabled={state === "sending"}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:outline-none disabled:opacity-50"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  rows={3}
                  disabled={state === "sending"}
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 focus:border-teal-400 focus:outline-none disabled:opacity-50"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={send}
                    disabled={state === "sending"}
                    className="rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-40"
                  >
                    {state === "sending" ? "Sending..." : "Send message"}
                  </button>
                  <button
                    onClick={copyEmail}
                    disabled={!contactEmail}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-40"
                  >
                    {copied ? "Copied!" : "Copy email address"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 font-semibold text-white">Resume</h3>
            {profile.resume.available ? (
              <a href="/resume.pdf" target="_blank" className="text-sm text-amber-300 hover:underline">
                Download resume
              </a>
            ) : (
              <p className="mb-4 text-sm text-slate-400">
                No resume uploaded yet — add one at <code className="rounded bg-white/10 px-1">public/resume.pdf</code>{" "}
                and set <code className="rounded bg-white/10 px-1">resume.available</code> to true in{" "}
                <code className="rounded bg-white/10 px-1">src/data/profile.ts</code>.
              </p>
            )}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-amber-300 hover:underline"
            >
              GitHub: {profile.github.replace("https://", "")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
