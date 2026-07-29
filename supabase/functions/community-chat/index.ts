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
  // Check if messages is an array
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  // Check array length
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

    // Check if message is an object
    if (typeof msg !== "object" || msg === null) {
      return { valid: false, error: `Message at index ${i} must be an object` };
    }

    // Check role
    if (typeof msg.role !== "string" || !ALLOWED_ROLES.includes(msg.role)) {
      return { valid: false, error: `Invalid role at index ${i}. Allowed: ${ALLOWED_ROLES.join(", ")}` };
    }

    // Check content
    if (typeof msg.content !== "string") {
      return { valid: false, error: `Content at index ${i} must be a string` };
    }

    // Check individual message length
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` };
    }

    totalContentLength += msg.content.length;

    // Check total content length
    if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
      return { valid: false, error: `Total content exceeds maximum of ${MAX_TOTAL_CONTENT_LENGTH} characters` };
    }

    // Sanitize: only include role and content, strip any other properties
    sanitizedMessages.push({
      role: msg.role,
      content: msg.content.trim(),
    });
  }

  return { valid: true, sanitized: sanitizedMessages };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    // Check rate limit
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

    // Check request size (limit to 100KB)
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

    // Validate body is an object
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

    // Validate messages
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

    // Using OpenRouter as a drop-in OpenAI-compatible chat completions gateway.
    // Create a free API key at https://openrouter.ai/keys and set it as the
    // OPENROUTER_API_KEY secret on your Supabase project:
    //   supabase secrets set OPENROUTER_API_KEY=sk-or-...
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful assistant for the Pakistani Community Marburg. You help answer questions about:
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

    console.log("Processing chat request with", validation.sanitized!.length, "messages");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Optional but recommended by OpenRouter for attribution/analytics.
        "HTTP-Referer": Deno.env.get("SITE_URL") ?? "https://pakistanisinmarburg.com",
        "X-Title": "Pakistani Community Marburg",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...validation.sanitized!,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your OpenRouter account." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
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
