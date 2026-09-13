import { NextResponse } from "next/server";

interface EnquiryPayload {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  context?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as EnquiryPayload;

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  // TODO: wire up to CRM/email once credentials are available.
  console.log("[enquiry]", {
    name: body.name,
    phone: body.phone,
    email: body.email,
    message: body.message,
    context: body.context,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
