import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };

  if (!body.email || !EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  // TODO: wire up to a mailing list provider once credentials are available.
  console.log("[newsletter]", { email: body.email, receivedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
