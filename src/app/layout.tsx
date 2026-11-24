import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Outfit, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "焙室 Studio Bake — 波士顿手工烘焙预约自取",
  description:
    "两人手工烘焙工作室：面包、蛋糕与季节限定。波士顿预约自取，Venmo / Zelle 付款确认。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const bodyStyle = {
    "--font-display": "var(--font-fraunces), var(--font-noto-serif), serif",
    "--font-body": "var(--font-outfit), var(--font-noto-sans), sans-serif",
    "--font-zh": "var(--font-noto-sans), var(--font-outfit), sans-serif",
  } as CSSProperties;

  return (
    <html
      lang="zh-Hans"
      className={`${fraunces.variable} ${outfit.variable} ${notoSans.variable} ${notoSerif.variable}`}
    >
      <body style={bodyStyle}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
