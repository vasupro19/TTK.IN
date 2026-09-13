import { Container } from "@/components/ui/Container";

export default function PackagesLoading() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="h-9 w-72 animate-pulse rounded-lg bg-sand-200" />
        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-sand-100" />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className="h-96 animate-pulse rounded-2xl bg-sand-100" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                <div className="aspect-[4/3] w-full animate-pulse bg-sand-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-sand-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-sand-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-sand-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
