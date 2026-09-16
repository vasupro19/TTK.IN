import Link from "next/link";
import { ShieldCheck, MessageCircle, Star } from "lucide-react";
import { HeroSearch } from "./HeroSearch";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { catalogueStats } from "@/lib/api/catalogue";

export function Hero() {
  const stats = catalogueStats();

  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      <SmartImage
        seed="hero-himalayan-road"
        preload
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/55 to-ink-900/90" />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
            Verified stays · Transparent pricing · Human support
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Your Next Journey Starts Here
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Curated holidays, trusted stays and unforgettable experiences — planned around you, by
            travel experts who have actually driven these routes.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-sunset-400 text-sunset-400" aria-hidden="true" />
              <strong className="font-semibold text-white">{stats.averageRating}/5</strong>
              average trip rating
            </span>
            <span className="flex items-center gap-2">
              <strong className="font-semibold text-white">{stats.packageCount}</strong>
              ready itineraries
            </span>
            <span className="flex items-center gap-2">
              <strong className="font-semibold text-white">{stats.destinationCount}</strong>
              destinations
            </span>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <HeroSearch />
        </div>

        <p className="mt-5 text-sm text-white/65">
          Prefer to talk it through?{" "}
          <Link
            href="/plan-my-trip"
            className="inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Tell us where you want to go
          </Link>{" "}
          and a travel expert will call you back.
        </p>
      </Container>
    </section>
  );
}
