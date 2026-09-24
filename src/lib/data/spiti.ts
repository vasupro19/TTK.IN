import {
  Route,
  Car,
  Mountain,
  BedDouble,
  Shuffle,
  MessageCircle,
  Headset,
  type LucideIcon,
} from "lucide-react";
import type { FAQ } from "@/lib/types";
import type { QuickLeadFormOptions } from "@/components/lead/QuickLeadForm";

/**
 * Content for the /spiti-valley-tour-packages landing page.
 *
 * Copy, card order, badges and filter tags live here. Prices, routes and
 * itineraries are never restated — package cards read live figures from
 * `data/packages.ts`.
 *
 * One rule runs through everything below: the Manali side (Kunzum Pass) and
 * Chandratal are seasonal, roughly mid-June to early October. Nothing on the
 * page should imply they are open all year.
 */

export const SPITI_WA_MESSAGE =
  "Hi TheTravelKart, I want to plan a Spiti Valley trip.";

/** Shown wherever a card or answer mentions the Manali side. */
export const KUNZUM_NOTE = "Kunzum & Chandratal usually open mid-June to early October";

// ----------------------------------------------------------- hero trust points

export const spitiTrustPoints: { icon: LucideIcon; label: string }[] = [
  { icon: Route, label: "Custom Spiti itineraries" },
  { icon: Car, label: "Private SUV options" },
  { icon: Mountain, label: "Experienced drivers" },
  { icon: BedDouble, label: "Handpicked stays" },
  { icon: Headset, label: "Trip assistance" },
];

// -------------------------------------------------------------- package cards

/** Merchandising order, badges and the page's own filter tags. */
export const spitiLandingPackages: {
  slug: string;
  badge: string | null;
  tags: string[];
  stayLine: string;
  note?: string;
}[] = [
  {
    slug: "spiti-valley-explorer-6d",
    badge: "Most Popular",
    tags: ["classic", "chandratal", "shimla"],
    stayLine: "Comfort stays · breakfast & dinner · private SUV",
    note: KUNZUM_NOTE,
  },
  {
    slug: "spiti-complete-circuit-8d",
    badge: "Classic",
    tags: ["classic", "chandratal", "shimla", "group"],
    stayLine: "Comfort stays · breakfast & dinner · private SUV",
    note: KUNZUM_NOTE,
  },
  {
    slug: "spiti-manali-adventure-7d",
    badge: "Adventure",
    tags: ["manali", "chandratal", "adventure"],
    stayLine: "Homestays & hotels · meals · private SUV",
    note: "Manali side only when Kunzum Pass is open — usually mid-June to early October",
  },
  {
    slug: "spiti-shimla-to-spiti-7d",
    badge: "First Spiti Trip",
    tags: ["shimla", "classic"],
    stayLine: "Hotels & homestays · breakfast & dinner · private SUV",
    note: "Gains height one night at a time; the Shimla side stays open most of the year",
  },
  {
    slug: "spiti-chandratal-escape-5d",
    badge: "Chandratal",
    tags: ["chandratal", "manali"],
    stayLine: "Comfort stays · meals · private SUV",
    note: KUNZUM_NOTE,
  },
  {
    slug: "spiti-group-expedition-8d",
    badge: "Group Tour",
    tags: ["group", "classic", "chandratal", "shimla"],
    stayLine: "Group transport · stays · meals · sightseeing",
    note: KUNZUM_NOTE,
  },
  {
    slug: "spiti-kinnaur-road-trip-9d",
    badge: null,
    tags: ["classic", "shimla", "chandratal", "adventure"],
    stayLine: "Comfort stays · breakfast & dinner · private SUV",
    note: KUNZUM_NOTE,
  },
];

export const spitiTripTypes = [
  { value: "all", label: "All" },
  { value: "classic", label: "Classic Spiti" },
  { value: "chandratal", label: "Chandratal" },
  { value: "manali", label: "Manali–Spiti" },
  { value: "shimla", label: "Shimla–Spiti" },
  { value: "adventure", label: "Adventure" },
  { value: "group", label: "Group" },
];

export const spitiDurations = [
  { value: "all", label: "Any length" },
  { value: "5-6", label: "5–6 days", min: 5, max: 6 },
  { value: "7-8", label: "7–8 days", min: 7, max: 8 },
  { value: "9+", label: "9+ days", min: 9 },
];

export const spitiBudgets = [
  { value: "all", label: "Any budget" },
  { value: "under-18", label: "Under ₹18,000", max: 17999 },
  { value: "18-22", label: "₹18,000 – ₹22,000", min: 18000, max: 22000 },
  { value: "22+", label: "₹22,000+", min: 22001 },
];

/** The last card: not a package, an invitation. Image resolved by the page. */
export const spitiCustomCard = {
  imageSeed: "sp-custom",
  title: "Build Your Own Spiti Trip",
  summary:
    "Tell us your dates, group size and places you want to visit. We'll build a practical Spiti itinerary around your trip.",
  badge: "Custom",
  durationLabel: "Flexible",
  routeLabel: "Choose your route",
  stayLine: "Hotels · homestays · SUV · meals — based on your plan",
  priceLabel: "Get Quote",
  ctaLabel: "Plan My Trip",
};

// ------------------------------------------------------------ two ways in

export interface RouteSide {
  id: string;
  name: string;
  imageSeed: string;
  summary: string;
  facts: { label: string; value: string }[];
}

/**
 * Shimla side versus Manali side. Rendered as two cards side by side on wide
 * screens and stacked on phones — never a table that needs sideways scrolling.
 */
export const spitiRouteSides: RouteSide[] = [
  {
    id: "shimla-side",
    name: "The Shimla side",
    imageSeed: "kinnaur-hero",
    summary:
      "Along the Sutlej through Kinnaur, then up into Spiti at Khab and Nako. Longer, greener at the start, and the gentler way to gain altitude.",
    facts: [
      { label: "Road", value: "Shimla → Kinnaur → Nako → Tabo → Kaza" },
      { label: "Open", value: "Most of the year; winter snow and monsoon landslides can close it for days" },
      { label: "Altitude", value: "Gradual — Kalpa, Nako and Tabo in between" },
      { label: "Best for", value: "First trips, families, anyone worried about the altitude" },
    ],
  },
  {
    id: "manali-side",
    name: "The Manali side",
    imageSeed: "sp-route-manali",
    summary:
      "Through the Atal Tunnel into Lahaul, past Batal and over Kunzum Pass. Shorter and wilder, with Chandratal just off the road — but only in summer.",
    facts: [
      { label: "Road", value: "Manali → Atal Tunnel → Batal → Kunzum → Kaza" },
      { label: "Open", value: "Usually mid-June to early October, once Kunzum Pass is declared open" },
      { label: "Altitude", value: "Steep — Kunzum is about 4,550 m" },
      { label: "Best for", value: "Travellers with a few mountain trips behind them, and Chandratal" },
    ],
  },
];

export const spitiRouteAdvice =
  "Our usual advice: go in from Shimla and come out through Manali. You climb slowly through Kinnaur, and by the time you cross Kunzum on the way out, your body has had several nights to adjust.";

// ------------------------------------------------------------ places on the road

export const spitiPlaces: { name: string; imageSeed: string; line: string }[] = [
  { name: "Key Monastery", imageSeed: "spiti-hero", line: "Tiers of white cells on a hill above the Spiti river, a short drive from Kaza." },
  { name: "Chicham Bridge", imageSeed: "sp-pl-chicham", line: "A narrow bridge over a very deep gorge, on the road between Kibber and Chicham." },
  { name: "Hikkim & Komic", imageSeed: "sp-pl-hikkim", line: "High villages above Kaza — Hikkim for its post office, Komic for its monastery." },
  { name: "Langza", imageSeed: "sp-pl-langza", line: "A large Buddha statue facing Chau Chau Kang Nilda, and fossils in the fields around it." },
  { name: "Dhankar", imageSeed: "spiti-3", line: "The old capital, built into eroded cliffs above the meeting of the Spiti and Pin rivers." },
  { name: "Tabo", imageSeed: "sp-pl-tabo", line: "Mud-walled halls and chortens more than a thousand years old, in a green village." },
  { name: "Pin Valley", imageSeed: "sp-pl-pin", line: "A side valley of fields and red-brown mountains, ending at the village of Mud." },
  { name: "Chandratal", imageSeed: "spiti-1", line: "A lake at about 4,300 m, reached from the Manali side when the road is open." },
];

// -------------------------------------------------------------------- why us

export const spitiWhyChoose: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Route,
    title: "Practical Itineraries",
    body: "We plan realistic driving days instead of packing every day with unnecessary sightseeing.",
  },
  {
    icon: Car,
    title: "Private SUV Travel",
    body: "Travel with a dedicated vehicle and driver so you have flexibility along the route.",
  },
  {
    icon: Mountain,
    title: "Experienced Drivers",
    body: "Mountain roads demand patience and local road awareness. We work with drivers experienced with Himalayan routes.",
  },
  {
    icon: BedDouble,
    title: "Carefully Chosen Stays",
    body: "Hotels, guesthouses and homestays are selected according to the route, availability and travel season.",
  },
  {
    icon: Shuffle,
    title: "Route Flexibility",
    body: "Depending on road conditions and season, your itinerary can be adjusted without compromising the overall experience.",
  },
  {
    icon: MessageCircle,
    title: "Trip Assistance",
    body: "A real coordinator remains available throughout your journey for updates and support.",
  },
];

// ------------------------------------------------------------ traveller stories

export interface VerifiedReview {
  id: string;
  /** Exactly as the traveller agreed to be named, e.g. "Rahul K." */
  name: string;
  /** e.g. "Shimla to Spiti, 6 nights" */
  trip: string;
  /** e.g. "July 2027" */
  travelledOn: string;
  quote: string;
  /** Where the review was originally left (Google listing, WhatsApp, email). */
  source: string;
}

/**
 * Spiti traveller reviews — VERIFIED ONLY.
 *
 * Deliberately empty: there are no verified Spiti reviews on file, and the
 * site's other testimonials are not verified either, so none are borrowed.
 * Until entries are added, the section says so plainly instead of showing
 * cards. Add one only with the traveller's own words and permission, e.g.
 *
 *   {
 *     id: "shimla-spiti-2027-07",
 *     name: "Rahul K.",
 *     trip: "Shimla to Spiti, 6 nights",
 *     travelledOn: "July 2027",
 *     quote: "…their words, unedited…",
 *     source: "Google review",
 *   },
 */
export const spitiReviews: VerifiedReview[] = [];

// ------------------------------------------------------------------ lead form

export const spitiFormOptions: QuickLeadFormOptions = {
  showEmail: false,
  submitLabel: "Plan My Spiti Trip",
  tripFields: {
    startingCities: ["Delhi", "Chandigarh", "Shimla", "Manali", "Somewhere else"],
    routes: ["Shimla → Spiti", "Manali → Spiti", "Shimla → Spiti → Manali", "Custom"],
  },
};

// ---------------------------------------------------------------------- FAQs

export const spitiFaqs: FAQ[] = [
  {
    question: "When is the best time to visit Spiti Valley?",
    answer:
      "Mid-June to early October, when both sides are usually open and you can do the full circuit with Chandratal. June and September are quieter than July and August. The Shimla side stays open most of the year, so Kaza is reachable in spring and late autumn too — but Kunzum Pass and Chandratal are not, and winter trips from December to March are a different, much colder undertaking.",
  },
  {
    question: "Should I go via Shimla or Manali?",
    answer:
      "If it is your first time at altitude, go in from Shimla and come out through Manali. The Shimla side climbs slowly through Kinnaur; the Manali side takes you to about 4,550 m at Kunzum within a day or two. Outside mid-June to early October the Manali side is shut, so Shimla is the only way in and out.",
  },
  {
    question: "How bad is the altitude?",
    answer:
      "Kaza sits at about 3,800 m and several of the villages you will visit are higher. Most people feel it — a headache, poor sleep, breathlessness on stairs — for the first night or two. We plan for it: gradual height gain, a rest day in Kaza, and Chandratal only after you have spent a couple of nights up. If you have heart or lung conditions, or are travelling with young children or elderly parents, talk to a doctor before you book.",
  },
  {
    question: "Do Indian travellers need a permit for Spiti?",
    answer:
      "Indian citizens do not need a permit for the usual Spiti circuit. Foreign nationals need an Inner Line Permit for the stretch of upper Kinnaur near the border, which we help arrange. Rules do change, so we confirm the current position when we send your itinerary.",
  },
  {
    question: "What happens if a road closes during the trip?",
    answer:
      "It happens — a landslide in Kinnaur, fresh snow on Kunzum, a stream too high at Chhatru. Your driver and coordinator will reroute or wait it out, and we will tell you straight away if a night has to change. Extra nights caused by closures are not included in the package price, which is why we suggest keeping one buffer day at the end of the trip.",
  },
  {
    question: "Will my phone work in Spiti?",
    answer:
      "In Kaza and a few larger villages, usually, on BSNL and Jio; elsewhere expect long stretches with no signal. ATMs in Kaza exist but are not always working, so carry enough cash for the trip. Card payments are accepted at some hotels and not at most homestays.",
  },
  {
    question: "Can you pick us up from Delhi or Chandigarh?",
    answer:
      "Yes. We can start the SUV from Delhi or Chandigarh, or you can take an overnight coach to Shimla or Manali and meet the car there, which is usually cheaper. Tell us where you are coming from and we will price both.",
  },
];

// ---------------------------------------------------------------- SEO guide

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export const spitiGuideIntro =
  "Spiti takes time. The roads are long, the altitude is high, and that's exactly why the itinerary matters. This is what we tell people when they first ask us about a Spiti Valley trip.";

export const spitiGuide: GuideSection[] = [
  {
    id: "why-visit",
    heading: "Why Visit Spiti Valley?",
    paragraphs: [
      "Spiti is a cold desert on the Tibetan side of the Himalaya, in the rain shadow of the main range. It looks nothing like the rest of Himachal: bare brown and grey mountains, a wide braided river, and small white villages where there is water to grow barley and peas.",
      "The monasteries are the reason many people come — Key above Kaza, Dhankar on its cliff, Tabo with halls more than a thousand years old. The villages are the reason they come back: Kibber, Langza, Hikkim, Komic and the Pin Valley, all within a day's drive of Kaza.",
      "Couples come to Spiti for the same things everyone else does, and it makes a very different honeymoon from Manali: fewer people, huge landscapes, homestays instead of resorts. Spiti group tours work well too — one Tempo Traveller or a couple of SUVs, shared rooms, and a pace set for the slowest member rather than the fastest.",
    ],
  },
  {
    id: "how-many-days",
    heading: "How Many Days Do You Need for Spiti?",
    paragraphs: [
      "Five to six nights is the minimum for a proper Spiti Valley road trip, and that already means one or two long driving days. Seven to eight nights lets you enter through Kinnaur, spend two or three nights in Kaza and leave over Kunzum Pass with Chandratal on the way — the itinerary most people should aim for.",
      "With nine nights or more you can add the Sangla valley and Chitkul, or give the Pin Valley a full day. Whatever the length, keep one day spare at the end. Roads in Spiti close for a few hours or a day more often than anyone would like.",
    ],
  },
  {
    id: "shimla-vs-manali",
    heading: "Shimla to Spiti vs Manali to Spiti",
    paragraphs: [
      "A Shimla to Spiti tour follows the Sutlej through Kinnaur and climbs into Spiti at Nako and Tabo. It is longer, but the height gain is gradual and the road is open for most of the year. A Manali to Spiti tour goes through the Atal Tunnel, past Batal and over Kunzum Pass. It is shorter and dramatic, but it only runs from roughly mid-June to early October, and it takes you high very quickly.",
      "The best Spiti Valley packages use both: in from Shimla, out through Manali. If you only have the Manali side, we add a night at Sissu in Lahaul before crossing Kunzum, and keep Chandratal for after Kaza.",
    ],
  },
  {
    id: "best-time",
    heading: "Best Time for a Spiti Road Trip",
    paragraphs: [
      "The best time to visit Spiti for the full circuit is mid-June to early October. July and August are busiest; Spiti itself gets little rain, but the approach roads — the Kinnaur stretch and the Manali side near Chhatru — can be hit by landslides and swollen streams. June and September are quieter and often clearer.",
      "May and late October are possible on the Shimla side only, with cold nights. Winter Spiti, from December to March, is for people who want snow and silence and are prepared for temperatures well below zero, limited stays and a single road in and out.",
    ],
  },
  {
    id: "whats-included",
    heading: "What Is Included in a Spiti Tour Package?",
    paragraphs: [
      "Our Spiti Valley tour packages include your stays — hotels in Kalpa and Manali, guesthouses and homestays in Spiti, a camp near Chandratal — with breakfast and dinner, and a private SUV with a driver for the whole route. Fuel, the driver's allowance, tolls, parking and state taxes are in the price.",
      "Not included: getting to the starting point, monastery donations, lunches, and any extra nights if a road closes. Spiti is a place where the plan occasionally has to change, and we would rather say that up front than bury it in the fine print.",
    ],
  },
  {
    id: "families",
    heading: "Is Spiti Suitable for Families?",
    paragraphs: [
      "It can be, with the right route. Spiti family trips work best from the Shimla side, with short driving days, two nights in Kaza and nothing higher than necessary in the first few days. Children often cope with the altitude better than adults expect, but they are less good at telling you when something is wrong, so we keep the pace slow.",
      "For grandparents, or anyone with a heart or lung condition, speak to a doctor first. We would honestly rather suggest Kinnaur and Kalpa on their own than put someone at risk at 4,000 m.",
    ],
  },
  {
    id: "from-delhi",
    heading: "Spiti Valley Road Trip From Delhi",
    paragraphs: [
      "Delhi to Shimla is about 350 km, eight to nine hours; Delhi to Manali is about 540 km and usually done by overnight coach. Most Spiti Valley packages from Delhi therefore start with a night in Shimla or an overnight bus, and the Spiti circuit proper begins the next morning.",
      "If you would rather keep one car from your door, we can send the SUV to Delhi. It adds a day at each end but saves on transfers, and it suits families with a lot of luggage.",
    ],
  },
  {
    id: "from-chandigarh",
    heading: "Spiti Valley Road Trip From Chandigarh",
    paragraphs: [
      "Chandigarh is the easiest starting point. Shimla is three to four hours away, so Spiti Valley packages from Chandigarh can pick you up at the airport or railway station in the morning and reach Narkanda or Sarahan the same day.",
      "Coming back, the drive from Manali to Chandigarh is about eight hours. We usually time the last day so you reach Chandigarh for an evening flight or train, or add a night in Manali if the flight is early.",
    ],
  },
  {
    id: "tips",
    heading: "Spiti Valley Travel Tips",
    paragraphs: [
      "Drink more water than you think you need, skip alcohol for the first couple of nights, and take the rest day in Kaza seriously — Kaza tour packages that go straight to Chandratal on day two are the ones people regret. Pack warm layers even in July; nights at Chandratal are cold in every month.",
      "Carry cash, a power bank and any medicines you need, including something for motion sickness on the Kinnaur roads. Ask before photographing people or the inside of monasteries. And leave room in the plan: a Spiti Valley itinerary that allows for a slow morning is a far better trip than one that ticks every village.",
    ],
  },
];
