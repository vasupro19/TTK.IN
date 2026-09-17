// ---------------------------------------------------------------------------
// Catalogue types — what the public site renders.
// ---------------------------------------------------------------------------

export type PackageCategory =
  | "honeymoon"
  | "family"
  | "adventure"
  | "pilgrimage"
  | "luxury"
  | "group"
  | "corporate"
  | "weekend";

export type PackageType = "domestic" | "international";

/** Star grade of the stays bundled into a package. */
export type HotelCategory = 3 | 4 | 5;

export type MealPlan = "none" | "breakfast" | "breakfast-dinner" | "all-meals";

export type TransportMode =
  | "private-cab"
  | "shared-coach"
  | "volvo"
  | "flight-inclusive"
  | "self-drive";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  /** e.g. "Delhi → Shimla" — shown as the day's route line. */
  route?: string;
  distanceKm?: number;
  travelTimeHours?: number;
  /** Meals provided on this day, e.g. ["Breakfast", "Dinner"]. */
  meals?: string[];
  /** Stay for the night, e.g. "4★ hotel in Shimla". */
  stay?: string;
}

export interface Package {
  slug: string;
  title: string;
  /** Primary destination the package is filed under. */
  destinationSlug: string;
  /** Every destination the itinerary covers, primary first. */
  destinationSlugs: string[];
  regionSlug: string;
  /** Display route, e.g. ["Shimla", "Manali", "Dharamshala"]. */
  routeCities: string[];
  type: PackageType;
  categories: PackageCategory[];
  durationDays: number;
  durationNights: number;
  departureCities: string[];
  price: number;
  strikeThroughPrice?: number;
  currency: "INR";
  hotelCategory: HotelCategory;
  meals: MealPlan;
  transport: TransportMode;
  sightseeing: boolean;
  rating: number;
  reviewCount: number;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  /** Image seeds for the gallery, resolved through src/lib/images. */
  gallerySeeds: string[];
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  bestTimeToVisit: string;
  featured?: boolean;
}

export interface Region {
  slug: string;
  name: string;
  /** State, union territory, or country the region sits in. */
  area: string;
  country: string;
  type: PackageType;
  tagline: string;
  description: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  startingPrice: number;
  popularFor: string[];
  featured?: boolean;
  /** SEO landing path, e.g. "/himachal-pradesh-tour-packages". */
  seoPath?: string;
}

export interface Destination {
  slug: string;
  name: string;
  /** Region (state / country group) this destination belongs to. */
  regionSlug: string;
  /**
   * True for places that sit on a region's circuits without being *in* it —
   * Amritsar and Chandigarh on the Himachal routes, for example. They are
   * grouped under the region so their packages and breadcrumbs work, but they
   * are excluded from "places in <region>" listings, where they would read as
   * a factual error.
   */
  isGateway?: boolean;
  /**
   * State or union territory, where it differs from the region the destination
   * is filed under. Set on gateways so the page shows the true place.
   */
  area?: string;
  country: string;
  type: PackageType;
  tagline: string;
  description: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  /** Image seeds for the gallery, resolved through src/lib/images. */
  gallerySeeds: string[];
  startingPrice: number;
  popularFor: string[];
}

export interface TravelCategory {
  slug: PackageCategory;
  name: string;
  description: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  /** Lucide icon name, resolved by the card component. */
  icon: string;
}

export interface Deal {
  slug: string;
  title: string;
  regionSlug: string;
  packageSlug: string;
  discountPercent: number;
  price: number;
  strikeThroughPrice: number;
  durationLabel: string;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  validTill: string;
  blurb: string;
}

export interface HotelRoom {
  name: string;
  occupancy: string;
  pricePerNight: number;
  /** Taxes and fees per night, shown separately for price transparency. */
  taxesPerNight: number;
}

export interface Hotel {
  slug: string;
  name: string;
  destinationSlug: string;
  starRating: HotelCategory;
  pricePerNight: number;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  gallery?: string[];
  amenities: string[];
  rooms: HotelRoom[];
  description: string;
  rating: number;
  reviewCount: number;
}

export type CabType = "hatchback" | "sedan" | "suv" | "tempo-traveller";

export interface CabOption {
  type: CabType;
  name: string;
  capacity: string;
  pricePerKm: number;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  features: string[];
}

export interface Activity {
  slug: string;
  name: string;
  destinationSlug: string;
  category: string;
  price: number;
  durationHours: number;
  /** Image seed resolved through src/lib/images. */
  imageSeed: string;
  description: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImageSeed: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  packageSlug: string;
  rating: number;
  quote: string;
  avatarSeed: string;
  travelledOn?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Operational / CRM types — no UI renders these yet, but every form and
// service in `lib/api` is typed against them so a real backend (Prisma +
// PostgreSQL, or an external CRM) can be dropped in without reshaping data.
// ---------------------------------------------------------------------------

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type LeadSource = "website" | "whatsapp" | "phone" | "referral" | "ads";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  /** Region or destination slug, or free text if the traveller typed their own. */
  destination: string;
  travelDate?: string;
  travellers: number;
  /** Requested trip length in nights. */
  nights?: number;
  budget?: string;
  message?: string;
  packageSlug?: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  assignedTo?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  createdAt: string;
  bookingIds: string[];
}

export type BookingStatus =
  | "enquiry"
  | "quoted"
  | "confirmed"
  | "travelling"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  reference: string;
  customerId: string;
  packageSlug: string;
  travelDate: string;
  adults: number;
  children: number;
  totalAmount: number;
  amountPaid: number;
  status: BookingStatus;
  createdAt: string;
  itineraryId?: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  method?: "upi" | "card" | "netbanking" | "cash" | "bank-transfer";
  gatewayReference?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  bookingId: string;
  issuedAt: string;
  dueAt: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  status: "draft" | "sent" | "paid" | "void";
}

export interface Vehicle {
  id: string;
  partnerId: string;
  type: CabType;
  model: string;
  registrationNumber: string;
  seats: number;
  verified: boolean;
}

export interface Driver {
  id: string;
  partnerId: string;
  name: string;
  phone: string;
  licenceNumber: string;
  yearsExperience: number;
  languages: string[];
  verified: boolean;
  rating?: number;
}

export interface CabQuoteRequest {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  travelDate: string;
  passengers: number;
  cabType?: CabType;
  notes?: string;
  createdAt: string;
}

export interface CabPartnerApplication {
  id: string;
  ownerName: string;
  phone: string;
  email?: string;
  baseCity: string;
  fleetSize: number;
  vehicleTypes: CabType[];
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  packageSlug: string;
  rating: number;
  body: string;
  travelledOn: string;
  published: boolean;
  createdAt: string;
}

/** Uniform envelope returned by every service in `lib/api`. */
export interface ServiceResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
