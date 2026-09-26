const RESEND_URL = "https://api.resend.com/emails";

export class EmailError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

/**
 * Sends a contact-form message via Resend. Requires RESEND_API_KEY and
 * CONTACT_TO_EMAIL to be set in the environment. Uses Resend's shared
 * onboarding@resend.dev sender, which works without verifying a custom
 * domain - good enough for a personal portfolio's contact form.
 *
 * If these env vars are not set, the caller (the /api/contact route) reports
 * that email sending isn't configured, and the frontend falls back to a
 * mailto: link instead of silently pretending to have sent anything.
 */
export async function sendContactEmail(params: { name: string; fromEmail: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    throw new EmailError("Email sending isn't configured on the server yet.", "NOT_CONFIGURED");
  }

  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [to],
      reply_to: params.fromEmail,
      subject: `Portfolio contact from ${params.name}`,
      text: `${params.message}\n\n— ${params.name} (${params.fromEmail})`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[emailProvider] Resend error:", detail);
    throw new EmailError("The email provider rejected the request.", "PROVIDER_ERROR");
  }
}
