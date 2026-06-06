import { createFileRoute } from "@tanstack/react-router";
import HomeHero from "@/components/home/home-hero";
import HomeFilterByEvent from "@/components/home/home-filter-by-event";
import HomeFeatures from "@/components/home/home-features";
import HomeDesignLab from "@/components/home/home-design-lab";
import HomeGroomsParty from "@/components/home/home-grooms-party";
import HomeVirtualTryOn from "@/components/home/home-virtual-tryOn";
import HomeLegacy from "@/components/home/home-legacy";
import HomeSchedule from "@/components/home/home-schedule";
import HomeCraftingDream from "@/components/home/home-crafting-dream";
import HomeFaq from "@/components/home/home-faq";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HomeHero />
      <HomeFilterByEvent />
      <HomeFeatures />
      <HomeDesignLab />
      <HomeGroomsParty />
      <HomeVirtualTryOn />
      <HomeLegacy />
      <HomeCraftingDream />
      <HomeFaq />
      <HomeSchedule />
    </>
  );
}
