import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prismaDB";
import { validateEmail } from "../../../utils/validateEmail";
import { sendEmail } from "../../../utils/email";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_PHONE_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 5000;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getAllowedOrigins = () =>
  (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const getCorsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin ?? "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

const isOriginAllowed = (origin: string | null, allowedOrigins: string[]) => {
  if (!origin || allowedOrigins.length === 0) {
    return true;
  }

  return allowedOrigins.includes(origin);
};

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = getAllowedOrigins();

  if (!isOriginAllowed(origin, allowedOrigins)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = getAllowedOrigins();

  if (!isOriginAllowed(origin, allowedOrigins)) {
    return NextResponse.json(
      { error: "Origin not allowed." },
      { status: 403 },
    );
  }

  let body: {
    fullName?: string;
    email?: string;
    phone?: string | null;
    message?: string;
  };

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400, headers: getCorsHeaders(origin) },
    );
  }

  const fullName = body.fullName?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const message = body.message?.trim() || "";

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400, headers: getCorsHeaders(origin) },
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400, headers: getCorsHeaders(origin) },
    );
  }

  if (
    fullName.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    phone.length > MAX_PHONE_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { error: "Field length exceeded." },
      { status: 400, headers: getCorsHeaders(origin) },
    );
  }

  try {
    await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone.length ? phone : null,
        message,
      },
    });

    const targetEmail = process.env.CONTACT_TO || "support@signalizeai.org";
    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await sendEmail({
      to: targetEmail,
      subject: `New SignalizeAI contact from ${safeName}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Unable to submit your message." },
      { status: 500, headers: getCorsHeaders(origin) },
    );
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: getCorsHeaders(origin) },
  );
}
