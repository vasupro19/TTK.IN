"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cabOptions } from "@/lib/data/cabs";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-600/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-ink-800">
      {children}
      {required && <span className="ml-0.5 text-sunset-500">*</span>}
    </label>
  );
}

function useCabSubmit(kind: "quote" | "partner") {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(formData.entries());
    if (kind === "partner") data.vehicleTypes = formData.getAll("vehicleTypes");
    data.kind = kind;

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/cabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      setError("We could not reach the server. Please try again or call us.");
      setStatus("error");
    }
  }

  return { status, error, submit, reset: () => setStatus("idle") };
}

function SuccessCard({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <div role="status" className="rounded-2xl border border-brand-200 bg-brand-50 p-7 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" aria-hidden="true" />
      <p className="mt-3 font-display text-lg font-bold text-brand-900">{title}</p>
      <p className="mt-1.5 text-sm text-brand-800/75">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-semibold text-brand-700 underline underline-offset-4"
      >
        Submit another
      </button>
    </div>
  );
}

function SubmitButton({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99] disabled:opacity-60"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function CabQuoteForm() {
  const { status, error, submit, reset } = useCabSubmit("quote");

  if (status === "success") {
    return (
      <SuccessCard
        title="Thank you! Your trip is with our partners."
        body="Verified operators on that route will send quotes shortly, and we will share them with you on WhatsApp."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cab-name" required>Name</Label>
          <input id="cab-name" name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="cab-phone" required>Phone</Label>
          <input id="cab-phone" name="phone" required type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="cab-pickup" required>Pickup</Label>
          <input id="cab-pickup" name="pickup" required placeholder="Chandigarh airport" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="cab-drop" required>Drop</Label>
          <input id="cab-drop" name="drop" required placeholder="Manali" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="cab-date">Travel date</Label>
          <input id="cab-date" name="travelDate" type="date" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="cab-passengers">Passengers</Label>
          <select id="cab-passengers" name="passengers" defaultValue="2" className={fieldClass}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="cab-type">Preferred vehicle</Label>
        <select id="cab-type" name="cabType" defaultValue="" className={fieldClass}>
          <option value="">Let the operator suggest</option>
          {cabOptions.map((cab) => (
            <option key={cab.type} value={cab.type}>{cab.name} — {cab.capacity}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="cab-notes">Anything else?</Label>
        <textarea id="cab-notes" name="notes" rows={3} placeholder="Multi-day charter, luggage, child seat, early-morning pickup…" className={cn(fieldClass, "resize-none")} />
      </div>

      {status === "error" && error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-4 py-3 text-sm font-medium text-sunset-700">{error}</p>
      )}

      <SubmitButton loading={status === "loading"}>Get Free Quotes</SubmitButton>
      <p className="text-center text-xs text-ink-600/55">Free to post. No obligation to book.</p>
    </form>
  );
}

export function CabPartnerForm() {
  const { status, error, submit, reset } = useCabSubmit("partner");

  if (status === "success") {
    return (
      <SuccessCard
        title="Thank you! Your application is in."
        body="Our partner team will call you to verify documents and get your fleet listed."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="partner-name" required>Owner name</Label>
          <input id="partner-name" name="ownerName" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="partner-phone" required>Phone</Label>
          <input id="partner-phone" name="phone" required type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="partner-email">Email</Label>
          <input id="partner-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <Label htmlFor="partner-city" required>Base city</Label>
          <input id="partner-city" name="baseCity" required placeholder="Manali, Srinagar, Leh…" className={fieldClass} />
        </div>
      </div>

      <div>
        <Label htmlFor="partner-fleet">Fleet size</Label>
        <select id="partner-fleet" name="fleetSize" defaultValue="1" className={fieldClass}>
          {[1, 2, 3, 5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n === 50 ? "50+" : n} vehicle{n !== 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold text-ink-800">Vehicle types you operate</legend>
        <div className="grid grid-cols-2 gap-2">
          {cabOptions.map((cab) => (
            <label key={cab.type} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-sand-200 px-3 py-2.5 text-sm text-ink-700 hover:bg-sand-50">
              <input type="checkbox" name="vehicleTypes" value={cab.type} className="h-4 w-4 accent-brand-600" />
              {cab.name}
            </label>
          ))}
        </div>
      </fieldset>

      {status === "error" && error && (
        <p role="alert" className="rounded-xl bg-sunset-50 px-4 py-3 text-sm font-medium text-sunset-700">{error}</p>
      )}

      <SubmitButton loading={status === "loading"}>Register Your Cab</SubmitButton>
      <p className="text-center text-xs text-ink-600/55">
        We verify RC, permit, insurance and driver licence before any enquiry reaches you.
      </p>
    </form>
  );
}
