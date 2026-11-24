export type CategoryId = "classic" | "rnd" | "seasonal" | "promo";

export type Product = {
  id: string;
  nameZh: string;
  nameEn: string;
  descZh: string;
  descEn: string;
  price: number;
  promoPrice?: number;
  category: CategoryId;
  tags: string[];
  /** CSS gradient fallback + optional image URL */
  image: string;
  accent: string;
};

export const categories: {
  id: CategoryId;
  zh: string;
  en: string;
  blurbZh: string;
  blurbEn: string;
}[] = [
  {
    id: "classic",
    zh: "日常经典",
    en: "Everyday classics",
    blurbZh: "常备面包与蛋糕，适合每周自取。",
    blurbEn: "Breads and cakes we bake most weeks.",
  },
  {
    id: "rnd",
    zh: "新品试做",
    en: "New & R&D",
    blurbZh: "最近研发的口味，数量有限。",
    blurbEn: "Recently developed recipes — limited runs.",
  },
  {
    id: "seasonal",
    zh: "季节节日",
    en: "Seasonal & holiday",
    blurbZh: "应节主题，跟着节日换菜单。",
    blurbEn: "Festival themes that rotate with the calendar.",
  },
  {
    id: "promo",
    zh: "优惠团购",
    en: "Promotions",
    blurbZh: "特价与团购（团购），适合分享。",
    blurbEn: "Sale prices and group-buy (团购) packs.",
  },
];

export const products: Product[] = [
  {
    id: "sourdough-country",
    nameZh: "乡村酸种面包",
    nameEn: "Country sourdough",
    descZh: "过夜自然发酵，外脆内软，适合配黄油或汤。",
    descEn: "Overnight natural leaven — crackly crust, open crumb.",
    price: 12,
    category: "classic",
    tags: ["面包", "Bread"],
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
    accent: "#8B6914",
  },
  {
    id: "milk-brioche",
    nameZh: "北海道牛奶吐司",
    nameEn: "Hokkaido milk loaf",
    descZh: "柔软奶香，切片即食或做法式吐司。",
    descEn: "Pillowy milk bread — toast it or tear and share.",
    price: 14,
    category: "classic",
    tags: ["面包", "Bread"],
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    accent: "#C4A484",
  },
  {
    id: "matcha-roll",
    nameZh: "宇治抹茶卷",
    nameEn: "Uji matcha roll",
    descZh: "轻盈蛋糕卷，淡抹茶与奶油夹心。",
    descEn: "Soft sponge rolled with matcha cream.",
    price: 28,
    category: "classic",
    tags: ["蛋糕", "Cake"],
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
    accent: "#5C6B4A",
  },
  {
    id: "chocolate-ganache",
    nameZh: "苦甜巧克力甘纳许蛋糕",
    nameEn: "Bittersweet ganache cake",
    descZh: "浓郁可可，适合小聚会分享（约 6 寸）。",
    descEn: "Deep cocoa, ~6-inch — made for small gatherings.",
    price: 42,
    category: "classic",
    tags: ["蛋糕", "Cake"],
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    accent: "#3D2314",
  },
  {
    id: "black-sesame-cookie",
    nameZh: "黑芝麻黄油曲奇（盒）",
    nameEn: "Black sesame butter cookies",
    descZh: "一盒 8 片，芝麻香与黄油层次分明。",
    descEn: "Box of 8 — toasted sesame meets cultured butter.",
    price: 16,
    category: "classic",
    tags: ["点心", "Cookies"],
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    accent: "#4A3728",
  },
  {
    id: "yuzu-financier",
    nameZh: "柚子费南雪",
    nameEn: "Yuzu financiers",
    descZh: "杏仁粉胚体，柚子皮香气清亮（6 枚）。",
    descEn: "Almond batter brightened with yuzu zest (6 pcs).",
    price: 18,
    category: "rnd",
    tags: ["新品", "R&D"],
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    accent: "#D4A017",
  },
  {
    id: "miso-caramel-bun",
    nameZh: "味噌焦糖肉桂卷",
    nameEn: "Miso caramel cinnamon bun",
    descZh: "咸甜味噌焦糖，试做限量。",
    descEn: "Salty-sweet miso caramel — limited R&D bake.",
    price: 7,
    category: "rnd",
    tags: ["新品", "R&D"],
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80",
    accent: "#A67B5B",
  },
  {
    id: "earl-grey-tart",
    nameZh: "伯爵茶柠檬挞",
    nameEn: "Earl Grey lemon tart",
    descZh: "茶香奶油与柠檬凝乳，新配方。",
    descEn: "Tea-infused cream over lemon curd — new formula.",
    price: 9,
    category: "rnd",
    tags: ["新品", "Tart"],
    image:
      "https://images.unsplash.com/photo-1464305795204-b18ebe11b1f6?w=800&q=80",
    accent: "#6B7B3A",
  },
  {
    id: "lunar-osmanthus",
    nameZh: "桂花年糕小方",
    nameEn: "Osmanthus nian gao squares",
    descZh: "节日限定：桂花香糯米糕，适合分享。",
    descEn: "Festival limited: fragrant osmanthus sticky-rice squares.",
    price: 24,
    category: "seasonal",
    tags: ["节日", "Holiday"],
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e343?w=800&q=80",
    accent: "#C9A227",
  },
  {
    id: "red-bean-mooncake",
    nameZh: "手工红豆月饼（4 枚）",
    nameEn: "Handmade red bean mooncakes (4)",
    descZh: "中秋主题，酥皮红豆馅，小份装。",
    descEn: "Mid-Autumn theme — flaky crust, red bean filling.",
    price: 32,
    category: "seasonal",
    tags: ["节日", "Holiday"],
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    accent: "#8B4513",
  },
  {
    id: "spring-blossom-cake",
    nameZh: "樱花奶油小蛋糕",
    nameEn: "Sakura cream petit gateau",
    descZh: "春日限定：淡粉色奶油与樱花盐。",
    descEn: "Spring limited: soft pink cream and sakura salt.",
    price: 11,
    category: "seasonal",
    tags: ["季节", "Seasonal"],
    image:
      "https://images.unsplash.com/photo-1464349095439-eebde19e1a35?w=800&q=80",
    accent: "#D4A5A5",
  },
  {
    id: "group-brioche-pack",
    nameZh: "牛奶吐司团购装（3 条）",
    nameEn: "Milk loaf group-buy (3 loaves)",
    descZh: "团购特价，适合办公室或家庭分享。",
    descEn: "团购 deal — office or family share pack.",
    price: 42,
    promoPrice: 36,
    category: "promo",
    tags: ["团购", "Sale"],
    image:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=800&q=80",
    accent: "#B8860B",
  },
  {
    id: "cookie-duo-sale",
    nameZh: "曲奇双盒特惠",
    nameEn: "Cookie duo sale",
    descZh: "黑芝麻 + 原味黄油曲奇各一盒。",
    descEn: "One black sesame + one plain butter cookie box.",
    price: 32,
    promoPrice: 26,
    category: "promo",
    tags: ["特价", "Sale"],
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    accent: "#8B7355",
  },
  {
    id: "weekend-sampler",
    nameZh: "周末尝鲜组合",
    nameEn: "Weekend sampler box",
    descZh: "酸种半条 + 费南雪 3 枚 + 曲奇 4 片。",
    descEn: "Half sourdough + 3 financiers + 4 cookies.",
    price: 28,
    promoPrice: 22,
    category: "promo",
    tags: ["特价", "Bundle"],
    image:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
    accent: "#A0522D",
  },
];

export function priceOf(p: Product): number {
  return p.promoPrice ?? p.price;
}
