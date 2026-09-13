import { MapPin, PlaneTakeoff, CalendarDays, Users, Wallet, Search } from "lucide-react";
import { regions } from "@/lib/data/regions";
import { destinations } from "@/lib/data/destinations";
import { listDepartureCities } from "@/lib/api/packages";

/**
 * Server-rendered GET form — it submits to /packages and works with JavaScript
 * disabled. The listing page reads every one of these params.
 */
export function HeroSearch() {
  const departureCities = listDepartureCities();
  const suggestions = [
    ...regions.map((r) => r.name),
    ...destinations.map((d) => d.name),
  ].filter((name, i, arr) => arr.indexOf(name) === i);

  return (
    <form
      action="/packages"
      method="GET"
      className="rounded-3xl border border-white/15 bg-white/95 p-3 shadow-2xl shadow-ink-900/25 backdrop-blur-md sm:p-4"
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-sand-200 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1fr_0.9fr_1fr]">
        <Field
          icon={<PlaneTakeoff className="h-4 w-4" aria-hidden="true" />}
          label="From"
          htmlFor="hero-from"
        >
          <select
            id="hero-from"
            name="from"
            defaultValue=""
            className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
          >
            <option value="">Any city</option>
            {departureCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
          label="Where to?"
          htmlFor="hero-to"
        >
          <input
            id="hero-to"
            name="q"
            type="text"
            list="hero-destinations"
            placeholder="Himachal, Kashmir, Goa, Kerala…"
            autoComplete="off"
            className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-600/45"
          />
          <datalist id="hero-destinations">
            {suggestions.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </Field>

        <Field
          icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}
          label="Departure"
          htmlFor="hero-date"
        >
          <input
            id="hero-date"
            name="date"
            type="date"
            className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
          />
        </Field>

        <Field
          icon={<Users className="h-4 w-4" aria-hidden="true" />}
          label="Travellers"
          htmlFor="hero-travellers"
        >
          <select
            id="hero-travellers"
            name="travellers"
            defaultValue="2"
            className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Traveller" : "Travellers"}
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<Wallet className="h-4 w-4" aria-hidden="true" />}
          label="Budget / person"
          htmlFor="hero-budget"
        >
          <select
            id="hero-budget"
            name="budget"
            defaultValue=""
            className="w-full bg-transparent text-sm font-semibold text-ink-900 outline-none"
          >
            <option value="">Any budget</option>
            <option value="0-15000">Under ₹15,000</option>
            <option value="15000-25000">₹15,000 – ₹25,000</option>
            <option value="25000-50000">₹25,000 – ₹50,000</option>
            <option value="50000-100000">₹50,000 – ₹1,00,000</option>
            <option value="100000-0">Above ₹1,00,000</option>
          </select>
        </Field>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="px-1 text-xs text-ink-600/65">
          Nothing fits? We build itineraries from scratch — tell us your dates and we will plan
          around them.
        </p>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.98] sm:w-auto"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search Packages
        </button>
      </div>
    </form>
  );
}

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-3.5 transition-colors focus-within:bg-sand-50">
      <span className="text-brand-600">{icon}</span>
      <span className="min-w-0 flex-1">
        <label
          htmlFor={htmlFor}
          className="block text-[11px] font-semibold uppercase tracking-wide text-ink-600/55"
        >
          {label}
        </label>
        <span className="mt-0.5 block">{children}</span>
      </span>
    </div>
  );
}
