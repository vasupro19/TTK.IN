import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Name, phone and message are required." }, { status: 400 });
  }

  // TODO: wire up to CRM/email once credentials are available.
  console.log("[contact]", { ...body, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
