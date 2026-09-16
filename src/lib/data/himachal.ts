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

// ----------------------------------------------------------------- trip types

export interface TourType {
  slug: string;
  name: string;
  blurb: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  href: string;
}

export const tourTypes: TourType[] = [
  {
    slug: "honeymoon",
    name: "Honeymoon",
    blurb: "Valley-view rooms, private transfers and space to do nothing at all.",
    imageSeed: "hp-type-honeymoon",
    href: "/packages?region=himachal&category=honeymoon",
  },
  {
    slug: "family",
    name: "Family Holidays",
    blurb: "Paced for grandparents and children alike, with rooms kept close together.",
    imageSeed: "hp-type-family",
    href: "/packages?region=himachal&category=family",
  },
  {
    slug: "adventure",
    name: "Adventure Trips",
    blurb: "Passes, rapids and ridgelines, with guides who have done the route before.",
    imageSeed: "hp-type-adventure",
    href: "/packages?region=himachal&category=adventure",
  },
  {
    slug: "group",
    name: "Friends & Group Tours",
    blurb: "Ten to fifty travellers, one coordinator, and per-head pricing that drops.",
    imageSeed: "hp-type-group",
    href: "/packages?region=himachal&category=group",
  },
  {
    slug: "luxury",
    name: "Luxury Holidays",
    blurb: "Five-star stays, private guides and the good rooms rather than the leftover ones.",
    imageSeed: "hp-type-luxury",
    href: "/packages?region=himachal&category=luxury",
  },
  {
    slug: "weekend",
    name: "Weekend Getaways",
    blurb: "Two or three nights from Delhi or Chandigarh, planned in a single phone call.",
    imageSeed: "hp-type-weekend",
    href: "/packages?region=himachal&category=weekend",
  },
  {
    slug: "budget",
    name: "Budget Trips",
    blurb: "Clean, well-located stays and shared transfers that keep the cost sensible.",
    imageSeed: "hp-type-budget",
    href: "/packages?region=himachal&price=0-15000",
  },
  {
    slug: "custom",
    name: "Customized Tours",
    blurb: "Nothing on this page fits? We build itineraries from a blank page every week.",
    imageSeed: "hp-type-custom",
    href: "/plan-my-trip?destination=Himachal",
  },
];

// ---------------------------------------------------------- destination guides

export interface DestinationGuide {
  slug: string;
  name: string;
  bestFor: string;
  bestTime: string;
  idealDuration: string;
  experiences: string[];
  whyVisit: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
}

export const destinationGuides: DestinationGuide[] = [
  {
    slug: "shimla",
    name: "Shimla",
    bestFor: "First-time visitors, families, short breaks",
    bestTime: "March–June and December–January",
    idealDuration: "2–3 nights",
    experiences: [
      "Walk the Ridge and Mall Road at dusk",
      "Ride the Kalka–Shimla toy train, a UNESCO-listed line",
      "Snow and pony rides at Kufri",
      "Day trip to Chail and its hilltop cricket ground",
    ],
    whyVisit:
      "Shimla is the gentlest way into Himachal. The old summer capital keeps its colonial promenade, Christ Church and a walkable centre where cars mostly are not allowed. It is well connected, easy for elderly parents, and the usual first night on any circuit from Delhi or Chandigarh.",
    imageSeed: "shimla-hero",
  },
  {
    slug: "manali",
    name: "Manali",
    bestFor: "Couples, snow, adventure activities",
    bestTime: "October–February for snow, March–June for pleasant weather",
    idealDuration: "3–4 nights",
    experiences: [
      "Solang Valley ropeway, zorbing and paragliding",
      "Atal Tunnel to the Lahaul side for snow when Rohtang is shut",
      "Old Manali cafes and the Hadimba cedar temple",
      "Rafting on the Beas near Kullu",
    ],
    whyVisit:
      "Manali does two things at once — it is the most reliable place in the state to put your hands in snow, and it has the liveliest cafe and riverside scene. The Atal Tunnel has changed the trip completely, putting genuine high-altitude landscape within an easy morning's drive.",
    imageSeed: "manali-hero",
  },
  {
    slug: "dharamshala",
    name: "Dharamshala & McLeod Ganj",
    bestFor: "Culture, cafes, short treks",
    bestTime: "March–June and September–November",
    idealDuration: "2–3 nights",
    experiences: [
      "Morning prayers at Namgyal Monastery",
      "Day hike to Triund for the Dhauladhar wall at eye level",
      "Bhagsunag waterfall and the Naddi sunset point",
      "A match or a walk at the HPCA cricket stadium",
    ],
    whyVisit:
      "McLeod Ganj sits above Dharamshala with Tibetan monasteries, momo kitchens and bookshops, and the Dhauladhar range rising almost vertically behind it. It is the most distinctive corner of Himachal culturally, and the easiest place in the state to combine a real trek with a comfortable bed.",
    imageSeed: "dharamshala-hero",
  },
  {
    slug: "dalhousie",
    name: "Dalhousie",
    bestFor: "Quiet holidays, families, slower trips",
    bestTime: "March–June and September–November",
    idealDuration: "2 nights",
    experiences: [
      "Khajjiar's meadow bowl ringed by deodar",
      "Pine walks along Garam Sadak and Thandi Sadak",
      "Boating on Chamera Lake",
      "Colonial churches around Subhash Chowk",
    ],
    whyVisit:
      "Dalhousie is where a Himachal trip slows down. There is very little you must do — which is the appeal. Paired with Khajjiar twenty kilometres away, it makes an unhurried second half to a Dharamshala trip.",
    imageSeed: "dalhousie-hero",
  },
  {
    slug: "kasol",
    name: "Kasol",
    bestFor: "Backpackers, friends, riverside stays",
    bestTime: "March–June and September–November",
    idealDuration: "2–3 nights",
    experiences: [
      "Riverside cafes along the Parvati",
      "Hot springs and the gurudwara at Manikaran",
      "The walk to Chalal through pine forest",
      "Overnight trek to Kheerganga from Barshaini",
    ],
    whyVisit:
      "Kasol runs along a loud green river with cafes on both banks. It draws a younger crowd and a slower pace, and it is the trailhead for the Parvati valley's treks. Best paired with Jibhi or Manali rather than visited alone.",
    imageSeed: "kasol-hero",
  },
  {
    slug: "spiti-valley",
    name: "Spiti Valley",
    bestFor: "Road trips, photography, experienced travellers",
    bestTime: "June–September, when both approaches are open",
    idealDuration: "7–8 nights",
    experiences: [
      "Key Monastery above the Spiti river",
      "Chandratal lake, camped a short walk away",
      "The world's highest post office at Hikkim",
      "Chitkul and Kalpa on the Kinnaur approach",
    ],
    whyVisit:
      "Spiti is the serious end of Himachal — a cold desert above 12,000 feet with thousand-year-old monasteries and villages higher than most Alpine summits. It needs a week, proper acclimatisation and a driver who knows the road. It is not a weekend add-on.",
    imageSeed: "spiti-hero",
  },
  {
    slug: "kinnaur",
    name: "Kinnaur",
    bestFor: "Road trips, orchards, quieter mountains",
    bestTime: "May–October",
    idealDuration: "3–4 nights",
    experiences: [
      "Chitkul, the last village before the border",
      "Kalpa at sunrise, facing Kinner Kailash",
      "The Baspa valley around Sangla",
      "Apple orchards in season, roughly August–October",
    ],
    whyVisit:
      "Kinnaur is the stretch most people drive through on the way to Spiti and later wish they had stopped in. Slate-roofed villages, apple orchards and the Sutlej gorge below, with a fraction of Manali's traffic.",
    imageSeed: "kinnaur-hero",
  },
  {
    slug: "tirthan-valley",
    name: "Tirthan Valley",
    bestFor: "Slow travel, nature, couples",
    bestTime: "March–June and September–November",
    idealDuration: "2–3 nights",
    experiences: [
      "Trout fishing on the Tirthan river",
      "Short treks into the Great Himalayan National Park buffer",
      "Jalori Pass and the forest walk to Serolsar Lake",
      "Jibhi's wooden cottages and waterfall",
    ],
    whyVisit:
      "Tirthan and Jibhi are what the Kullu valley looked like before the hotels arrived. Riverside guesthouses, forest walks and genuinely dark skies, an easy detour off the Delhi–Manali road.",
    imageSeed: "tirthan-hero",
  },
  {
    slug: "kasauli",
    name: "Kasauli",
    bestFor: "Weekend breaks from Chandigarh or Delhi",
    bestTime: "Year-round, loveliest March–June",
    idealDuration: "1–2 nights",
    experiences: [
      "Sunset Point over the plains",
      "The cobbled Upper and Lower Mall",
      "Christ Church and the cantonment lanes",
      "Gilbert Trail through pine forest",
    ],
    whyVisit:
      "The shortest hill escape in Himachal — close enough to Chandigarh for a genuine weekend. Small, quiet and almost entirely about walking, reading and eating well.",
    imageSeed: "kasauli-hero",
  },
  {
    slug: "bir-billing",
    name: "Bir Billing",
    bestFor: "Paragliding, cafes, young travellers",
    bestTime: "March–June and September–November",
    idealDuration: "2 nights",
    experiences: [
      "Tandem paragliding from Billing down to Bir",
      "Tibetan monasteries and the Chokling gompa",
      "Cafes and tea gardens below the Dhauladhar",
      "Short rides out to Baijnath temple",
    ],
    whyVisit:
      "Bir is India's best-known paragliding site, and flights run in clear-weather windows in spring and autumn. Even without flying it is a pleasant slow village with good coffee and a monastery at the end of most lanes.",
    imageSeed: "bir-billing-hero",
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

// ---------------------------------------------------------------- things to do

export interface ThingToDo {
  name: string;
  where: string;
  body: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  icon: string;
}

export const thingsToDo: ThingToDo[] = [
  {
    name: "Snow activities",
    where: "Solang Valley, Kufri, Rohtang",
    body: "Snow tubes, sledging, snow scooters and a ropeway at Solang; gentler slopes and pony rides at Kufri for families with young children.",
    imageSeed: "hp-do-snow",
    icon: "Snowflake",
  },
  {
    name: "Paragliding",
    where: "Bir Billing, Solang Valley",
    body: "Tandem flights from Billing at 2,400 metres, often twenty to thirty minutes in the air. Solang runs shorter joyrides suited to first-timers.",
    imageSeed: "hp-do-paragliding",
    icon: "Wind",
  },
  {
    name: "River rafting",
    where: "Beas near Kullu, Sutlej in Shimla district",
    body: "A straightforward run of grade II–III rapids on the Beas, usually seven to fourteen kilometres, with guides and full safety gear.",
    imageSeed: "hp-do-rafting",
    icon: "Waves",
  },
  {
    name: "Trekking",
    where: "Triund, Kheerganga, Hampta, GHNP",
    body: "From a single day up to Triund to multi-day crossings like Hampta Pass. Most popular routes are well marked and run with local guides.",
    imageSeed: "hp-do-trekking",
    icon: "Footprints",
  },
  {
    name: "Camping",
    where: "Tirthan, Kasol, Chandratal, Sangla",
    body: "Riverside camps in the lower valleys and high-altitude camps at Chandratal and Sarchu during the short summer window.",
    imageSeed: "hp-do-camping",
    icon: "Tent",
  },
  {
    name: "Cafe hopping",
    where: "Old Manali, Kasol, McLeod Ganj, Bir",
    body: "Himachal has a genuine cafe culture — bakeries, Israeli and Tibetan kitchens and riverside terraces built for long afternoons.",
    imageSeed: "hp-do-cafes",
    icon: "Coffee",
  },
  {
    name: "Monastery visits",
    where: "McLeod Ganj, Key, Tabo, Bir",
    body: "Namgyal in McLeod Ganj, Key above the Spiti river, and Tabo — one of the oldest continuously functioning monasteries in the Himalaya.",
    imageSeed: "hp-do-monastery",
    icon: "Landmark",
  },
  {
    name: "Road trips",
    where: "Manali–Spiti, Kinnaur circuit, Jalori Pass",
    body: "The circuit through Kinnaur into Spiti and out over Kunzum is among the finest drives in the country, and needs a week done properly.",
    imageSeed: "hp-do-roadtrip",
    icon: "Route",
  },
  {
    name: "Village experiences",
    where: "Tirthan, Sangla, Jibhi, Pragpur",
    body: "Homestays in slate-roofed villages, orchard walks in season and meals cooked on wood fires — the part of Himachal that hotels cannot sell.",
    imageSeed: "hp-do-village",
    icon: "Home",
  },
  {
    name: "Photography",
    where: "Kalpa, Chandratal, Chitkul, Dhauladhar",
    body: "Kinner Kailash at first light from Kalpa, the Dhauladhar from Naddi, and night skies over Spiti that are among the darkest in India.",
    imageSeed: "hp-do-photography",
    icon: "Camera",
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

// ------------------------------------------------------------ sample itinerary

export interface ItineraryStop {
  day: number;
  title: string;
  route: string;
  body: string;
  stay?: string;
}

export const sampleItinerary: ItineraryStop[] = [
  {
    day: 1,
    title: "Arrival and the drive up to Shimla",
    route: "Delhi / Chandigarh → Shimla",
    body: "Meet your driver and climb through the Solan hills to Shimla. Check in, then walk the Ridge and Mall Road in the evening while you adjust to the altitude and the cold.",
    stay: "Hotel in Shimla",
  },
  {
    day: 2,
    title: "Shimla sightseeing and Kufri",
    route: "Shimla local",
    body: "A half day at Kufri for snow in season or the nature park otherwise, then back for Christ Church, the Ridge and the Jakhoo ropeway. Evening free on the Mall.",
    stay: "Hotel in Shimla",
  },
  {
    day: 3,
    title: "Shimla to Manali along the Beas",
    route: "Shimla → Manali",
    body: "A long, scenic drive following the river through Mandi and Kullu, with a stop for a shawl-weaving demonstration or the Pandoh dam viewpoint. Arrive in Manali by evening.",
    stay: "Hotel in Manali",
  },
  {
    day: 4,
    title: "Manali local sightseeing",
    route: "Manali local",
    body: "Hadimba temple among the cedars, Vashisht hot springs, the Tibetan monastery and Old Manali's cafes. Gentle enough to recover from the previous day's drive.",
    stay: "Hotel in Manali",
  },
  {
    day: 5,
    title: "Solang Valley and the Atal Tunnel",
    route: "Manali → Solang / Atal Tunnel → Manali",
    body: "Snow activities and the ropeway at Solang, then through the Atal Tunnel to the Lahaul side if it is open — the fastest way to reach genuine high-altitude landscape from Manali.",
    stay: "Hotel in Manali",
  },
  {
    day: 6,
    title: "A free day, or an optional excursion",
    route: "Manali leisure",
    body: "Keep it open for rafting on the Beas, a day out to Naggar castle and the Roerich gallery, or simply a slow morning by the river before packing.",
    stay: "Hotel in Manali",
  },
  {
    day: 7,
    title: "Departure",
    route: "Manali → Delhi / Chandigarh",
    body: "Check out after breakfast and begin the drive back, or transfer to your onward bus or flight from Bhuntar.",
  },
];

// ------------------------------------------------------- getting there section

export interface RouteNote {
  from: string;
  to: string;
  body: string;
  mode: string;
}

export const gettingThere: RouteNote[] = [
  {
    from: "Delhi",
    to: "Shimla",
    mode: "Road or rail via Kalka",
    body: "Overnight Volvo coaches and private cabs run nightly from Delhi. The prettier option is the train to Kalka and then the narrow-gauge toy train up to Shimla, a UNESCO World Heritage line.",
  },
  {
    from: "Delhi",
    to: "Manali",
    mode: "Overnight road",
    body: "The standard approach is an overnight Volvo or private cab, arriving the following morning. Most of our Manali itineraries are built around this, so you lose no daylight to travel.",
  },
  {
    from: "Chandigarh",
    to: "Shimla",
    mode: "Road",
    body: "The shortest approach to Himachal, and the reason many travellers fly or take the train to Chandigarh first and start the road journey there.",
  },
  {
    from: "Chandigarh",
    to: "Dharamshala / Dalhousie",
    mode: "Road",
    body: "Chandigarh is the natural starting point for the Kangra and Chamba side of the state. Gaggal airport near Dharamshala also takes limited flights.",
  },
  {
    from: "Kalka",
    to: "Shimla",
    mode: "Toy train",
    body: "The narrow-gauge line climbs through more than a hundred tunnels and is worth doing at least one way. Seats are limited and sell out in peak season, so book early.",
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
 * PLACEHOLDER DATA — replace with verified customer reviews before launch.
 * Do not publish these as real testimonials; they exist so the section can be
 * designed and tested. See README section "Replace before launch".
 */
export const testimonialPlaceholders = [
  {
    id: "placeholder-1",
    name: "Add customer name",
    trip: "Shimla & Manali, 6 nights",
    destination: "Shimla • Manali",
    quote: "Add your verified customer testimonial here.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Add customer name",
    trip: "Himachal honeymoon, 5 nights",
    destination: "Manali • Kasol",
    quote: "Add your verified customer testimonial here.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    name: "Add customer name",
    trip: "Spiti circuit, 8 nights",
    destination: "Kalpa • Kaza • Chandratal",
    quote: "Add your verified customer testimonial here.",
    isPlaceholder: true,
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
