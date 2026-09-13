import { NextResponse } from "next/server";
import { createCabQuoteRequest, createCabPartnerApplication } from "@/lib/api/leads";
import type { CabType } from "@/lib/types";

/** Handles both traveller quote requests and cab-partner registrations. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (key: string) => (body[key] === undefined ? "" : String(body[key]));

  if (body.kind === "partner") {
    const result = await createCabPartnerApplication({
      ownerName: str("ownerName"),
      phone: str("phone"),
      email: str("email") || undefined,
      baseCity: str("baseCity"),
      fleetSize: Number(body.fleetSize ?? 1),
      vehicleTypes: (Array.isArray(body.vehicleTypes) ? body.vehicleTypes : [body.vehicleTypes])
        .filter(Boolean)
        .map(String) as CabType[],
    });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true, id: result.data?.id });
  }

  const result = await createCabQuoteRequest({
    name: str("name"),
    phone: str("phone"),
    pickup: str("pickup"),
    drop: str("drop"),
    travelDate: str("travelDate"),
    passengers: Number(body.passengers ?? 2),
    cabType: str("cabType") ? (str("cabType") as CabType) : undefined,
    notes: str("notes") || undefined,
  });

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, id: result.data?.id });
}
