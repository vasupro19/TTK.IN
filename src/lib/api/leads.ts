import type {
  CabPartnerApplication,
  CabQuoteRequest,
  Lead,
  LeadSource,
  ServiceResult,
} from "@/lib/types";
import { sendLeadNotification } from "@/lib/api/mailer";

/**
 * Lead capture service.
 *
 * Every enquiry form on the site funnels through `createLead`. Right now it
 * validates, stamps an id and logs — the single place to swap in Prisma, a CRM
 * webhook or the WhatsApp Business API. The route handlers in `app/api` are
 * thin wrappers over these functions, so the contract stays stable.
 */

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelDate?: string;
  travellers?: number;
  nights?: number;
  budget?: string;
  message?: string;
  packageSlug?: string;
  source?: LeadSource;
}

const INDIAN_MOBILE = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/;

export function validateLead(input: Partial<LeadInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your name.";
  const phone = (input.phone ?? "").replace(/[\s-]/g, "");
  if (!INDIAN_MOBILE.test(phone)) return "Please enter a valid 10-digit mobile number.";
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    return "Please enter a valid email address.";
  if (!input.destination || input.destination.trim().length < 2)
    return "Please tell us where you want to go.";
  return null;
}

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function createLead(input: LeadInput): Promise<ServiceResult<Lead>> {
  const error = validateLead(input);
  if (error) return { ok: false, error };

  const lead: Lead = {
    id: newId("lead"),
    name: input.name.trim(),
    phone: input.phone.replace(/[\s-]/g, ""),
    email: input.email?.trim() || undefined,
    destination: input.destination.trim(),
    travelDate: input.travelDate || undefined,
    travellers: input.travellers ?? 2,
    nights: input.nights && input.nights > 0 ? input.nights : undefined,
    budget: input.budget || undefined,
    message: input.message?.trim() || undefined,
    packageSlug: input.packageSlug,
    status: "new",
    source: input.source ?? "website",
    createdAt: new Date().toISOString(),
  };

  // TODO(crm): persist via Prisma and forward to the CRM / WhatsApp Business API.
  console.info("[lead]", { id: lead.id, destination: lead.destination, source: lead.source });

  // Notify the sales inbox. A mail failure is logged but never fails the
  // submission — the traveller has done nothing wrong and we still hold the
  // lead in the server log.
  const mail = await sendLeadNotification(lead);
  if (!mail.sent && !mail.skipped) {
    console.error("[lead] notification email failed for", lead.id, "-", mail.error);
  }

  return { ok: true, data: lead };
}

export async function createCabQuoteRequest(input: {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  travelDate: string;
  passengers: number;
  cabType?: CabQuoteRequest["cabType"];
  notes?: string;
}): Promise<ServiceResult<CabQuoteRequest>> {
  if (!input.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!INDIAN_MOBILE.test((input.phone ?? "").replace(/[\s-]/g, "")))
    return { ok: false, error: "Please enter a valid 10-digit mobile number." };
  if (!input.pickup?.trim() || !input.drop?.trim())
    return { ok: false, error: "Please enter both pickup and drop locations." };

  const request: CabQuoteRequest = {
    id: newId("cabq"),
    name: input.name.trim(),
    phone: input.phone.replace(/[\s-]/g, ""),
    pickup: input.pickup.trim(),
    drop: input.drop.trim(),
    travelDate: input.travelDate,
    passengers: input.passengers,
    cabType: input.cabType,
    notes: input.notes?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  // TODO(cabs): fan out to verified partners in the pickup city for quotes.
  console.info("[cab-quote]", { id: request.id, route: `${request.pickup} → ${request.drop}` });

  return { ok: true, data: request };
}

export async function createCabPartnerApplication(input: {
  ownerName: string;
  phone: string;
  email?: string;
  baseCity: string;
  fleetSize: number;
  vehicleTypes: CabPartnerApplication["vehicleTypes"];
}): Promise<ServiceResult<CabPartnerApplication>> {
  if (!input.ownerName?.trim()) return { ok: false, error: "Please enter your name." };
  if (!INDIAN_MOBILE.test((input.phone ?? "").replace(/[\s-]/g, "")))
    return { ok: false, error: "Please enter a valid 10-digit mobile number." };
  if (!input.baseCity?.trim()) return { ok: false, error: "Please enter your base city." };

  const application: CabPartnerApplication = {
    id: newId("cabp"),
    ownerName: input.ownerName.trim(),
    phone: input.phone.replace(/[\s-]/g, ""),
    email: input.email?.trim() || undefined,
    baseCity: input.baseCity.trim(),
    fleetSize: input.fleetSize,
    vehicleTypes: input.vehicleTypes,
    createdAt: new Date().toISOString(),
  };

  // TODO(partners): queue for document verification before activation.
  console.info("[cab-partner]", { id: application.id, city: application.baseCity });

  return { ok: true, data: application };
}
