"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/seo";

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

export function QuickLeadForm({
  destination = "Himachal Pradesh",
  packageSlug,
  onSubmitted,
}: {
  /** Page context, sent with the lead since the form does not ask. */
  destination?: string;
  packageSlug?: string;
  /** Lets a modal close itself before the redirect. */
  onSubmitted?: () => void;
}) {
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
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }
      onSubmitted?.();
      // A dedicated page, so the conversion is a pageview the team can track.
      router.push("/thank-you");
    } catch {
      setError("We could not reach the server. Please try again, or WhatsApp us.");
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-600/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="ql-name" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Name
        </label>
        <input
          id="ql-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your full name"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="ql-phone" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Mobile number
        </label>
        <input
          id="ql-phone"
          name="phone"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="ql-email" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Email <span className="font-normal text-ink-600/55">(optional)</span>
        </label>
        <input
          id="ql-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
        />
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-ink-800">
          Approximate budget per person
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-sand-200 px-3 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800"
            >
              <input
                type="radio"
                name="budget"
                value={option.value}
                className="h-4 w-4 accent-brand-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-3 py-2 text-sm font-medium text-sunset-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {busy ? "Sending…" : "Get My Free Itinerary"}
      </button>

      <div className="flex items-center justify-center gap-3 text-sm">
        <span className="text-ink-600/55">or</span>
        <a
          href={whatsappLink(`Hi TheTravelKart, I'd like help planning a ${destination} trip.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-[#128C7E] hover:underline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp us on {siteConfig.phoneDisplay}
        </a>
      </div>

      <p className="text-center text-xs text-ink-600/55">
        No payment needed to enquire. We reply within a working day.
      </p>
    </form>
  );
}
