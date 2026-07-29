import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// TODO: replace the vercel.app placeholder with your real Vercel deployment
// domain (and/or custom domain) once you know it.
const ALLOWED_ORIGINS = [
  "https://pakistanisinmarburg.com",
  "https://www.pakistanisinmarburg.com",
  "https://pakistanisinmarburg.vercel.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || "") ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin!,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old rate limit entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Validation constants
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_CONTENT_LENGTH = 32000;
const ALLOWED_ROLES = ["user", "assistant"];

// Validation function for messages
function validateMessages(messages: unknown): { valid: boolean; error?: string; sanitized?: Array<{ role: string; content: string }> } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages. Maximum allowed: ${MAX_MESSAGES}` };
  }

  let totalContentLength = 0;
  const sanitizedMessages: Array<{ role: string; content: string }> = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (typeof msg !== "object" || msg === null) {
      return { valid: false, error: `Message at index ${i} must be an object` };
    }

    if (typeof msg.role !== "string" || !ALLOWED_ROLES.includes(msg.role)) {
      return { valid: false, error: `Invalid role at index ${i}. Allowed: ${ALLOWED_ROLES.join(", ")}` };
    }

    if (typeof msg.content !== "string") {
      return { valid: false, error: `Content at index ${i} must be a string` };
    }

    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` };
    }

    totalContentLength += msg.content.length;

    if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
      return { valid: false, error: `Total content exceeds maximum of ${MAX_TOTAL_CONTENT_LENGTH} characters` };
    }

    sanitizedMessages.push({
      role: msg.role,
      content: msg.content.trim(),
    });
  }

  return { valid: true, sanitized: sanitizedMessages };
}

const SYSTEM_PROMPT = `You are a helpful assistant for the Pakistani Community Marburg. You help answer questions about:
- Housing and accommodation in Marburg
- Registration at Rathaus (Anmeldung)
- Health insurance options
- Banking services
- University of Marburg resources
- Student services and orientation
- Community events and gatherings
- Cultural celebrations (National Day, Eid, etc.)
- Language courses and integration
- Local laws and regulations
- Volunteer opportunities
- Contact information for community leaders

Address: Bahnhofstrasse 36, 35037 Marburg
Phone: +49 152 16164830
Email: Pakistanisinmarburg@gmail.com

Be friendly, helpful, and provide accurate information. If you don't know something, suggest contacting the community directly.`;

/**
 * Converts the Gemini streamGenerateContent SSE stream into the
 * OpenAI-style "data: {choices:[{delta:{content}}]}" SSE format the
 * frontend (src/components/Chatbot.tsx) already knows how to parse.
 * This keeps the frontend untouched regardless of which AI backend we use.
 */
function geminiStreamToOpenAIStream(geminiBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const reader = geminiBody.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            const rest = buffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (!line.startsWith("data: ")) {
              buffer = rest;
              continue;
            }

            const jsonStr = line.slice(6).trim();
            if (!jsonStr) {
              buffer = rest;
              continue;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              buffer = rest;
              const text = parsed?.candidates?.[0]?.content?.parts
                ?.map((p: { text?: string }) => p.text ?? "")
                .join("") ?? "";
              if (text) {
                const chunk = { choices: [{ delta: { content: text } }] };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
              }
            } catch {
              // Incomplete JSON split across reads - wait for more data.
              break;
            }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(rateLimit.retryAfter || 60)
          },
        }
      );
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 100000) {
      console.error("Request too large:", contentLength);
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (typeof body !== "object" || body === null) {
      return new Response(
        JSON.stringify({ error: "Request body must be an object" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = body as { messages: unknown };

    const validation = validateMessages(messages);
    if (!validation.valid) {
      console.error("Validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Calls Google's Gemini API directly. Create a key at
    // https://aistudio.google.com/apikey and set it as a Supabase secret:
    //   supabase secrets set GEMINI_API_KEY=your-key-here
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.5-flash";

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    console.log("Processing chat request with", validation.sanitized!.length, "messages");

    // Gemini uses "user"/"model" roles (not "assistant") and a separate
    // systemInstruction field instead of a system message in the array.
    const geminiContents = validation.sanitized!.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { role: "system", parts: [{ text: SYSTEM_PROMPT }] },
        contents: geminiContents,
        generationConfig: { temperature: 0.7 },
      }),
    });

    if (!response.ok || !response.body) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text().catch(() => "");
      console.error("Gemini API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openAiStyleStream = geminiStreamToOpenAIStream(response.body);

    return new Response(openAiStyleStream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: "An internal error occurred. Please try again later." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
