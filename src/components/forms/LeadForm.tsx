"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackLead } from "@/lib/metaPixel";

const budgets = [
  "Under ₹15,000 per person",
  "₹15,000 – ₹25,000 per person",
  "₹25,000 – ₹50,000 per person",
  "₹50,000 – ₹1,00,000 per person",
  "Above ₹1,00,000 per person",
  "Not sure yet",
];

const fieldClass =
  "w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-600/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink-800">
      {children}
      {required && <span className="ml-0.5 text-sunset-500">*</span>}
    </label>
  );
}

/**
 * Primary lead-capture form. Posts to /api/leads, which delegates to
 * `lib/api/leads.createLead` — the single seam for CRM integration.
 */
export function LeadForm({
  packageSlug,
  defaultDestination = "",
  className,
  compact = false,
}: {
  packageSlug?: string;
  defaultDestination?: string;
  className?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, packageSlug }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      trackLead(typeof data.destination === "string" ? data.destination : defaultDestination);
      setStatus("success");
      form.reset();
    } catch {
      setError("We could not reach the server. Please try again, or call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="h-10 w-10 text-brand-600" aria-hidden="true" />
        <p className="mt-3 font-display text-lg font-bold text-brand-900">
          Thank you! Our travel expert will contact you shortly.
        </p>
        <p className="mt-1.5 text-sm text-brand-800/75">
          We usually reply within a few working hours. If it is urgent, WhatsApp us and we will pick
          it up straight away.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand-700 underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        <div>
          <Label htmlFor="lead-name" required>
            Name
          </Label>
          <input id="lead-name" name="name" required autoComplete="name" placeholder="Your full name" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="lead-phone" required>
            Phone
          </Label>
          <input
            id="lead-phone"
            name="phone"
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="lead-email">Email</Label>
          <input id="lead-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="lead-destination" required>
            Destination
          </Label>
          <input
            id="lead-destination"
            name="destination"
            required
            defaultValue={defaultDestination}
            placeholder="Himachal, Kashmir, Ladakh…"
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="lead-date">Travel date</Label>
          <input id="lead-date" name="travelDate" type="date" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="lead-travellers">Number of travellers</Label>
          <select id="lead-travellers" name="travellers" defaultValue="2" className={fieldClass}>
            {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "traveller" : "travellers"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="lead-budget">Approximate budget</Label>
        <select id="lead-budget" name="budget" defaultValue="" className={fieldClass}>
          <option value="">Select a range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="lead-message">Message</Label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Anything we should plan around — anniversaries, elderly parents, dietary needs, a must-see stop."
          className={cn(fieldClass, "resize-none")}
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-4 py-3 text-sm font-medium text-sunset-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99] disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Plan My Trip
          </>
        )}
      </button>

      <p className="text-center text-xs text-ink-600/55">
        We use your details only to plan this trip. No spam, no selling your number.
      </p>
    </form>
  );
}
