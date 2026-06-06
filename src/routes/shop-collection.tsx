import { createFileRoute } from "@tanstack/react-router";
import HomeSchedule from "@/components/home/home-schedule";
import ShopCollectionTabs from "@/components/shop-collection/shop-collection-tabs";
import BgBanner from "@/components/ui/banner/bg-banner";

export const Route = createFileRoute("/shop-collection")({
  head: () => ({
    meta: [
      { title: "Shop Collection — Royal Attire" },
      { name: "description", content: "Discover our curated selection of bespoke bridal and groom couture." },
    ],
  }),
  component: ShopCollection,
});

function ShopCollection() {
  return (
    <>
      <BgBanner
        imageUrl="/images/banner/banner-shop.webp"
        eyebrow="Exquisite Craftsmanship"
        title="Shop"
        highlight="Collection"
        description="Discover our curated selection of bespoke bridal and groom couture, where tradition meets contemporary elegance."
      />
      <ShopCollectionTabs />
      <HomeSchedule />
    </>
  );
}
