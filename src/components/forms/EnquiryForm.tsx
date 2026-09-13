"use client";

import { useState, type FormEvent } from "react";

export function EnquiryForm({ context }: { context: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, context }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-50 p-6 text-center">
        <p className="font-semibold text-brand-800">Thanks! We&apos;ve received your enquiry.</p>
        <p className="mt-1 text-sm text-brand-700/80">
          A travel consultant will call or WhatsApp you within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Full name"
        className="w-full rounded-xl border border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <input
        name="phone"
        required
        type="tel"
        placeholder="Phone number"
        className="w-full rounded-xl border border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        className="w-full rounded-xl border border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Travel dates, number of travellers, anything else we should know"
        className="w-full resize-none rounded-xl border border-sand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-sunset-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </button>
      {status === "error" && (
        <p className="text-center text-xs text-sunset-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
