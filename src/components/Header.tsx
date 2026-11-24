"use client";

import { site } from "@/content/site";
import { useCart } from "./CartProvider";

export function Header() {
  const { count, setCheckoutOpen } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="group flex items-baseline gap-2 rounded-full bg-white/50 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="font-display text-xl tracking-tight text-[var(--cocoa)] md:text-2xl">
            {site.brand.zh}
          </span>
          <span className="text-sm text-[var(--cocoa-soft)]/70 group-hover:text-[var(--cocoa)]">
            {site.brand.en}
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-[var(--cocoa-soft)] md:flex">
          <a href="#menu" className="hover:text-[var(--cocoa)]">
            菜单 Menu
          </a>
          <a href="#pickup" className="hover:text-[var(--cocoa)]">
            自取 Pickup
          </a>
          <a href="#about" className="hover:text-[var(--cocoa)]">
            关于 About
          </a>
        </nav>

        <button
          type="button"
          className="btn-ghost text-sm"
          onClick={() => setCheckoutOpen(true)}
          aria-label="Open cart"
        >
          <span className="font-zh">订单</span>
          <span className="text-[var(--cocoa-soft)]/60">/</span>
          <span>Order</span>
          {count > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--cocoa)] px-1.5 text-xs text-[var(--paper)]">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
