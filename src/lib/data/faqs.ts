import type { FAQ } from "@/lib/types";

/**
 * Homepage FAQ set. Rendered as an accordion and emitted as FAQPage
 * structured data, so keep answers factual and self-contained.
 */
export const homeFaqs: FAQ[] = [
  {
    question: "Do you offer customized itineraries?",
    answer:
      "Yes — most of our trips are customised. Every package on the site is a starting point: move a night from one town to another, add a day, upgrade the hotel category, or start from a different city. Send us your dates and rough budget and we will build the plan around them, usually within a working day.",
  },
  {
    question: "What is included in a package?",
    answer:
      "Each package page lists exactly what is included and excluded. Typically that means hotel accommodation on double-sharing, the meal plan stated on the card (usually breakfast and dinner), a private vehicle for transfers and sightseeing, driver allowance, parking, toll and state taxes. Flights, personal expenses and adventure activities are normally extra unless stated.",
  },
  {
    question: "Can I modify my itinerary after booking?",
    answer:
      "Yes, within reason. Changes to dates, hotels or the route are possible depending on availability and how close you are to departure. Some hotels and permits are non-refundable once issued — your coordinator will tell you the exact cost before anything is changed, never after.",
  },
  {
    question: "Do you provide airport and railway transfers?",
    answer:
      "Airport and railway station transfers are included in almost every package. If your flight or train times fall outside the standard window, tell us at the time of booking and we will arrange the pickup — late-night arrivals may carry a small extra charge from the operator.",
  },
  {
    question: "How does booking work?",
    answer:
      "Send an enquiry or message us on WhatsApp. A travel expert calls you back, confirms the plan and sends a written quote with the day-by-day itinerary and named hotels. A booking is confirmed with an advance, with the balance due before departure. You get a written confirmation with hotel details, driver details and emergency numbers.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations are refunded on a sliding scale based on how far ahead you cancel, minus anything already committed to hotels, airlines or permit authorities. The exact schedule is on our cancellation policy page and is restated in your booking confirmation, so there are no surprises.",
  },
  {
    question: "Do you provide honeymoon packages?",
    answer:
      "Yes, and they are planned differently from a standard trip — private transfers rather than shared, rooms picked for the view, later checkouts, and add-ons such as a candlelight dinner, room decoration or a couple photoshoot. Tell us what matters most and we will put the budget there.",
  },
  {
    question: "Can I book a private cab without a package?",
    answer:
      "Yes. Post your trip on the cab page and verified operators in that region send you quotes — airport runs, day trips, full circuits or multi-day charters. You compare and pick; there is no booking fee for getting quotes.",
  },
  {
    question: "Do you provide international tours?",
    answer:
      "Yes. We run packages to Thailand, Bali, the Maldives, Dubai and Singapore, with visa assistance and travel insurance included in most itineraries. International airfare is quoted separately so you can use your own miles or preferred airline if you prefer.",
  },
];

export const packageFaqs: FAQ[] = [
  {
    question: "Is the price per person or for the whole group?",
    answer:
      "All prices shown are per person on double-sharing occupancy. The card also shows the total for two travellers. Single-occupancy and triple-sharing rates are available on request and will be quoted before you confirm.",
  },
  {
    question: "How many people will be in my group?",
    answer:
      "Unless a package is explicitly marked as a group tour, it is a private departure — your family or friends, your own vehicle and your own guide. Nobody is added to your trip.",
  },
  {
    question: "What if the weather closes a pass or a road?",
    answer:
      "Mountain itineraries always carry a weather clause. If a pass, ropeway or road closes, your coordinator reworks that day on the ground — a substitute sightseeing route, or an extra night lower down. We tell you what it costs before we change anything.",
  },
  {
    question: "Can I pay in instalments?",
    answer:
      "Bookings are confirmed with an advance and the balance is due before departure. For larger group and international trips we can split the balance across two instalments — ask your coordinator when you receive the quote.",
  },
];
