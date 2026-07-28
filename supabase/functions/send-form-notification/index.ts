import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

// Allowed form types (allowlist)
const ALLOWED_FORM_TYPES = ["member", "volunteer", "mentor", "contact", "event-registration"] as const;
type FormType = typeof ALLOWED_FORM_TYPES[number];

// Validation constants
const MAX_STRING_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HTML escape function to prevent XSS
function escapeHtml(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sanitize and validate string field
function sanitizeString(value: unknown, maxLength: number = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return "";
  return escapeHtml(value.trim().slice(0, maxLength));
}

// Validate email format
function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  return EMAIL_REGEX.test(email) && email.length <= 255;
}

// Validate form data based on type
function validateFormData(formType: FormType, data: unknown): { valid: boolean; error?: string; sanitized?: Record<string, string | boolean> } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Data must be an object" };
  }

  const d = data as Record<string, unknown>;
  const sanitized: Record<string, string | boolean> = {};

  switch (formType) {
    case "member": {
      if (!d.firstName || typeof d.firstName !== "string") {
        return { valid: false, error: "First name is required" };
      }
      if (!d.lastName || typeof d.lastName !== "string") {
        return { valid: false, error: "Last name is required" };
      }
      if (!isValidEmail(d.email)) {
        return { valid: false, error: "Valid email is required" };
      }
      if (!d.mobileNo || typeof d.mobileNo !== "string") {
        return { valid: false, error: "Mobile number is required" };
      }
      if (!d.address || typeof d.address !== "string") {
        return { valid: false, error: "Address is required" };
      }

      sanitized.firstName = sanitizeString(d.firstName);
      sanitized.lastName = sanitizeString(d.lastName);
      sanitized.email = sanitizeString(d.email, 255);
      sanitized.mobileNo = sanitizeString(d.mobileNo, 20);
      sanitized.address = sanitizeString(d.address);
      sanitized.gdprConsent = d.gdprConsent === true;
      break;
    }

    case "volunteer": {
      if (!d.firstName || typeof d.firstName !== "string") {
        return { valid: false, error: "First name is required" };
      }
      if (!d.lastName || typeof d.lastName !== "string") {
        return { valid: false, error: "Last name is required" };
      }
      if (!isValidEmail(d.email)) {
        return { valid: false, error: "Valid email is required" };
      }
      if (!d.mobileNo || typeof d.mobileNo !== "string") {
        return { valid: false, error: "Mobile number is required" };
      }

      sanitized.firstName = sanitizeString(d.firstName);
      sanitized.lastName = sanitizeString(d.lastName);
      sanitized.email = sanitizeString(d.email, 255);
      sanitized.mobileNo = sanitizeString(d.mobileNo, 20);
      sanitized.address = sanitizeString(d.address);
      sanitized.message = sanitizeString(d.message, MAX_MESSAGE_LENGTH);
      sanitized.gdprConsent = d.gdprConsent === true;
      break;
    }

    case "mentor": {
      if (!d.firstName || typeof d.firstName !== "string") {
        return { valid: false, error: "First name is required" };
      }
      if (!d.lastName || typeof d.lastName !== "string") {
        return { valid: false, error: "Last name is required" };
      }
      if (!isValidEmail(d.email)) {
        return { valid: false, error: "Valid email is required" };
      }
      if (!d.areaOfHelp || typeof d.areaOfHelp !== "string") {
        return { valid: false, error: "Area of help is required" };
      }

      sanitized.firstName = sanitizeString(d.firstName);
      sanitized.lastName = sanitizeString(d.lastName);
      sanitized.email = sanitizeString(d.email, 255);
      sanitized.mobileNo = sanitizeString(d.mobileNo, 20);
      sanitized.areaOfHelp = sanitizeString(d.areaOfHelp);
      sanitized.message = sanitizeString(d.message, MAX_MESSAGE_LENGTH);
      break;
    }

    case "contact": {
      if (!d.name || typeof d.name !== "string") {
        return { valid: false, error: "Name is required" };
      }
      if (!isValidEmail(d.email)) {
        return { valid: false, error: "Valid email is required" };
      }
      if (!d.message || typeof d.message !== "string") {
        return { valid: false, error: "Message is required" };
      }

      sanitized.name = sanitizeString(d.name);
      sanitized.email = sanitizeString(d.email, 255);
      sanitized.message = sanitizeString(d.message, MAX_MESSAGE_LENGTH);
      sanitized.consent = d.consent === true;
      break;
    }

    case "event-registration": {
      if (!d.firstName || typeof d.firstName !== "string") {
        return { valid: false, error: "First name is required" };
      }
      if (!d.lastName || typeof d.lastName !== "string") {
        return { valid: false, error: "Last name is required" };
      }
      if (!isValidEmail(d.email)) {
        return { valid: false, error: "Valid email is required" };
      }
      if (!d.phone || typeof d.phone !== "string") {
        return { valid: false, error: "Phone number is required" };
      }

      sanitized.firstName = sanitizeString(d.firstName);
      sanitized.lastName = sanitizeString(d.lastName);
      sanitized.email = sanitizeString(d.email, 255);
      sanitized.phone = sanitizeString(d.phone, 20);
      sanitized.nationality = sanitizeString(d.nationality);
      sanitized.foodToBring = sanitizeString(d.foodToBring);
      sanitized.eventTitle = sanitizeString(d.eventTitle);
      sanitized.eventDate = sanitizeString(d.eventDate);
      sanitized.eventLocation = sanitizeString(d.eventLocation);
      break;
    }
  }

  return { valid: true, sanitized };
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check request size (limit to 50KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50000) {
      console.error("Request too large:", contentLength);
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders },
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
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate body is an object
    if (typeof body !== "object" || body === null) {
      return new Response(
        JSON.stringify({ error: "Request body must be an object" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { formType, data } = body as { formType: unknown; data: unknown };

    // Validate formType using allowlist
    if (typeof formType !== "string" || !ALLOWED_FORM_TYPES.includes(formType as FormType)) {
      console.error("Invalid form type:", formType);
      return new Response(
        JSON.stringify({ error: `Invalid form type. Allowed: ${ALLOWED_FORM_TYPES.join(", ")}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate and sanitize form data
    const validation = validateFormData(formType as FormType, data);
    if (!validation.valid) {
      console.error("Validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const sanitizedData = validation.sanitized!;
    let subject = "";
    let htmlContent = "";

    switch (formType as FormType) {
      case "member":
        subject = "New Member Registration";
        htmlContent = `
          <h2>New Member Registration</h2>
          <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Mobile:</strong> ${sanitizedData.mobileNo}</p>
          <p><strong>Address:</strong> ${sanitizedData.address}</p>
          <p><strong>GDPR Consent:</strong> ${sanitizedData.gdprConsent ? "Yes" : "No"}</p>
        `;
        break;

      case "volunteer":
        subject = "New Volunteer Application";
        htmlContent = `
          <h2>New Volunteer Application</h2>
          <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Mobile:</strong> ${sanitizedData.mobileNo}</p>
          <p><strong>Address:</strong> ${sanitizedData.address || "Not provided"}</p>
          <p><strong>Message:</strong> ${sanitizedData.message || "Not provided"}</p>
          <p><strong>GDPR Consent:</strong> ${sanitizedData.gdprConsent ? "Yes" : "No"}</p>
        `;
        break;

      case "mentor":
        subject = "New Mentor Request";
        htmlContent = `
          <h2>New Mentor Request</h2>
          <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Mobile:</strong> ${sanitizedData.mobileNo || "Not provided"}</p>
          <p><strong>Area of Help:</strong> ${sanitizedData.areaOfHelp}</p>
          <p><strong>Message:</strong> ${sanitizedData.message || "Not provided"}</p>
        `;
        break;

      case "contact":
        subject = "New Contact Form Submission";
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Message:</strong> ${sanitizedData.message}</p>
          <p><strong>Consent:</strong> ${sanitizedData.consent ? "Yes" : "No"}</p>
        `;
        break;

      case "event-registration":
        subject = `New Event Registration: ${sanitizedData.eventTitle}`;
        htmlContent = `
          <h2>New Event Registration</h2>
          <p><strong>Event:</strong> ${sanitizedData.eventTitle}</p>
          <p><strong>Date:</strong> ${sanitizedData.eventDate}</p>
          <p><strong>Location:</strong> ${sanitizedData.eventLocation}</p>
          <hr />
          <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
          <p><strong>Nationality:</strong> ${sanitizedData.nationality || "Not provided"}</p>
          <p><strong>Food to Bring:</strong> ${sanitizedData.foodToBring || "Not specified"}</p>
        `;
        break;
    }

    console.log("Sending notification email for form type:", formType);

    // "onboarding@resend.dev" only works for testing and only delivers to the
    // Resend account owner's own email. Once you verify a domain in Resend,
    // set RESEND_FROM_EMAIL and RESEND_TO_EMAIL as Supabase secrets instead.
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") ?? "Pakistanis in Marburg <onboarding@resend.dev>";
    const toEmail = Deno.env.get("RESEND_TO_EMAIL") ?? "pakistanisinmarburg@gmail.com";

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-form-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
