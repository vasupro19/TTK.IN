import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-black text-brand-100">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        Looks like this page went off the itinerary
      </h1>
      <p className="mt-3 max-w-md text-ink-600/75">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
        back on track.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/packages" variant="ghost">
          Browse Packages
        </Button>
      </div>
    </Container>
  );
}
