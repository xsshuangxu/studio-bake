"use client";

import { useMemo, useState } from "react";
import { products, priceOf } from "@/content/products";
import { site } from "@/content/site";
import {
  formatPickupDate,
  makeOrderId,
  saveOrder,
  updateOrderStatus,
  upcomingPickupDates,
} from "@/lib/orders";
import type { Order } from "@/lib/types";
import { useCart } from "./CartProvider";
import { CARD_PAYMENTS_ENABLED, DELIVERY_ENABLED } from "./FutureSlots";

type Step = "cart" | "pickup" | "contact" | "confirm";

export function Checkout() {
  const {
    lines,
    setQty,
    remove,
    clear,
    total,
    checkoutOpen,
    setCheckoutOpen,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [pickupDate, setPickupDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wechat, setWechat] = useState("");
  const [note, setNote] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [paidClaimed, setPaidClaimed] = useState(false);

  const dates = useMemo(() => upcomingPickupDates(4), []);

  const lineDetails = lines
    .map((l) => {
      const p = products.find((x) => x.id === l.productId);
      if (!p) return null;
      return { ...l, product: p, lineTotal: priceOf(p) * l.quantity };
    })
    .filter(Boolean) as {
    productId: string;
    quantity: number;
    product: (typeof products)[0];
    lineTotal: number;
  }[];

  function close() {
    setCheckoutOpen(false);
    if (!order) {
      setStep("cart");
    }
  }

  function submitOrder() {
    const id = makeOrderId();
    const slotLabel = `${site.pickup.weekdayEn} ${site.pickup.windowEn}`;
    const next: Order = {
      id,
      createdAt: new Date().toISOString(),
      status: "awaiting_payment",
      lines: lines.map((l) => ({ ...l })),
      pickupDate,
      pickupSlotLabel: slotLabel,
      contact: { name, phone, wechat: wechat || undefined, note: note || undefined },
      total,
    };
    saveOrder(next);
    setOrder(next);
    setPaidClaimed(false);
    setStep("confirm");
    clear();
  }

  function copyId() {
    if (!order) return;
    void navigator.clipboard.writeText(order.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function markIvePaid() {
    if (!order) return;
    // Demo: customer claims payment; merchant can later flip status.
    // For demo UX we keep status as awaiting_payment until "merchant mark paid",
    // but record the claim in note via local flag.
    setPaidClaimed(true);
  }

  function merchantMarkPaid() {
    if (!order) return;
    const updated = updateOrderStatus(order.id, "paid");
    if (updated) setOrder({ ...updated });
  }

  if (!checkoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-[#1c1410]/45 backdrop-blur-[2px]"
        aria-label="Close checkout"
        onClick={close}
      />
      <aside className="checkout-panel relative flex h-full w-full max-w-md flex-col bg-[var(--paper)] animate-rise">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div>
            <p className="font-zh text-lg text-[var(--cocoa)]">下单自取</p>
            <p className="text-xs text-[var(--cocoa-soft)]/70">
              Order · scheduled pickup
            </p>
          </div>
          <button type="button" className="btn-ghost text-sm" onClick={close}>
            关闭 Close
          </button>
        </div>

        <div className="flex gap-2 border-b border-[var(--line)] px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--cocoa-soft)]/60">
          {(["cart", "pickup", "contact", "confirm"] as Step[]).map((s, i) => (
            <span
              key={s}
              className={step === s ? "text-[var(--butter-deep)]" : ""}
            >
              {i + 1}.{s === "cart" ? "选购" : s === "pickup" ? "取货" : s === "contact" ? "联系" : "付款"}
            </span>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "cart" && (
            <div className="space-y-4">
              {lineDetails.length === 0 ? (
                <p className="font-zh text-[var(--cocoa-soft)]">
                  购物车是空的。先去菜单加点面包吧。
                  <span className="mt-1 block text-sm opacity-75">
                    Your cart is empty — browse the menu to add items.
                  </span>
                </p>
              ) : (
                lineDetails.map(({ product, quantity, lineTotal }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 border-b border-[var(--line)] pb-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-zh text-[var(--cocoa)]">
                        {product.nameZh}
                      </p>
                      <p className="text-xs text-[var(--cocoa-soft)]">
                        {product.nameEn}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-[var(--line)]"
                          onClick={() => setQty(product.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-[var(--line)]"
                          onClick={() => setQty(product.id, quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-xs text-[var(--cocoa-soft)]/70"
                          onClick={() => remove(product.id)}
                        >
                          移除
                        </button>
                      </div>
                    </div>
                    <p className="font-display text-[var(--cocoa)]">
                      ${lineTotal.toFixed(0)}
                    </p>
                  </div>
                ))
              )}

              {/* Fulfillment mode — delivery disabled slot */}
              <div className="rounded-2xl border border-[var(--line)] bg-white/40 p-4 text-sm">
                <p className="font-zh text-[var(--cocoa)]">履约方式</p>
                <p className="text-xs text-[var(--cocoa-soft)]">Fulfillment</p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" checked readOnly />
                    <span>
                      预约自取 Pickup（{site.pickup.weekdayZh}{" "}
                      {site.pickup.windowZh}）
                    </span>
                  </label>
                  <label
                    className={`flex items-center gap-2 ${
                      DELIVERY_ENABLED ? "" : "slot-disabled"
                    }`}
                  >
                    <input type="radio" disabled={!DELIVERY_ENABLED} />
                    <span>
                      快递配送 Delivery
                      {!DELIVERY_ENABLED && " — 即将推出"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === "pickup" && (
            <div className="space-y-4">
              <p className="font-zh text-[var(--cocoa)]">
                选择取货日期
                <span className="mt-1 block text-sm font-normal text-[var(--cocoa-soft)]">
                  Choose a Saturday pickup date ({site.pickup.windowEn})
                </span>
              </p>
              <div className="space-y-2">
                {dates.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPickupDate(d)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      pickupDate === d
                        ? "border-[var(--butter)] bg-[var(--butter)]/15"
                        : "border-[var(--line)] bg-white/40"
                    }`}
                  >
                    <span className="font-zh">{formatPickupDate(d, "zh")}</span>
                    <span className="mt-0.5 block text-xs text-[var(--cocoa-soft)]">
                      {formatPickupDate(d, "en")} · {site.pickup.windowEn}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-[var(--cocoa-soft)]">
                {site.pickup.locationZh}
                <br />
                {site.pickup.locationEn}
              </p>
            </div>
          )}

          {step === "contact" && (
            <div className="space-y-4">
              <p className="font-zh text-[var(--cocoa)]">
                联系方式
                <span className="mt-1 block text-sm font-normal text-[var(--cocoa-soft)]">
                  Contact for pickup confirmation
                </span>
              </p>
              <label className="block text-sm">
                <span className="text-[var(--cocoa-soft)]">姓名 Name *</span>
                <input
                  className="input-field mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--cocoa-soft)]">手机 Phone *</span>
                <input
                  className="input-field mt-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--cocoa-soft)]">
                  微信 WeChat（可选）
                </span>
                <input
                  className="input-field mt-1"
                  value={wechat}
                  onChange={(e) => setWechat(e.target.value)}
                  placeholder={site.contact.wechatId}
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--cocoa-soft)]">备注 Note</span>
                <textarea
                  className="input-field mt-1 min-h-[80px] resize-y"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="唐人街取货 / allergies / etc."
                />
              </label>
            </div>
          )}

          {step === "confirm" && order && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[var(--cocoa)] p-5 text-[var(--flour)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--butter)]">
                  订单已提交 · Awaiting payment
                </p>
                <p className="mt-2 font-display text-3xl">{order.id}</p>
                <p className="mt-1 text-sm text-[var(--flour)]/70">
                  状态 Status:{" "}
                  {order.status === "paid" ? "已付款 Paid" : "待付款 Awaiting payment"}
                </p>
                <p className="mt-3 font-display text-2xl">
                  ${order.total.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-[var(--flour)]/75">
                  {formatPickupDate(order.pickupDate, "zh")} ·{" "}
                  {site.pickup.windowZh}
                </p>
              </div>

              <div className="space-y-3 text-sm text-[var(--cocoa)]">
                <p className="font-zh font-medium">请完成付款以确认取货名额</p>
                <p className="text-[var(--cocoa-soft)]">
                  Pay via Venmo or Zelle (primary in Boston). Include your order
                  ID in the memo.
                </p>
                <ul className="space-y-2 rounded-2xl border border-[var(--line)] bg-white/50 p-4">
                  <li>
                    <strong>Venmo</strong> {site.payment.venmo}
                  </li>
                  <li>
                    <strong>Zelle</strong> {site.payment.zelle}（
                    {site.payment.zelleName}）
                  </li>
                  <li className="pt-2">
                    <strong>微信支付 WeChat Pay</strong>
                    <span className="mt-2 flex h-28 w-28 items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-[var(--mist)] text-center text-[10px] text-[var(--cocoa-soft)]">
                      QR 占位
                      <br />
                      Replace me
                    </span>
                    <span className="mt-1 block text-xs text-[var(--cocoa-soft)]">
                      {site.payment.wechatNoteZh}
                    </span>
                  </li>
                </ul>

                {/* STRIPE_SLOT — disabled in v1 */}
                <button
                  type="button"
                  disabled={!CARD_PAYMENTS_ENABLED}
                  className={`btn-ghost w-full justify-center text-sm ${
                    CARD_PAYMENTS_ENABLED ? "" : "slot-disabled"
                  }`}
                >
                  信用卡支付（即将推出）· Card checkout soon
                </button>

                <p className="text-xs leading-relaxed text-[var(--cocoa-soft)]">
                  {site.payment.depositPolicyZh}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn-ghost w-full justify-center"
                  onClick={copyId}
                >
                  {copied ? "已复制 Copied" : "复制订单号 Copy order ID"}
                </button>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={markIvePaid}
                >
                  {paidClaimed
                    ? "已标记「我已付款」· Claimed"
                    : "我已付款 I’ve paid"}
                </button>
                {paidClaimed && order.status !== "paid" && (
                  <p className="text-xs text-[var(--sage)]">
                    感谢！店主核对到账后会确认取货。Thank you — we confirm
                    pickup after payment clears.
                  </p>
                )}
                {/* Simple merchant demo control */}
                <button
                  type="button"
                  className="mt-2 text-left text-xs text-[var(--cocoa-soft)]/60 underline"
                  onClick={merchantMarkPaid}
                >
                  店主演示：标记已收款 · Merchant demo: mark paid
                </button>
                {order.status === "paid" && (
                  <p className="font-zh text-sm text-[var(--sage)]">
                    ✓ 付款已确认，取货名额已锁定。Payment confirmed — pickup
                    reserved.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {step !== "confirm" && (
          <div className="border-t border-[var(--line)] px-5 py-4">
            <div className="mb-3 flex justify-between font-display text-lg text-[var(--cocoa)]">
              <span>合计 Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              {step !== "cart" && (
                <button
                  type="button"
                  className="btn-ghost flex-1 justify-center"
                  onClick={() =>
                    setStep(step === "contact" ? "pickup" : "cart")
                  }
                >
                  上一步 Back
                </button>
              )}
              {step === "cart" && (
                <button
                  type="button"
                  className="btn-primary flex-1"
                  disabled={lines.length === 0}
                  onClick={() => setStep("pickup")}
                >
                  下一步 · Pickup
                </button>
              )}
              {step === "pickup" && (
                <button
                  type="button"
                  className="btn-primary flex-1"
                  disabled={!pickupDate}
                  onClick={() => setStep("contact")}
                >
                  下一步 · Contact
                </button>
              )}
              {step === "contact" && (
                <button
                  type="button"
                  className="btn-primary flex-1"
                  disabled={!name.trim() || !phone.trim() || total <= 0}
                  onClick={submitOrder}
                >
                  提交订单 Submit
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
