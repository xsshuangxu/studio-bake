"use client";

import type { Product } from "@/content/products";
import { useCart } from "./CartProvider";

export function ProductTile({ product }: { product: Product }) {
  const { add, setCheckoutOpen } = useCart();
  const hasPromo =
    product.promoPrice != null && product.promoPrice < product.price;

  return (
    <article className="product-tile group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--flour)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`${product.nameZh} / ${product.nameEn}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            background: `linear-gradient(135deg, ${product.accent}, transparent 60%)`,
          }}
        />
      </div>

      <div className="px-1 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] uppercase tracking-[0.14em] text-[var(--cocoa-soft)]/65"
            >
              {t}
            </span>
          ))}
        </div>

        <h4 className="mt-2 font-zh text-lg font-medium text-[var(--cocoa)]">
          {product.nameZh}
        </h4>
        <p className="text-sm text-[var(--cocoa-soft)]/80">{product.nameEn}</p>

        <p className="mt-2 text-sm leading-relaxed text-[var(--cocoa-soft)]">
          <span className="font-zh">{product.descZh}</span>
          <span className="mt-1 block text-[13px] opacity-75">
            {product.descEn}
          </span>
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="font-display text-xl text-[var(--cocoa)]">
            {hasPromo ? (
              <>
                <span className="text-[var(--butter-deep)]">
                  ${product.promoPrice!.toFixed(0)}
                </span>
                <span className="ml-2 text-sm text-[var(--cocoa-soft)]/50 line-through">
                  ${product.price.toFixed(0)}
                </span>
              </>
            ) : (
              <span>${product.price.toFixed(0)}</span>
            )}
          </div>

          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={() => {
              add(product.id, 1);
              setCheckoutOpen(true);
            }}
          >
            加入 · Add
          </button>
        </div>
      </div>
    </article>
  );
}
