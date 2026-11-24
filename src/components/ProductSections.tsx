"use client";

import { categories, products, type CategoryId } from "@/content/products";
import { ProductTile } from "./ProductTile";

function SectionBlock({ id }: { id: CategoryId }) {
  const meta = categories.find((c) => c.id === id)!;
  const items = products.filter((p) => p.category === id);

  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <div className="mb-8 max-w-2xl md:mb-10">
        <h3 className="font-display text-3xl text-[var(--cocoa)] md:text-4xl">
          <span className="font-zh">{meta.zh}</span>
          <span className="ml-3 text-[0.55em] font-normal tracking-wide text-[var(--cocoa-soft)]/70">
            {meta.en}
          </span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--cocoa-soft)] md:text-base">
          <span className="font-zh">{meta.blurbZh}</span>
          <span className="mt-1 block opacity-75">{meta.blurbEn}</span>
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductTile key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function ProductSections() {
  return (
    <div id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-5 md:px-8">
      <div className="border-b border-[var(--line)] pb-10 pt-16 md:pb-14 md:pt-24">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--butter-deep)]">
          本周菜单 · This week
        </p>
        <h2 className="mt-3 font-display text-4xl text-[var(--cocoa)] md:text-5xl">
          <span className="font-zh">精选烘焙</span>
        </h2>
        <p className="mt-3 max-w-xl text-[var(--cocoa-soft)]">
          Selected handmade breads, cakes, and limited runs — add to your
          Saturday pickup order.
        </p>
      </div>

      <SectionBlock id="classic" />
      <SectionBlock id="rnd" />
      <SectionBlock id="seasonal" />
      <SectionBlock id="promo" />
    </div>
  );
}
