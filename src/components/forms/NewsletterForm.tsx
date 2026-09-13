"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      <p className="rounded-full bg-white/15 px-5 py-3 text-sm font-medium text-white">
        🎉 You&apos;re subscribed — watch your inbox for deals.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full flex-1 rounded-full bg-white/15 px-5 py-3 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:ring-white/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-sunset-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-sunset-600 disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-sunset-200 sm:absolute sm:mt-14">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
