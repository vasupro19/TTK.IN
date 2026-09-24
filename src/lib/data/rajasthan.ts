import {
  PencilRuler,
  Car,
  BedDouble,
  Landmark,
  ReceiptIndianRupee,
  MessageCircle,
  MapPin,
  Headset,
  type LucideIcon,
} from "lucide-react";

/**
 * Content for the /rajasthan-tour-packages landing page.
 *
 * Copy, card order and badges live here so the team can edit them without
 * touching components. Prices, routes and itineraries are never restated —
 * package cards read live figures from `data/packages.ts`.
 */

export const RAJASTHAN_WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Rajasthan tour package.";

// ----------------------------------------------------------- hero trust points

export const rajasthanTrustPoints: { icon: LucideIcon; label: string }[] = [
  { icon: PencilRuler, label: "Customized itineraries" },
  { icon: Car, label: "Private cab options" },
  { icon: BedDouble, label: "Handpicked hotels" },
  { icon: MapPin, label: "Local travel experts" },
  { icon: Headset, label: "24×7 trip assistance" },
];

// -------------------------------------------------------------- package cards

/**
 * The eight itineraries the page sells, in merchandising order.
 *
 * `tags` drive the page's own filters (Heritage and Desert are not catalogue
 * categories). `badge: null` means the card is deliberately unbadged.
 */
export const rajasthanLandingPackages: {
  slug: string;
  badge: string | null;
  tags: string[];
  stayLine: string;
}[] = [
  {
    slug: "rajasthan-jaipur-jodhpur-udaipur-6d",
    badge: "Best seller",
    tags: ["family", "heritage", "group"],
    stayLine: "3★ / 4★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-jaipur-pushkar-udaipur-5d",
    badge: "Heritage",
    tags: ["heritage", "honeymoon", "family"],
    stayLine: "3★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-jodhpur-jaisalmer-desert-6d",
    badge: "Desert",
    tags: ["desert", "group"],
    stayLine: "3★ / 4★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-jaipur-short-escape-4d",
    badge: "Budget friendly",
    tags: ["family", "heritage", "group"],
    stayLine: "3★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-udaipur-jaisalmer-honeymoon-6d",
    badge: "Honeymoon",
    tags: ["honeymoon", "desert"],
    stayLine: "4★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-royal-family-holiday-7d",
    badge: "Family",
    tags: ["family", "heritage", "desert", "group"],
    stayLine: "3★ / 4★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-golden-circuit-8d",
    badge: null,
    tags: ["heritage", "desert", "group", "family"],
    stayLine: "3★ hotels · breakfast & dinner · private cab",
  },
  {
    slug: "rajasthan-luxury-heritage-7d",
    badge: "Luxury",
    tags: ["luxury", "heritage", "honeymoon"],
    stayLine: "4★ / 5★ hotels · breakfast · private luxury cab",
  },
];

export const rajasthanTripTypes = [
  { value: "all", label: "All" },
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "heritage", label: "Heritage" },
  { value: "desert", label: "Desert" },
  { value: "luxury", label: "Luxury" },
  { value: "group", label: "Group" },
];

/** No 9+ day option: nothing on the page runs that long. */
export const rajasthanDurations = [
  { value: "all", label: "Any length" },
  { value: "3-4", label: "3–4 days" },
  { value: "5-6", label: "5–6 days" },
  { value: "7-8", label: "7–8 days" },
];

// -------------------------------------------------------------------- why us

export const rajasthanWhyChoose: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: PencilRuler,
    title: "Customized trips",
    body: "Tell us your dates, budget and travel style. We build the route around your group instead of forcing you into a fixed itinerary.",
  },
  {
    icon: Car,
    title: "Private travel",
    body: "Your own vehicle and driver for the trip, giving you the freedom to stop, explore and travel at your own pace.",
  },
  {
    icon: BedDouble,
    title: "Handpicked stays",
    body: "We focus on well-located hotels and heritage properties that make sense for the route and your budget.",
  },
  {
    icon: Landmark,
    title: "Local expertise",
    body: "From the right time to visit a fort to planning desert experiences, we help you make practical choices rather than simply adding more sightseeing.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Transparent pricing",
    body: "You receive a clear itinerary and pricing structure so you know what is included before you book.",
  },
  {
    icon: MessageCircle,
    title: "Personal trip assistance",
    body: "A real coordinator stays available on WhatsApp from the first enquiry until you return home.",
  },
];

// ------------------------------------------------------------ traveller stories

export interface VerifiedReview {
  id: string;
  /** Exactly as the traveller agreed to be named, e.g. "Anjali S." */
  name: string;
  /** e.g. "Jaipur, Jodhpur & Udaipur, 5 nights" */
  trip: string;
  /** e.g. "January 2027" */
  travelledOn: string;
  quote: string;
  /** Where the review was originally left (Google listing, WhatsApp, email). */
  source: string;
}

/**
 * Rajasthan traveller reviews — VERIFIED ONLY.
 *
 * Deliberately empty. There are no Rajasthan reviews on file yet, and this
 * page does not ship invented ones. Until entries are added, the section
 * shows an honest "reviews coming" state instead of cards.
 *
 * To add one: copy the wording from the traveller's own review (Google
 * listing, or a message they have agreed to have published), use the name
 * they agreed to, and fill in `source`. Example shape:
 *
 *   {
 *     id: "jaipur-udaipur-2027-01",
 *     name: "Anjali S.",
 *     trip: "Jaipur, Jodhpur & Udaipur, 5 nights",
 *     travelledOn: "January 2027",
 *     quote: "…their words, unedited…",
 *     source: "Google review",
 *   },
 */
export const rajasthanReviews: VerifiedReview[] = [];

// ---------------------------------------------------------------- SEO guide

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export const rajasthanGuideIntro =
  "Rajasthan is one of the easiest parts of India to travel well and one of the easiest to travel badly. The distances between cities are longer than they look on a map, the heat changes what you can do in a day, and the difference between a good hotel and a tired one is large. Our Rajasthan tour packages are built around those facts — here is how we think about planning a trip.";

export const rajasthanGuide: GuideSection[] = [
  {
    id: "why-visit",
    heading: "Why Visit Rajasthan?",
    paragraphs: [
      "Few places pack this much into one state. Jaipur's forts and bazaars, Jodhpur's blue old city under Mehrangarh, the lived-in golden fort at Jaisalmer and the lakes and palaces of Udaipur are each a day's drive apart, and each feels different from the last. Between them sit smaller places — Pushkar, Ranakpur, Chittorgarh, Bundi — that reward a slower trip.",
      "Rajasthan tourism is also well set up for travellers of every kind. Road connections between the main cities are good, there are hotels at every budget from simple guesthouses to palaces, and it works as well for a family with grandparents as it does for a couple on their honeymoon.",
    ],
  },
  {
    id: "how-many-days",
    heading: "How Many Days Are Enough for Rajasthan?",
    paragraphs: [
      "Three to four days suits Jaipur on its own, or Jaipur with Pushkar. Five to six days is the sweet spot for a first trip: Jaipur, Jodhpur and Udaipur with two nights in most places. Seven to eight days lets you add Jaisalmer and a night on the dunes without rushing.",
      "Beyond ten days you can add Ranthambore for tigers, Bikaner, Bundi or Mount Abu. What we advise against is trying to see four cities in five days — Rajasthan's drives are five to six hours between most cities, and a trip that is mostly car windows is not a good trip.",
    ],
  },
  {
    id: "routes",
    heading: "Popular Rajasthan Tour Routes",
    paragraphs: [
      "Jaipur, Jodhpur and Udaipur is the classic route and the one most first-time visitors should start with. Adding Jaisalmer turns it into the full western circuit, with a desert camp at Sam. Jaipur, Pushkar and Udaipur is a gentler alternative that swaps the blue city for Pushkar's ghats.",
      "Jodhpur and Jaisalmer together make a compact desert trip of five or six days. And Jaipur on its own, with Amber, Nahargarh and the old city, is a good long weekend from Delhi. Most Jaipur, Jodhpur, Jaisalmer and Udaipur packages can be run in either direction, so we set the order around where your flights or trains are easiest.",
    ],
  },
  {
    id: "planning",
    heading: "How to Plan a Rajasthan Trip",
    paragraphs: [
      "Start with the season. October to March is the main window, with December and January the busiest and most expensive, especially around Christmas and New Year. The Pushkar fair usually falls in November, and the Jaisalmer Desert Festival in February. From April to June the plains regularly pass 40°C and desert camps mostly close; the monsoon months are quieter, greener around Udaipur and cheaper.",
      "Then decide where you arrive and leave. Jaipur, Jodhpur and Udaipur all have airports; Jaisalmer's flights are more limited, so desert trips often end with a drive or an overnight train. A one-way route — in at Jaipur, out at Udaipur — saves a long day of driving back. Good Rajasthan itinerary planning also means sightseeing early: forts are far more pleasant at 9am than at 1pm.",
      "When you enquire, tell us your dates, how many people are travelling and their ages, a rough budget per person, and whether you want heritage hotels or simply comfortable ones. That is enough for us to send back a real itinerary.",
    ],
  },
  {
    id: "family",
    heading: "Rajasthan Family Holidays",
    paragraphs: [
      "Rajasthan family tours work best with fewer cities and more nights. We keep drives to one sitting with a stop in the middle, choose hotels with a pool where we can — it matters more than you would expect in the afternoon heat — and avoid scheduling three forts in a day.",
      "Children tend to enjoy Jantar Mantar, the elephant-gate climb at Amber, a boat on Lake Pichola and, above all, the dunes. For older parents we check for lifts, avoid hotels up steep lanes, and note which forts involve long walks or stairs.",
    ],
  },
  {
    id: "honeymoon",
    heading: "Rajasthan Honeymoon Trips",
    paragraphs: [
      "Udaipur is the centre of most Rajasthan honeymoon packages, and a lake-view room is worth paying for there. Jaisalmer adds something quite different: a golden fort, empty dunes and a night at a desert camp. Heritage havelis in Jaipur and Jodhpur make a good middle ground between a hotel and a palace.",
      "We plan honeymoons with later starts, fewer sights per day and one or two special evenings — a sunset boat, a private dinner at the camp — rather than filling every hour.",
    ],
  },
  {
    id: "luxury",
    heading: "Rajasthan Luxury Holidays",
    paragraphs: [
      "Rajasthan has some of the most atmospheric hotels in India: former palaces, forts and old merchant havelis, many still run by the families who built them. Rajasthan luxury tours are as much about these stays as about sightseeing, so we build in two nights in each and leave evenings free to enjoy them.",
      "The best of these properties fill early for December and January. If a particular hotel matters to you, tell us at the start and we will plan the dates around its availability.",
    ],
  },
  {
    id: "from-delhi",
    heading: "Rajasthan Packages From Delhi",
    paragraphs: [
      "Delhi to Jaipur is about 280 km, five to six hours by road, which makes Jaipur the natural start for Rajasthan packages from Delhi. Our cabs pick up from your Delhi hotel, the airport or the railway station, and the same car and driver stay with you for the trip.",
      "If you would rather not spend the first day on the road, there are fast morning trains to Jaipur and short flights to Udaipur and Jodhpur. Many travellers also add Agra on the way — Delhi, Agra and Jaipur together is easy to combine with the rest of Rajasthan.",
    ],
  },
  {
    id: "private-cab",
    heading: "Private Cab Rajasthan Tours",
    paragraphs: [
      "Almost every Rajasthan trip we plan runs on a private cab with a driver, and for good reason: the cities are spread out, public transport between them is slow, and a car lets you stop at Ranakpur, Chittorgarh or a roadside chai stall on the way. A sedan suits two or three people, an SUV such as an Innova four to six, and a Tempo Traveller works for larger groups.",
      "Private Rajasthan tours are priced with the driver's allowance, tolls, parking and state taxes included, so there is nothing to settle at the end. We also avoid long drives after dark — the highways are fine by day, but it is not worth the risk at night.",
    ],
  },
];
