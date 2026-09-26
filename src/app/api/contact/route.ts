import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, EmailError } from "@/lib/emailProvider";
import { isRateLimited } from "@/lib/rateLimit";

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "That request wasn't valid JSON." }, { status: 400 });
    }

    const { name, email, message } = (body || {}) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Messages are limited to ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    await sendContactEmail({ name: name.trim(), fromEmail: email.trim(), message: message.trim() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof EmailError) {
      if (err.code === "NOT_CONFIGURED") {
        // Not a 500 - this is an expected, recoverable state the frontend
        // handles by falling back to a mailto: link.
        return NextResponse.json({ error: "NOT_CONFIGURED" }, { status: 503 });
      }
      return NextResponse.json(
        { error: "The email couldn't be sent right now. Please try again shortly." },
        { status: 502 }
      );
    }
    console.error("[/api/contact] error:", err);
    return NextResponse.json({ error: "Something went wrong sending that message." }, { status: 500 });
  }
}
