import { Checkout } from "@/components/Checkout";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PickupAbout } from "@/components/PickupAbout";
import { ProductSections } from "@/components/ProductSections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductSections />
        <PickupAbout />
      </main>
      <Footer />
      <Checkout />
    </>
  );
}
