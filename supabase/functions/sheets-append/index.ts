import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SignJWT, importPKCS8 } from "npm:jose@5";

// TODO: replace the vercel.app placeholder with your real Vercel deployment
// domain (and/or custom domain) once you know it.
const ALLOWED_ORIGINS = [
  "https://pakistanisinmarburg.com",
  "https://www.pakistanisinmarburg.com",
  "https://YOUR-VERCEL-PROJECT.vercel.app",
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

// Falls back to the original sheet the project was already writing to, but
// can be overridden per-deployment via the GOOGLE_SHEETS_SPREADSHEET_ID secret.
const SPREADSHEET_ID = Deno.env.get("GOOGLE_SHEETS_SPREADSHEET_ID") ?? "17VDaeDnxf-eN8aekeatOuLwBir_KzTR0S33JExHNR2g";
const SHEET_RANGE = "Sheet1!A:Z";

const MAX_BODY_BYTES = 20_000;

/**
 * Exchanges a Google service-account key for a short-lived OAuth access
 * token using the JWT bearer flow (no Lovable connector needed).
 *
 * Setup:
 *   1. Google Cloud Console -> create a project -> enable "Google Sheets API".
 *   2. IAM & Admin -> Service Accounts -> create one -> create a JSON key.
 *   3. Share your target Google Sheet with the service account's email
 *      (client_email field in the JSON) as an Editor.
 *   4. Set these as Supabase secrets:
 *        supabase secrets set GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@xxx.iam.gserviceaccount.com
 *        supabase secrets set GOOGLE_PRIVATE_KEY="$(cat key.json | jq -r .private_key)"
 *        supabase secrets set GOOGLE_SHEETS_SPREADSHEET_ID=your-sheet-id
 */
async function getGoogleAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const normalizedKey = privateKeyPem.includes("\\n") ? privateKeyPem.replace(/\\n/g, "\n") : privateKeyPem;
  const privateKey = await importPKCS8(normalizedKey, "RS256");
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({ scope: "https://www.googleapis.com/auth/spreadsheets" })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResp.ok) {
    const errText = await tokenResp.text();
    throw new Error(`Failed to obtain Google access token: ${tokenResp.status} ${errText}`);
  }

  const tokenJson = await tokenResp.json();
  return tokenJson.access_token as string;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const str = (v: unknown) => (v === undefined || v === null ? "" : String(v));

    // Append a single row in a fixed column order so the sheet stays tidy.
    const row = [
      new Date().toISOString(),
      str(body.eventId),
      str(body.eventTitle),
      str(body.eventDate),
      str(body.eventLocation),
      str(body.fullName),
      str(body.email),
      str(body.phone),
      str(body.numberOfGuests),
      str(body.dietaryRestrictions),
      str(body.photoConsent),
    ];

    const clientEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY");
    if (!clientEmail || !privateKey) {
      console.error("Missing Google service account credentials", {
        hasClientEmail: !!clientEmail,
        hasPrivateKey: !!privateKey,
      });
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    const text = await resp.text();
    if (!resp.ok) {
      console.error(`Sheets append failed status=${resp.status} body=${text.slice(0, 500)}`);
      return new Response(JSON.stringify({ error: "Sheets append failed", status: resp.status }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Sheets append ok for event=${str(body.eventId)} email=${str(body.email)}`);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sheets-append error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
