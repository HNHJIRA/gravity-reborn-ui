import { createFileRoute } from "@tanstack/react-router";
import HomeSchedule from "@/components/home/home-schedule";
import VirtualTryUpload from "@/components/virtual-try/upload/virual-try-upload";
import VirtualTryHero from "@/components/virtual-try/virtual-try-hero";

export const Route = createFileRoute("/virtual-try")({
  head: () => ({
    meta: [
      { title: "Virtual Try-On — Royal Attire" },
      { name: "description", content: "Experience our virtual try-on for bespoke attire." },
    ],
  }),
  component: VirtualTry,
});

function VirtualTry() {
  return (
    <>
      <VirtualTryHero />
      <VirtualTryUpload />
      <HomeSchedule />
    </>
  );
}
