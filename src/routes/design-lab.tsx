import { createFileRoute } from "@tanstack/react-router";
import DesignLabStep from "@/components/design-lab/design-lab-step";
import BgBanner from "@/components/ui/banner/bg-banner";

export const Route = createFileRoute("/design-lab")({
  head: () => ({
    meta: [
      { title: "Design Lab — Royal Attire" },
      { name: "description", content: "Craft your vision. Every stitch, every detail curated to perfection." },
    ],
  }),
  component: DesignLab,
});

function DesignLab() {
  return (
    <>
      <BgBanner
        imageUrl="/images/banner/banner-shop.webp"
        eyebrow="Bespoke Couture"
        title="Design"
        highlight="Lab"
        description="Craft your visiom Every stitch, every detail curated to perfection."
      />
      <DesignLabStep />
    </>
  );
}
