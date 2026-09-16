export interface NavLink {
  label: string;
  href: string;
  /** Rendered as a dropdown panel on desktop, an inline group on mobile. */
  children?: { label: string; href: string; hint?: string }[];
}

export const navLinks: NavLink[] = [
  {
    label: "Holidays",
    href: "/packages",
    children: [
      { label: "All packages", href: "/packages", hint: "Every itinerary we run" },
      { label: "Honeymoon", href: "/packages?category=honeymoon", hint: "Private, unhurried, romantic" },
      { label: "Family holidays", href: "/packages?category=family", hint: "Paced for every age" },
      { label: "Adventure", href: "/packages?category=adventure", hint: "Passes, rivers, ridgelines" },
      { label: "Group tours", href: "/packages?category=group", hint: "10–50 travellers" },
      { label: "Luxury", href: "/packages?category=luxury", hint: "Five-star, start to finish" },
    ],
  },
  { label: "Hotels", href: "/hotels" },
  { label: "Cabs", href: "/cabs" },
  { label: "Activities", href: "/activities" },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Himachal", href: "/himachal-pradesh-tour-packages", hint: "Shimla, Manali, Spiti" },
      { label: "Kashmir", href: "/kashmir-tour-packages", hint: "Srinagar, Gulmarg, Pahalgam" },
      { label: "Ladakh", href: "/ladakh-tour-packages", hint: "Leh, Nubra, Pangong" },
      { label: "Uttarakhand", href: "/uttarakhand-tour-packages", hint: "Rishikesh, Nainital, Auli" },
      { label: "Rajasthan", href: "/rajasthan-tour-packages", hint: "Jaipur, Jodhpur, Jaisalmer" },
      { label: "Kerala", href: "/kerala-tour-packages", hint: "Munnar, Alleppey, Kovalam" },
      { label: "Goa", href: "/goa-tour-packages", hint: "North and South coast" },
      { label: "North East", href: "/north-east-tour-packages", hint: "Darjeeling, Gangtok, Shillong" },
      { label: "All destinations", href: "/destinations", hint: "India and international" },
    ],
  },
  { label: "Deals", href: "/deals" },
];

/** Flattened list used by the mobile drawer's primary rail. */
export const primaryNavLinks = navLinks.map(({ label, href }) => ({ label, href }));
