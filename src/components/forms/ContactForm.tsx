"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="rounded-2xl bg-brand-50 p-8 text-center">
        <p className="text-lg font-semibold text-brand-800">Message sent!</p>
        <p className="mt-1 text-sm text-brand-700/80">
          Our team will get back to you within a few working hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Full name"
          className="w-full rounded-xl border border-sand-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <input
          name="phone"
          required
          type="tel"
          placeholder="Phone number"
          className="w-full rounded-xl border border-sand-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <input
        name="email"
        type="email"
        placeholder="Email address"
        className="w-full rounded-xl border border-sand-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <select
        name="subject"
        defaultValue=""
        className="w-full rounded-xl border border-sand-200 px-4 py-3 text-sm text-ink-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        <option value="" disabled>
          What can we help with?
        </option>
        <option value="new-booking">New booking enquiry</option>
        <option value="existing-booking">Existing booking support</option>
        <option value="partnership">Partnership / B2B</option>
        <option value="other">Something else</option>
      </select>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Tell us about your trip — dates, destination, number of travellers"
        className="w-full resize-none rounded-xl border border-sand-200 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-sunset-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-sunset-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
