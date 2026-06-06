import { stats } from "@/mock/legacy";
import Image from "next/image";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";

export default function HomeCraftingDream() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-4">
            <EyebrowText text="Our Legacy" />
            <HeadingText
              title="Crafting Dreams Into"
              highlight="Timeless Elegance"
            />
            <div className="w-24 h-0.5 bg-gradient-gold" />
            <ParagraphText
              text="Founded in the heart of tradition, Royal Atelier has been the custodian of
              bridal and groom couture for over seven decades. Our atelier stands as a
              testament to the enduring art of handcrafted luxury—where every stitch
              carries the weight of heritage and every garment tells a story of love."
              size="md"
            />
            <ParagraphText
              text="From the intricate zardozi embroidery of our sherwanis to the delicate hand-
              beading of our bridal lehengas, each creation emerges from the skilled hands
              of master artisans who have inherited their craft through generations."
              size="md"
            />
            <ParagraphText
              text="We don't merely dress you for a day—we clothe you in legacy."
              size="xl"
              className="italic text-primary"
            />
            <div className="grid grid-cols-3 gap-8 py-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-primary text-4xl mb-2">{stat.number}</h4>
                  <ParagraphText text={stat.label} size="md" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[560px]">
              <Image
                src="/images/home/crafting-dream/dream1.webp"
                alt="Master Craftsman"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-6 -left-10 w-48 h-64">
              <Image
                src="/images/home/crafting-dream/dream2.webp"
                alt="Master Craftsman"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
