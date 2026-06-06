import { createFileRoute } from "@tanstack/react-router";
import HomeSchedule from "@/components/home/home-schedule";
import TheGroomBenefits from "@/components/the-groom-party/the-groom-benefits";
import TheGroomCard from "@/components/the-groom-party/the-groom-card";
import TheGroomTimeLine from "@/components/the-groom-party/the-groom-timeline";
import BgBanner from "@/components/ui/banner/bg-banner";

export const Route = createFileRoute("/the-groom-party")({
  head: () => ({
    meta: [
      { title: "The Groom's Party — Royal Attire" },
      { name: "description", content: "Coordinated luxury tailoring and bespoke styling for your entire entourage." },
    ],
  }),
  component: TheGroomParty,
});

function TheGroomParty() {
  return (
    <>
      <BgBanner
        imageUrl="/images/banner/banner-shop.webp"
        eyebrow="EXCLUSIVE EXPERIENCE"
        title="The"
        highlight="Groom's Party"
        description="Curate a distinguished look for your entireentourage. Coordinated luxury tailoring, bespoke styling, and an unforgettable experience for every gentleman in your celebration."
      />
      <TheGroomCard />
      <TheGroomBenefits />
      <TheGroomTimeLine />
      <HomeSchedule />
    </>
  );
}
