/**
 * Architecture “slots” for future features — visible in UI as disabled toggles,
 * and documented here for later wiring.
 *
 * DELIVERY_SLOT:
 *   When volume grows, enable same-day / next-day courier partnership.
 *   Do NOT build full logistics in v1. Flip `deliveryEnabled` in site config
 *   (or env) and wire a courier API adapter behind CheckoutStepFulfillment.
 *
 * STRIPE_SLOT:
 *   Future Stripe / card / PayPal checkout without PCI surface in v1.
 *   Keep Venmo/Zelle/WeChat as primary; when ready, add a PaymentElement
 *   behind `cardPaymentsEnabled` and never store raw card data client-side.
 */

"use client";

import { useState } from "react";

// Feature flags — leave false until real integrations exist.
const DELIVERY_ENABLED = false;
const CARD_PAYMENTS_ENABLED = false;

export function FutureSlots() {
  const [deliveryOn, setDeliveryOn] = useState(false);
  const [cardOn, setCardOn] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
      <h2 className="font-display text-2xl text-[var(--cocoa)] md:text-3xl">
        <span className="font-zh">即将推出</span>
        <span className="ml-3 text-base font-normal text-[var(--cocoa-soft)]/70">
          Coming later
        </span>
      </h2>
      <p className="mt-2 max-w-xl text-sm text-[var(--cocoa-soft)]">
        预留接口 · Architecture slots — visible now, wired when volume and
        compliance are ready.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label
          className={`flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-white/30 p-5 ${
            DELIVERY_ENABLED ? "" : "slot-disabled"
          }`}
        >
          <input
            type="checkbox"
            className="mt-1"
            checked={DELIVERY_ENABLED ? deliveryOn : false}
            disabled={!DELIVERY_ENABLED}
            onChange={(e) => setDeliveryOn(e.target.checked)}
            aria-describedby="delivery-slot-note"
          />
          <span>
            <span className="block font-zh text-[var(--cocoa)]">
              当日 / 次日快递配送
            </span>
            <span className="block text-sm text-[var(--cocoa-soft)]">
              Same-day / next-day courier delivery
            </span>
            <span
              id="delivery-slot-note"
              className="mt-2 block text-xs leading-relaxed text-[var(--cocoa-soft)]/70"
            >
              {/* DELIVERY_SLOT: enable when partnering with a Boston courier.
                  See comment block at top of this file. */}
              目前以预约自取为主。配送物流接入位已预留，尚未开通。
              Pickup-first for now — courier partnership hook reserved.
            </span>
          </span>
        </label>

        <label
          className={`flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-white/30 p-5 ${
            CARD_PAYMENTS_ENABLED ? "" : "slot-disabled"
          }`}
        >
          <input
            type="checkbox"
            className="mt-1"
            checked={CARD_PAYMENTS_ENABLED ? cardOn : false}
            disabled={!CARD_PAYMENTS_ENABLED}
            onChange={(e) => setCardOn(e.target.checked)}
            aria-describedby="stripe-slot-note"
          />
          <span>
            <span className="block font-zh text-[var(--cocoa)]">
              信用卡 / Stripe / PayPal
            </span>
            <span className="block text-sm text-[var(--cocoa-soft)]">
              Card · Stripe · PayPal checkout
            </span>
            <span
              id="stripe-slot-note"
              className="mt-2 block text-xs leading-relaxed text-[var(--cocoa-soft)]/70"
            >
              {/* STRIPE_SLOT: add PaymentElement later; no PCI checkout in v1. */}
              v1 使用 Venmo / Zelle（及微信占位）。卡支付接口位已预留。
              v1 uses Venmo/Zelle (+ WeChat placeholder). Card slot reserved.
            </span>
          </span>
        </label>
      </div>
    </section>
  );
}

export { DELIVERY_ENABLED, CARD_PAYMENTS_ENABLED };
