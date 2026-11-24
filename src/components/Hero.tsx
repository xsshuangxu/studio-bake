import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden"
      aria-label="Hero"
    >
      {/* Full-bleed bakery atmosphere */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=85"
          alt=""
          className="hero-media h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1410]/78 via-[#2a1f18]/45 to-[#2a1f18]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1410]/55 via-transparent to-[#1c1410]/25" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-24">
        <div className="max-w-xl text-[var(--paper)]">
          <p className="animate-rise font-display text-5xl leading-none tracking-tight md:text-7xl lg:text-8xl">
            <span className="block font-zh">{site.brand.zh}</span>
            <span className="mt-2 block text-[0.55em] font-normal tracking-[0.04em] text-[var(--flour)]/90">
              {site.brand.en}
            </span>
          </p>

          <h1 className="animate-rise-delay mt-8 font-zh text-2xl font-medium leading-snug text-[var(--flour)] md:text-3xl">
            {site.hero.headlineZh}
          </h1>
          <p className="mt-2 text-base text-[var(--flour)]/75 md:text-lg">
            {site.hero.headlineEn}
          </p>

          <p className="animate-rise-delay-2 mt-5 max-w-md text-sm leading-relaxed text-[var(--flour)]/80 md:text-base">
            <span className="font-zh">{site.hero.supportZh}</span>
            <span className="mt-1 block opacity-80">{site.hero.supportEn}</span>
          </p>

          <div className="animate-rise-delay-2 mt-9">
            <a href="#menu" className="btn-primary bg-[var(--butter)] text-[var(--ink)] hover:bg-[var(--butter-deep)] hover:text-[var(--paper)]">
              <span className="font-zh">{site.hero.ctaZh}</span>
              <span className="opacity-50">·</span>
              <span>{site.hero.ctaEn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
