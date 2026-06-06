import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import BgOverlay from "../ui/overlay/bg-overlay";
import { steps } from "@/mock/design-lab";
import { DesingLabItems } from "../ui/items/desing-lab-items";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";

export default function HomeDesignLab() {
  return (
    <SectionWrapper>
      <ContainerWrapper className="relative">
        <BgOverlay
          imageUrl="/images/home/design-lab/bg-design-lab.png"
          overlayClass="bg-black/60"
          className="border border-primary rounded-3xl overflow-hidden"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-10">
          <div className="z-10 space-y-4">
            <EyebrowText text="Bespoke Experience" />
            <HeadingText title="The" highlight="Design Lab" />
            <ParagraphText
              text="Create your dream wedding attire with our bespoke tailoring
              service. From fabric selection to the final stitch, every detail is
              crafted to your exact specifications by master artisans."
              className="text-white"
              size="md"
            />
            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, idx) => (
                <DesingLabItems
                  key={idx}
                  idx={idx}
                  icon={step.icon}
                  title={step.title}
                  desc={step.desc}
                />
              ))}
            </div>
            <Button
              variant="gold"
              size="md"
              className="px-10 h-12 text-md"
              bgImage="/images/disco.webp"
            >
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative md:h-[600px] h-[400px] w-full border border-white/10 p-4">
            <div className="relative w-full h-full transition-all duration-700">
              <Image
                src="/images/home/design-lab/design-lab-right.webp"
                alt="Tailoring Process"
                fill
                className="object-cover"
              />
              <div className="absolute -top-10 -right-10 bg-gradient-black border border-primary/30 p-4 max-w-xs space-y-2">
                <Sparkles className="text-primary" />
                <ParagraphText
                  text="AI-Powered"
                  className="text-white"
                  size="sm"
                />
                <ParagraphText
                  text="Try-On"
                  className="text-primary"
                  size="sm"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-gradient-black border border-primary/30 p-4 max-w-xs space-y-2">
                <ParagraphText
                  text="Premium Fabrics"
                  className="text-primary"
                  size="sm"
                />
                <ParagraphText text="200+" className="text-white" size="sm" />
                <ParagraphText
                  text="Exclusive Options"
                  className="text-white"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
