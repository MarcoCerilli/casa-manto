export interface GroomingBooking {
  id: string;
  pet: string;
  size: string;
  owner: string;
  phone: string;
  service: string;
  station: "Vasca" | "Tosatura" | "Finishing";
  time: string;
  price: number;
  status: "Confermato WhatsApp";
}

const KEY = "casa-manto-bookings";

export function stationFor(service: string): GroomingBooking["station"] {
  if (service.includes("Bagno")) return "Vasca";
  if (service.includes("Unghie") || service.includes("Finishing")) return "Finishing";
  return "Tosatura";
}

export function priceFor(service: string): number {
  if (service.includes("Stripping")) return 80;
  if (service.includes("Bagno")) return 38;
  if (service.includes("Unghie")) return 22;
  return 65;
}

export function readGroomingBookings(): GroomingBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GroomingBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveGroomingBooking(booking: GroomingBooking) {
  const next = [booking, ...readGroomingBookings()];
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
