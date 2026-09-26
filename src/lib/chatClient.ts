export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export async function askDigitalTwin(question: string, history: ChatTurn[]): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });

  let data: { answer?: string; error?: string };
  try {
    data = await res.json();
  } catch {
    throw new Error("The server sent back something unexpected. Please try again.");
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data.answer || "";
}
