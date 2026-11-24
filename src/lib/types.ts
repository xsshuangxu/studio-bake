export type OrderStatus = "awaiting_payment" | "paid" | "ready" | "picked_up";

export type CartLine = {
  productId: string;
  quantity: number;
};

export type OrderContact = {
  name: string;
  phone: string;
  wechat?: string;
  note?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  lines: CartLine[];
  pickupDate: string;
  pickupSlotLabel: string;
  contact: OrderContact;
  total: number;
  /** Optional deposit amount if customer paid partial */
  depositPaid?: number;
  paidAt?: string;
};
