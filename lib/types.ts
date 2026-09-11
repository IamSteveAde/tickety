export type EventCategory =
  | "Music"
  | "Comedy"
  | "Tech"
  | "Food & Drink"
  | "Networking"
  | "Arts";

export interface TicketType {
  id: string;
  name: string;
  price: number; // in Naira, 0 means free
  quantityTotal: number;
  quantitySold: number;
}

export interface CustomQuestion {
  id: string;
  label: string;
  type: "text" | "select";
  options?: string[];
  required: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  state: string;
  venue: string;
  date: string; // ISO date
  startTime: string; // e.g. "16:00"
  category: EventCategory;
  organiserName: string;
organiserId?: string;
  ticketTypes: TicketType[];
  customQuestions: CustomQuestion[];
  featured: boolean;
  trending: boolean;
  coverGradient: string;
  coverImageUrl?: string;
  tags?: string[];
  refundPolicy?: string;
  minAge?: number;
}

export type PaymentStatus = "paid" | "pending" | "failed";
export type TicketStatus = "active" | "used" | "transferred" | "cancelled";

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  ticketId: string;
  amountPaid: number;
  purchaseDate: string;
  paymentStatus: PaymentStatus;
  checkInStatus: boolean;
  checkInTime?: string;
  ticketStatus: TicketStatus;
  answers?: string;
}

export interface Transaction {
  id: string;
  eventTitle: string;
  organiserName: string;
  amount: number;
  platformFee: number;
  date: string;
  status: PaymentStatus;
}

export interface AdminEventSummary {
  id: string;
  title: string;
  organiserName: string;
  status: "live" | "pending" | "disabled";
  ticketsSold: number;
  gross: number;
}