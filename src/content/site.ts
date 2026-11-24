/**
 * ============================================================
 * EDITABLE SITE CONTENT — change brand / pickup / payments here
 * ============================================================
 * Brand rename: update `brand` (en + zh) and `tagline`.
 * Pickup: update `pickup` (weekday, window, location, notes).
 * Payment handles: update `payment` Venmo/Zelle/WeChat fields.
 */

export const site = {
  brand: {
    en: "Studio Bake",
    zh: "焙室",
    // Short mark shown in nav / confirmation receipts
    mark: "SB",
  },
  tagline: {
    zh: "手工面包与蛋糕，波士顿预约自取",
    en: "Handmade bread & cakes — scheduled pickup in Boston",
  },
  hero: {
    headlineZh: "慢慢发酵，准时取走",
    headlineEn: "Slow-fermented. Ready when you are.",
    supportZh: "两人小店，每周限量烘焙。先下单付款，再来自取。",
    supportEn: "A two-person bakery. Order ahead, pay to confirm, pick up on schedule.",
    ctaZh: "浏览本周菜单",
    ctaEn: "Browse this week’s menu",
  },
  about: {
    zh: "我们是波士顿附近的两人手工烘焙工作室。面团过夜发酵，蛋糕按单现做。目前以预约自取为主，暂不提供当日配送。",
    en: "We are a two-person handmade bakery serving Greater Boston. Dough rests overnight; cakes are baked to order. Pickup is our primary path — no same-day delivery for now.",
  },
  /**
   * Pickup schedule — sample defaults; edit freely.
   * Cambridge / Allston / Chinatown-area placeholders are intentional.
   */
  pickup: {
    weekdayZh: "周六",
    weekdayEn: "Saturday",
    windowZh: "下午 1:00–4:00",
    windowEn: "1:00–4:00 PM",
    locationZh: "剑桥 / Allston 交接点（下单后私信确认具体地址）",
    locationEn: "Cambridge / Allston meetup (exact spot confirmed after order)",
    areaNoteZh: "也可协调唐人街附近取货（需提前备注）",
    areaNoteEn: "Chinatown-area pickup can be arranged with a note",
    leadTimeZh: "请至少提前 2 天下单",
    leadTimeEn: "Please order at least 2 days ahead",
  },
  payment: {
    /**
     * v1: zero-monthly-fee — Venmo / Zelle primary for Boston;
     * WeChat Pay QR is a placeholder image slot.
     */
    venmo: "@StudioBake-Boston",
    zelle: "orders@studiobake.example",
    zelleName: "Studio Bake",
    wechatNoteZh: "微信收款码见确认页（占位图，可替换）",
    wechatNoteEn: "WeChat Pay QR on confirmation (placeholder — replace later)",
    depositPolicyZh:
      "取货前需完成付款承诺。鼓励全额 Venmo / Zelle；若已付定金，余款可到店结清。不鼓励仅现金取货。",
    depositPolicyEn:
      "Payment commitment is required before pickup is confirmed. Prefer full Venmo/Zelle. Remainder at pickup only if a deposit was paid. Cash-only at pickup is discouraged.",
  },
  contact: {
    wechatId: "StudioBake_Boston",
    email: "hello@studiobake.example",
  },
} as const;

export type SiteConfig = typeof site;
