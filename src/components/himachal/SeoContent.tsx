import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** Long-form landing copy. Original writing — no scraped or spun content. */
export function SeoContent() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <article className="prose-himachal">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Himachal Pradesh Tour Packages
          </h2>

          <p className="mt-5 text-base leading-relaxed text-ink-700">
            Himachal Pradesh is the state most Indian travellers visit first when they want
            mountains, and the one many keep coming back to. It packs an enormous range into a
            single state — colonial hill stations you can reach in half a day from Chandigarh, snow
            points an hour from Manali, Tibetan monasteries above Dharamshala, and a cold desert
            beyond the Kunzum pass that feels like another country. Our Himachal tour packages are
            built around that variety rather than a fixed loop.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Why visit Himachal Pradesh
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            The practical answer is accessibility. Few places give you genuine high-Himalaya
            landscape this close to Delhi and Chandigarh, on roads that ordinary vehicles handle and
            with hotels at every budget. You can be walking Shimla&apos;s Ridge the morning after
            leaving Delhi. The less practical answer is that the state rewards slowing down — the
            valleys away from the main highway, Tirthan, Sangla, Jibhi, are where people tend to
            find the trip they actually remember.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Best time to visit
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            There is no single right month. October and November give the clearest mountain views of
            the year, once the monsoon has washed the air. December to February is when people come
            for snow in Shimla, Kufri and Manali. May and June are the busiest, and the window when
            the high roads into Spiti and Lahaul reliably open. March and April bring orchard blossom
            and thinner crowds. July to September is green and noticeably cheaper, but carries a real
            risk of landslides and road closures — we will plan around it honestly rather than
            pretend otherwise.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            How many days are enough
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            Six to seven days covers Shimla and Manali properly without spending every day in the
            car — that is the standard Shimla Manali tour package and the most-booked trip we run.
            Four to five days suits a single base such as Shimla, Dharamshala or Dalhousie. Adding
            Dharamshala to Shimla and Manali pushes you to eight days, because the drive across is
            long. Spiti is different: plan seven to eight nights minimum, because altitude
            acclimatisation is not something you can compress safely.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            How to plan a Himachal trip
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            Start with the number of nights you actually have, then subtract travel days honestly —
            a Delhi to Manali leg eats most of a day whichever way you do it. Pick at most two bases
            for a week; three is where trips start feeling like a bus tour. Decide early whether snow
            matters, because that single answer changes the season, the route and the cost. Then
            work out how you want to move: a private cab for the whole trip costs more than a coach
            but changes the experience completely, particularly with children or elderly parents.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Popular routes
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            The best-known circuit is Shimla, Kufri, Manali and Solang Valley over six or seven days.
            Adding Dharamshala and Dalhousie makes a fuller eight-day loop that takes in the Kangra
            and Chamba side. Travellers wanting fewer crowds go to Kasol, Jibhi and Tirthan instead.
            The serious road trip is the Kinnaur and Spiti circuit — Narkanda, Sangla, Chitkul,
            Kalpa, Tabo and Kaza, exiting over Kunzum to Manali — which needs a full week and a
            driver who knows the road.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Travelling by private cab
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            Most of our Himachal holiday packages use a private vehicle with a local driver for the
            whole trip rather than shared transport. On mountain roads this matters more than it
            does in the plains: you stop where the view is, you leave when your group is ready, and
            a driver who knows the route makes better calls when weather closes a road. We also
            arrange cabs on their own, without a package, for travellers who have already booked
            their stays.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Family, honeymoon, adventure, luxury and budget trips
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            Himachal family tour packages work best with shorter driving days, hotels chosen for
            access rather than just view, and no two long transfers back to back. Himachal honeymoon
            packages go the other way — private transfers, a room worth waking up in, later
            checkouts and time to do nothing. Adventure trips centre on Solang, Bir Billing, the Beas
            rapids and the Hampta and Kheerganga trails. Luxury itineraries use heritage and
            five-star properties in Shimla, Manali and the Kangra valley. Budget trips lean on
            well-located three-star stays and overnight Volvo travel from Delhi, which keeps the cost
            sensible without making the trip unpleasant.
          </p>

          <h3 className="mt-9 font-display text-xl font-bold text-ink-900">
            Starting from Delhi or Chandigarh
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            Himachal Pradesh packages from Delhi usually begin with an overnight Volvo or private cab
            so you lose no daylight. Himachal Pradesh packages from Chandigarh are shorter on the
            road and are the sensible choice for Shimla, Kasauli, Dharamshala and Dalhousie — which
            is why many travellers fly or take the train to Chandigarh first. If you have the time,
            the Kalka to Shimla toy train is worth doing at least one way.
          </p>

          <p className="mt-9 rounded-2xl bg-sand-50 p-5 text-base leading-relaxed text-ink-700">
            We are based in Himachal and drive these routes ourselves, so if a plan will not work in
            your window, we will say so before you book rather than after.{" "}
            <Link href="#enquiry" className="font-semibold text-brand-700 hover:underline">
              Send us your dates
            </Link>{" "}
            and we will come back with a real itinerary and named hotels.
          </p>
        </article>
      </Container>
    </section>
  );
}
