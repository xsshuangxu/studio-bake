import type { Order, OrderStatus } from "./types";

const STORAGE_KEY = "studio-bake-orders-v1";

function readAll(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/** Generate a short unique order reference like SB-A7K2M9 */
export function makeOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `SB-${suffix}`;
}

export function saveOrder(order: Order): void {
  const all = readAll();
  all.unshift(order);
  writeAll(all);
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}

export function listOrders(): Order[] {
  return readAll();
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: Partial<Order>,
): Order | undefined {
  const all = readAll();
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return undefined;
  all[idx] = {
    ...all[idx],
    ...extra,
    status,
    ...(status === "paid" && !all[idx].paidAt
      ? { paidAt: new Date().toISOString() }
      : {}),
  };
  writeAll(all);
  return all[idx];
}

/** Upcoming Saturday dates for pickup slots (local calendar). */
export function upcomingPickupDates(count = 4): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  // Skip today if already Saturday afternoon conceptually — still show next Saturdays
  for (let i = 0; i < 60 && out.length < count; i++) {
    const candidate = new Date(d);
    candidate.setDate(d.getDate() + i);
    if (candidate.getDay() === 6) {
      // Require at least 2 days lead time
      const lead = new Date();
      lead.setHours(0, 0, 0, 0);
      const diff =
        (candidate.getTime() - lead.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 2) {
        out.push(candidate.toISOString().slice(0, 10));
      }
    }
  }
  return out;
}

export function formatPickupDate(isoDate: string, locale: "zh" | "en"): string {
  const [y, m, day] = isoDate.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  if (locale === "zh") {
    return `${y}年${m}月${day}日 周六`;
  }
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
