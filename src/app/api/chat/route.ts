import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Tu es un expert Bare Metal Server (BMS) chez Orange Business Cloud Avenue. Tu aides les employés à comprendre l'infrastructure BMS, les procédures, le provisioning, le monitoring, la maintenance, le réseau, le stockage, et toutes les questions techniques liées aux serveurs physiques dédiés. Sois pédagogue, précis et concret. Réponds en français.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OpenRouter API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
