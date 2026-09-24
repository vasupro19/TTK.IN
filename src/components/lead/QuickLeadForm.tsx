"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/seo";
import { trackLead } from "@/lib/metaPixel";

/**
 * The only enquiry form the landing page uses.
 *
 * Deliberately short: a name, a number, an optional email, and one required
 * choice. That last question is the point — it costs the traveller two seconds
 * and tells the sales team whether a lead is worth calling, which a longer form
 * would buy at the cost of far fewer people finishing it.
 */

/** The qualifying question. One required choice, four coarse bands. */
const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under ₹10,000" },
  { value: "10k-20k", label: "₹10,000 – ₹20,000" },
  { value: "20k-35k", label: "₹20,000 – ₹35,000" },
  { value: "above-35k", label: "Above ₹35,000" },
] as const;

const INDIAN_MOBILE = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/;

/**
 * Opt-in trip questions for pages where the route itself decides the quote
 * (Spiti: which side you enter from matters more than the budget band). Left
 * out, the form is the original four questions.
 */
export interface TripFields {
  startingCities: string[];
  routes: string[];
}

export interface QuickLeadFormOptions {
  /** Ask for email. On by default. */
  showEmail?: boolean;
  tripFields?: TripFields;
  submitLabel?: string;
}

const TRAVELLER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export function QuickLeadForm({
  destination = "Himachal Pradesh",
  packageSlug,
  onSubmitted,
  idPrefix = "ql",
  options = {},
}: {
  /** Page context, sent with the lead since the form does not ask. */
  destination?: string;
  packageSlug?: string;
  /** Lets a modal close itself before the redirect. */
  onSubmitted?: () => void;
  /** Keeps field ids unique when the dialog and an in-page form coexist. */
  idPrefix?: string;
  options?: QuickLeadFormOptions;
}) {
  const { showEmail = true, tripFields, submitLabel = "Get My Free Itinerary" } = options;
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/[\s-]/g, "");
    const email = String(data.get("email") ?? "").trim();
    const budget = String(data.get("budget") ?? "");

    if (name.length < 2) return setError("Please enter your name.");
    if (!INDIAN_MOBILE.test(phone))
      return setError("Please enter a valid 10-digit mobile number.");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address, or leave it blank.");
    if (!budget) return setError("Please pick a budget range so we can plan properly.");

    // The leads API has no columns for starting city or route, so they travel
    // in the message, one labelled line each, above whatever the traveller wrote.
    const trip = tripFields
      ? {
          travelDate: String(data.get("travelDate") ?? "") || undefined,
          travellers: Number(data.get("travellers") ?? 2),
          message:
            [
              data.get("startingCity") && `Starting from: ${data.get("startingCity")}`,
              data.get("route") && `Preferred route: ${data.get("route")}`,
              String(data.get("message") ?? "").trim(),
            ]
              .filter(Boolean)
              .join("\n") || undefined,
        }
      : {};

    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          budget: BUDGET_OPTIONS.find((o) => o.value === budget)?.label ?? budget,
          destination,
          packageSlug,
          ...trip,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      trackLead(destination);
      onSubmitted?.();
      // A dedicated page, so the conversion is a pageview the team can track.
      router.push("/thank-you");
    } catch {
      setError("We could not reach the server. Please try again, or WhatsApp us.");
      setBusy(false);
    }
  }

  // min-h-12 keeps every control above the 44px minimum touch target, and
  // text-base stops iOS Safari zooming the page when a field is focused.
  const field =
    "w-full min-h-12 rounded-xl border border-sand-200 bg-white px-4 py-3 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-600/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor={`${idPrefix}-name`} className="mb-1.5 block text-sm font-semibold text-ink-800">
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          required
          autoComplete="name"
          placeholder="Your full name"
          className={field}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-phone`} className="mb-1.5 block text-sm font-semibold text-ink-800">
          {tripFields ? "Phone / WhatsApp" : "Mobile number"}
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          className={field}
        />
      </div>

      {showEmail && (
        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1.5 block text-sm font-semibold text-ink-800">
            Email <span className="font-normal text-ink-600/55">(optional)</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
      )}

      {tripFields && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${idPrefix}-date`} className="mb-1.5 block text-sm font-semibold text-ink-800">
                Travel date
              </label>
              <input id={`${idPrefix}-date`} name="travelDate" type="date" className={field} />
            </div>
            <div>
              <label htmlFor={`${idPrefix}-travellers`} className="mb-1.5 block text-sm font-semibold text-ink-800">
                Travellers
              </label>
              <select id={`${idPrefix}-travellers`} name="travellers" defaultValue="2" className={field}>
                {TRAVELLER_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n === "12" ? "12 or more" : n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-start`} className="mb-1.5 block text-sm font-semibold text-ink-800">
              Starting city
            </label>
            <select id={`${idPrefix}-start`} name="startingCity" defaultValue="" className={field}>
              <option value="">Choose one</option>
              {tripFields.startingCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-semibold text-ink-800">Preferred route</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tripFields.routes.map((route) => (
                <label
                  key={route}
                  className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-sand-200 px-3 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800"
                >
                  <input type="radio" name="route" value={route} className="h-5 w-5 shrink-0 accent-brand-600" />
                  {route}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-ink-800">
          Approximate budget per person
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-sand-200 px-3 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800"
            >
              <input
                type="radio"
                name="budget"
                value={option.value}
                className="h-5 w-5 shrink-0 accent-brand-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {tripFields && (
        <div>
          <label htmlFor={`${idPrefix}-message`} className="mb-1.5 block text-sm font-semibold text-ink-800">
            Anything we should know? <span className="font-normal text-ink-600/55">(optional)</span>
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={3}
            placeholder="Places you want to include, pace, who is travelling…"
            className={field + " resize-y"}
          />
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-3 py-2 text-sm font-medium text-sunset-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {busy ? "Sending…" : submitLabel}
      </button>

      <div className="flex items-center justify-center gap-3 text-sm">
        <span className="text-ink-600/55">or</span>
        <a
          href={whatsappLink(`Hi TheTravelKart, I'd like help planning a ${destination} trip.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#128C7E] hover:underline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp us on {siteConfig.whatsappDisplay}
        </a>
      </div>

      <p className="text-center text-xs text-ink-600/55">
        No payment needed to enquire. We reply within a working day.
      </p>
    </form>
  );
}
