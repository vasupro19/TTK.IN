"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const budgets = [
  "Under ₹10,000 per person",
  "₹10,000 – ₹20,000 per person",
  "₹20,000 – ₹35,000 per person",
  "₹35,000 – ₹60,000 per person",
  "Above ₹60,000 per person",
  "Not sure yet",
];

const destinationChoices = [
  "Shimla & Manali",
  "Shimla, Manali & Dharamshala",
  "Dharamshala & Dalhousie",
  "Kasol, Jibhi & Tirthan",
  "Spiti Valley circuit",
  "Kinnaur & Sangla",
  "Not decided — suggest for me",
];

const field =
  "w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-600/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink-800">
      {children}
      {required && <span className="ml-0.5 text-sunset-500">*</span>}
    </label>
  );
}

const INDIAN_MOBILE = /^(?:\+?91[-\s]?)?[6-9]\d{9}$/;

/**
 * Himachal enquiry form. Posts to /api/leads, which validates again server-side
 * and emails the sales inbox. `variant="panel"` is the compact hero version.
 */
export function HimachalEnquiryForm({
  variant = "full",
  className,
}: {
  variant?: "full" | "panel";
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(data: Record<string, FormDataEntryValue>) {
    const errs: Record<string, string> = {};
    const name = String(data.name ?? "").trim();
    const phone = String(data.phone ?? "").replace(/[\s-]/g, "");
    if (name.length < 2) errs.name = "Please enter your name.";
    if (!INDIAN_MOBILE.test(phone)) errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!String(data.travelDate ?? "")) errs.travelDate = "Please choose an approximate travel date.";
    if (!Number(data.travellers)) errs.travellers = "How many travellers?";
    return errs;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      setError("Please correct the highlighted fields.");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, destination: data.destination || "Himachal Pradesh" }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("We could not reach the server. Please call or WhatsApp us instead.");
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
          Thank you — your enquiry is in.
        </p>
        <p className="mt-1.5 text-sm text-brand-800/75">
          A Himachal travel expert will call you back, usually within a few working hours.
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

  const compact = variant === "panel";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
        <div>
          <Label htmlFor="hp-name" required>Name</Label>
          <input id="hp-name" name="name" required autoComplete="name" placeholder="Your full name"
            aria-invalid={Boolean(fieldErrors.name)}
            className={cn(field, fieldErrors.name && "border-sunset-400")} />
          {fieldErrors.name && <p className="mt-1 text-xs text-sunset-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <Label htmlFor="hp-phone" required>Mobile number</Label>
          <input id="hp-phone" name="phone" required type="tel" inputMode="numeric" autoComplete="tel"
            placeholder="10-digit mobile"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={cn(field, fieldErrors.phone && "border-sunset-400")} />
          {fieldErrors.phone && <p className="mt-1 text-xs text-sunset-600">{fieldErrors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="hp-date" required>Travel date</Label>
          <input id="hp-date" name="travelDate" required type="date"
            aria-invalid={Boolean(fieldErrors.travelDate)}
            className={cn(field, fieldErrors.travelDate && "border-sunset-400")} />
          {fieldErrors.travelDate && <p className="mt-1 text-xs text-sunset-600">{fieldErrors.travelDate}</p>}
        </div>
        <div>
          <Label htmlFor="hp-travellers" required>Travellers</Label>
          <select id="hp-travellers" name="travellers" defaultValue="2" className={field}>
            {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 30].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "traveller" : "travellers"}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="hp-nights">Nights</Label>
          <select id="hp-nights" name="nights" defaultValue="5" className={field}>
            {[2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
              <option key={n} value={n}>{n} nights</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="hp-destination">Preferred destinations</Label>
          <select id="hp-destination" name="destination" defaultValue="" className={field}>
            <option value="">Select a route</option>
            {destinationChoices.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <Label htmlFor="hp-budget">Approximate budget</Label>
            <select id="hp-budget" name="budget" defaultValue="" className={field}>
              <option value="">Select a range</option>
              {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="hp-message">Message</Label>
            <textarea id="hp-message" name="message" rows={3}
              placeholder="Anything we should plan around — elderly parents, an anniversary, a must-see stop."
              className={cn(field, "resize-none")} />
          </div>
        </>
      )}

      {status === "error" && error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-4 py-3 text-sm font-medium text-sunset-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99] disabled:opacity-60">
        {status === "loading"
          ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</>
          : <><Send className="h-4 w-4" aria-hidden="true" />{compact ? "Plan My Trip" : "Get My Free Quote"}</>}
      </button>

      <p className="text-center text-xs text-ink-600/55">
        No payment needed. We use your details only to plan this trip.
      </p>
    </form>
  );
}
