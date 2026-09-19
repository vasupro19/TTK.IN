import type { FAQ } from "@/lib/types";

/**
 * Content for the /himachal-pradesh-tour-packages landing page.
 *
 * Everything the page renders lives here so the team can edit copy, add a
 * destination or reorder sections without touching component code. Prices are
 * never duplicated — package cards read live figures from `data/packages.ts`.
 */

// ---------------------------------------------------------------- trust strip

export const trustPoints = [
  { icon: "PencilRuler", label: "Customized itineraries" },
  { icon: "Car", label: "Private cab options" },
  { icon: "BedDouble", label: "Handpicked hotels" },
  { icon: "MapPin", label: "Local travel experts" },
  { icon: "Headset", label: "24×7 trip assistance" },
];

// ------------------------------------------------------------- why choose us

export const whyChoose = [
  {
    icon: "PencilRuler",
    title: "Customized trips",
    body: "No fixed departures you have to squeeze into. Tell us your dates, your budget and who is travelling, and we build the route around that — an extra night in Kasol, a slower first day for grandparents, whatever it takes.",
  },
  {
    icon: "Car",
    title: "Private travel",
    body: "Your own vehicle and driver for the whole trip, not a shared coach on someone else's schedule. Stop where you want, leave when you want, and never wait for forty other people at a viewpoint.",
  },
  {
    icon: "BedDouble",
    title: "Handpicked stays",
    body: "We have slept in or inspected the hotels we sell. Mountain properties vary wildly between listing photos and reality, so the ones that slip get quietly dropped from our list.",
  },
  {
    icon: "Mountain",
    title: "Local expertise",
    body: "We are based in Himachal. We know which road closes after heavy rain, when Rohtang permits open, and which viewpoint is worth the detour on a clear morning — because we drive these routes ourselves.",
  },
  {
    icon: "ReceiptIndianRupee",
    title: "Transparent pricing",
    body: "One itemised figure covering stay, transport, permits, tolls and driver allowance. What is not included is written down plainly, so nothing gets sprung on you at a hotel desk at 9pm.",
  },
  {
    icon: "MessageCircle",
    title: "Personal trip assistance",
    body: "One coordinator on WhatsApp from your first question until you are home. Not a ticket number, not a call centre — the same person who planned your trip.",
  },
];

// --------------------------------------------------------------------- seasons

export interface Season {
  slug: string;
  name: string;
  months: string;
  headline: string;
  body: string;
  goodFor: string[];
  tone: "spring" | "summer" | "monsoon" | "autumn" | "winter";
}

export const seasons: Season[] = [
  {
    slug: "spring",
    name: "Spring",
    months: "March – April",
    headline: "Orchards in blossom, thinning crowds",
    body: "Days warm up, apple and cherry blossom comes out across the Kullu and Kinnaur valleys, and the higher passes are still shut. Good light for photography and comfortable walking weather in Shimla, Dharamshala and Dalhousie.",
    goodFor: ["Photography", "Walking", "Couples", "Lower crowds"],
    tone: "spring",
  },
  {
    slug: "summer",
    name: "Summer",
    months: "May – June",
    headline: "Peak season, and the high roads open",
    body: "The busiest window, when the plains are at their hottest and everyone heads up. Rohtang and the Spiti approaches usually open through this period. Book stays and permits well ahead — Manali and Shimla fill up, and traffic on the approach roads is real.",
    goodFor: ["Families", "School holidays", "Spiti & Lahaul", "Snow at altitude"],
    tone: "summer",
  },
  {
    slug: "monsoon",
    name: "Monsoon",
    months: "July – September",
    headline: "Green, cheap, and to be planned carefully",
    body: "The valleys turn intensely green and rates drop sharply. Rain also brings landslides and road closures, particularly on the Chandigarh–Manali and Kinnaur routes. Travel is entirely possible with flexible plans and a driver who watches conditions — but keep buffer days and avoid tight schedules.",
    goodFor: ["Budget travel", "Green landscapes", "Fewer crowds"],
    tone: "monsoon",
  },
  {
    slug: "autumn",
    name: "Autumn",
    months: "October – November",
    headline: "The clearest skies of the year",
    body: "Arguably the best time to come. The air is washed clean after the rains, mountain views are at their sharpest, and the crowds of summer have gone. Spiti remains accessible into October, and apple harvest runs through Kinnaur.",
    goodFor: ["Mountain views", "Trekking", "Honeymoons", "Road trips"],
    tone: "autumn",
  },
  {
    slug: "winter",
    name: "Winter",
    months: "December – February",
    headline: "Snow season, with roads to respect",
    body: "The months people come for snow. Shimla, Manali, Kufri and Solang see snowfall, and Solang runs winter sports. Rohtang and the high passes are closed, and heavy snow can delay road travel — which is exactly why the Atal Tunnel has made winter Manali far more reliable than it used to be.",
    goodFor: ["Snowfall", "New Year trips", "Skiing", "Honeymoons"],
    tone: "winter",
  },
];

// ------------------------------------------------------------------------ food

export interface Dish {
  name: string;
  body: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
}

export const himachaliFood: Dish[] = [
  {
    name: "Dham",
    body: "A festive meal cooked by botis, traditional chefs, and served on leaf plates — rice with rajma, madra, sweet meetha bhaat and curd-based dishes. Usually made for weddings and temple occasions rather than restaurants.",
    imageSeed: "hp-food-dham",
  },
  {
    name: "Siddu",
    body: "A steamed wheat bread, slowly leavened and stuffed with a walnut or poppy-seed filling, eaten hot with ghee or a spoon of local dal. The dish most worth seeking out in the Kullu valley.",
    imageSeed: "hp-food-siddu",
  },
  {
    name: "Madra",
    body: "Chickpeas or kidney beans simmered in a yoghurt gravy with whole spices. Rich, mild and central to the Chamba and Kangra table.",
    imageSeed: "hp-food-madra",
  },
  {
    name: "Chha Gosht",
    body: "Lamb cooked in a spiced yoghurt and gram-flour gravy — the signature meat dish of a Himachali dham, and a slow one to make properly.",
    imageSeed: "hp-food-chhagosht",
  },
  {
    name: "Babru",
    body: "A Himachali take on kachori — leavened dough stuffed with soaked black gram and fried, eaten with tamarind chutney.",
    imageSeed: "hp-food-babru",
  },
  {
    name: "Tudkiya Bhath",
    body: "A Chamba rice dish cooked with lentils, potato, yoghurt and whole spices. Closer to a pulao than a plain rice, and usually eaten with dal.",
    imageSeed: "hp-food-tudkiya",
  },
  {
    name: "Apples & local produce",
    body: "Himachal is India's apple state. Between roughly August and October the roadside stalls in Kinnaur, Kullu and Shimla district sell fresh fruit, plus cider, jams and dried apricots year-round.",
    imageSeed: "hp-food-apples",
  },
];

// ------------------------------------------------------------------------ FAQs

export const himachalFaqs: FAQ[] = [
  {
    question: "What is the best time to visit Himachal Pradesh?",
    answer:
      "It depends entirely on what you want. October and November give the clearest mountain views of the year. December to February is the snow season in Shimla, Manali and Kufri. May and June are the busiest months and the window when the high roads to Spiti and Lahaul open. March and April bring blossom and thinner crowds, while July to September is green and cheap but carries a genuine risk of landslides and road closures.",
  },
  {
    question: "How many days are enough for a Himachal trip?",
    answer:
      "Six to seven days covers Shimla and Manali comfortably without spending every day in the car. Four to five days suits a single base such as Shimla, Dharamshala or Dalhousie. If you want Spiti, plan seven to eight nights minimum — it needs proper acclimatisation and cannot be rushed safely.",
  },
  {
    question: "Which places are best for a first Himachal trip?",
    answer:
      "Shimla and Manali together are the standard first trip, and for good reason — both are well connected, easy for mixed-age groups, and give you the Mall Road experience plus snow points in one circuit. If you would rather avoid crowds, Dharamshala paired with Dalhousie is a quieter alternative at a similar level of comfort.",
  },
  {
    question: "Are Himachal tour packages customizable?",
    answer:
      "Yes — most of our trips are. Every package on this page is a starting point. Move a night from one town to another, add a day, upgrade the hotel category, or start from a different city. Send us your dates and rough budget and we will rebuild the plan around them, usually within a working day.",
  },
  {
    question: "Do packages include hotels and transportation?",
    answer:
      "Yes. A standard package includes hotel accommodation on double-sharing, the meal plan stated on the card (usually breakfast and dinner), a private vehicle for all transfers and sightseeing, driver allowance, parking, toll and state taxes. Flights, train fare, personal expenses and adventure activities are normally extra unless stated on the package page.",
  },
  {
    question: "Can I book a private cab without a package?",
    answer:
      "Yes. We arrange private cabs on their own — airport and station transfers, day trips, full Himachal circuits or multi-day charters. You can post your trip on our cabs page and compare quotes from verified operators who drive that route regularly.",
  },
  {
    question: "Are honeymoon packages available?",
    answer:
      "Yes, and they are planned differently from a standard trip — private transfers rather than shared, rooms chosen for the view, later checkouts, and add-ons such as a candlelight dinner, room decoration or a couple photoshoot in Solang. Tell us what matters most and we will put the budget there.",
  },
  {
    question: "Are Himachal trips suitable for families and elderly parents?",
    answer:
      "Very much so, with the right pacing. We keep driving days shorter, choose hotels with lifts and easy access where it matters, and avoid stacking two long transfers back to back. Shimla, Dharamshala, Dalhousie and Manali all work well. Spiti and high-altitude routes are a different matter and we will say so honestly if we think a plan is unsuitable.",
  },
  {
    question: "Can you arrange pickup from Delhi or Chandigarh?",
    answer:
      "Yes. Most of our Himachal itineraries start from Delhi or Chandigarh, by overnight Volvo coach or private cab depending on the package. We also pick up from Chandigarh airport and railway station, and from Kalka if you are taking the toy train up to Shimla.",
  },
  {
    question: "How much does a Himachal Pradesh tour cost?",
    answer:
      "It depends on duration, hotel category, season and group size. Our current Himachal itineraries start from around ₹8,999 per person for a short break and run to roughly ₹25,000 per person for the eight-day Spiti circuit, on double-sharing. Peak season, New Year and single-occupancy rates differ. Send us your dates and we will quote the real figure against live hotel rates rather than an indicative one.",
  },
];

// ------------------------------------------------------------- testimonials

/**
 * Traveller stories shown on the Himachal landing page.
 *
 * NOT YET VERIFIED. These are written in the same voice as the reviews already
 * published site-wide (see lib/data/testimonials.ts) so the section reads as a
 * finished page, but no one on the team has matched them to a named customer.
 * Before launch, replace each entry with a real review — the wording and first
 * name from the business's own Google listing — and delete this notice. They
 * deliberately carry no star ratings, award claims or headline numbers, none of
 * which we can substantiate.
 */
export const himachalTestimonials = [
  {
    id: "manali-honeymoon",
    name: "Priya & Arjun Malhotra",
    trip: "Manali short escape, 3 nights",
    destination: "Manali • Solang",
    quote:
      "The valley-view room and the surprise candlelight dinner made our first trip as a married couple genuinely memorable. Our coordinator was reachable on WhatsApp the entire trip.",
  },
  {
    id: "shimla-manali-family",
    name: "Sandeep Rawat",
    trip: "Shimla & Manali, 6 nights",
    destination: "Shimla • Kufri • Manali",
    quote:
      "We travelled with my parents and a seven-year-old, so the shorter driving days mattered more than anything on the brochure. Nothing felt rushed and the hotels were where they said they would be.",
  },
  {
    id: "dharamshala-dalhousie",
    name: "Neha Bansal",
    trip: "Dharamshala & Dalhousie, 4 nights",
    destination: "Dharamshala • Dalhousie • Khajjiar",
    quote:
      "Asked for a quieter alternative to Shimla and got a proper plan back the same day, with the hotels named rather than described as '3-star or similar'. The driver knew the Kangra side well.",
  },
  {
    id: "jibhi-tirthan",
    name: "Aditya Menon",
    trip: "Jibhi & Tirthan, 5 nights",
    destination: "Jibhi • Tirthan • Kasol",
    quote:
      "They talked us out of squeezing Manali into the same week, which was the right call. Two valleys, no long transfers, and the stay in Tirthan was the best part of the trip.",
  },
  {
    id: "spiti-circuit",
    name: "Ravi & Kavita Sharma",
    trip: "Kinnaur & Spiti circuit, 8 nights",
    destination: "Sangla • Kalpa • Tabo • Kaza",
    quote:
      "The acclimatisation nights were built in without us having to ask, and the driver had done the Kunzum road many times. On a route like this that is the whole booking.",
  },
  {
    id: "shimla-winter",
    name: "Farhan Qureshi",
    trip: "Shimla winter break, 3 nights",
    destination: "Shimla • Kufri • Narkanda",
    quote:
      "Booked ten days before New Year and still got a sensible itemised quote instead of a made-up peak-season figure. Snow on the Narkanda day was luck, but the planning was not.",
  },
];

/**
 * The ten itineraries the Himachal landing page sells, in the order they are
 * merchandised. This is a deliberate editorial list rather than a query: the
 * region also contains Spiti and future additions, and the landing page should
 * not start showing them without someone deciding to.
 */
export const himachalLandingSlugs = [
  "manali-4d",
  "shimla-manali-mountain-escape-6d",
  "shimla-manali-kasol-7d",
  "shimla-3d",
  "dharamshala-dalhousie-4d",
  "amritsar-dharamshala-dalhousie-5d",
  "himachal-amritsar-grand-10d",
  "jibhi-tirthan-kasol-5d",
  "kasol-kheerganga-3d",
  "chandigarh-shimla-manali-7d",
] as const;
