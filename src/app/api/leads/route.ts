import { NextResponse } from "next/server";
import { createLead, type LeadInput } from "@/lib/api/leads";

/**
 * Thin transport wrapper — all validation and persistence lives in
 * `lib/api/leads` so the same logic can be reused by a server action, a
 * webhook, or a future admin dashboard.
 */
// Nodemailer needs the Node.js runtime (it opens a TCP/TLS socket), so pin it
// explicitly rather than relying on the default.
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Partial<LeadInput> & { travellers?: string | number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await createLead({
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: body.email ? String(body.email) : undefined,
    destination: String(body.destination ?? ""),
    travelDate: body.travelDate ? String(body.travelDate) : undefined,
    travellers: Number(body.travellers ?? 2),
    budget: body.budget ? String(body.budget) : undefined,
    message: body.message ? String(body.message) : undefined,
    packageSlug: body.packageSlug ? String(body.packageSlug) : undefined,
    source: "website",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, id: result.data?.id });
}
