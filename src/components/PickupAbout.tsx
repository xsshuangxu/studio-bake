import { site } from "@/content/site";
import { FutureSlots } from "./FutureSlots";

export function PickupAbout() {
  const p = site.pickup;

  return (
    <>
      <section
        id="pickup"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--butter-deep)]">
              取货 · Pickup
            </p>
            <h2 className="mt-3 font-display text-4xl text-[var(--cocoa)] md:text-5xl">
              <span className="font-zh">固定时间，当面取走</span>
            </h2>
            <p className="mt-4 max-w-lg text-[var(--cocoa-soft)]">
              <span className="font-zh">每周固定时段预约自取，取货前请先完成付款确认。</span>
              <span className="mt-1 block">
                Scheduled Saturday window — pay first to confirm your pickup
                spot.
              </span>
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white/40 p-6 backdrop-blur-sm md:p-8">
            <dl className="space-y-5 text-[var(--cocoa)]">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--cocoa-soft)]/70">
                  时间 Time
                </dt>
                <dd className="mt-1 font-zh text-xl">
                  {p.weekdayZh} {p.windowZh}
                </dd>
                <dd className="text-sm text-[var(--cocoa-soft)]">
                  {p.weekdayEn} {p.windowEn}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--cocoa-soft)]/70">
                  地点 Place
                </dt>
                <dd className="mt-1 font-zh text-lg leading-snug">
                  {p.locationZh}
                </dd>
                <dd className="mt-1 text-sm text-[var(--cocoa-soft)]">
                  {p.locationEn}
                </dd>
                <dd className="mt-2 text-sm text-[var(--sage)]">
                  {p.areaNoteZh} / {p.areaNoteEn}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--cocoa-soft)]/70">
                  提前 Lead time
                </dt>
                <dd className="mt-1 font-zh">{p.leadTimeZh}</dd>
                <dd className="text-sm text-[var(--cocoa-soft)]">
                  {p.leadTimeEn}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-[var(--line)] bg-[var(--cocoa)] text-[var(--flour)]"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              <span className="font-zh">关于焙室</span>
              <span className="mt-2 block text-lg tracking-wide text-[var(--flour)]/70">
                About {site.brand.en}
              </span>
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-[var(--flour)]/85">
            <p className="font-zh text-lg">{site.about.zh}</p>
            <p>{site.about.en}</p>
            <p className="pt-2 text-sm text-[var(--butter)]">
              {site.payment.depositPolicyZh}
            </p>
            <p className="text-sm text-[var(--flour)]/65">
              {site.payment.depositPolicyEn}
            </p>
          </div>
        </div>
      </section>

      <FutureSlots />
    </>
  );
}
