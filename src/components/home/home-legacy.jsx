import { stats } from "@/mock/legacy";
import { Link } from "@tanstack/react-router";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";

export default function HomeLegacy() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-4">
            <EyebrowText text="Our Story" />
            <HeadingText title="A Legacy of" highlight="Craftsmanship" />
            <div className="w-24 h-0.5 bg-gradient-gold" />
            <ParagraphText
              text="For three generations, Maharaja has been the cornerstone of
              South Asian wedding fashion. What began as a humble tailoring
              house in Jaipur has evolved into a global destination for
              discerning couples seeking the pinnacle of sartorial excellence."
              size="md"
            />
            <ParagraphText
              text="Our master artisans carry forward centuries-old techniques, from
              intricate zardozi embroidery to hand-woven silk brocades,
              ensuring each piece is not just clothing, but a work of art."
              size="md"
            />
            <div className="grid grid-cols-3 gap-8 py-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-primary text-4xl mb-2">{stat.number}</h4>
                  <ParagraphText text={stat.label} size="md" />
                </div>
              ))}
            </div>
            <div>
              <Link
                href="#"
                className="text-primary hover:text-muted-foreground transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                Discover Our Heritage &rarr;
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[600px] w-full">
            <div className="relative w-full h-full z-10 p-4">
              <img
                src="/images/home/legacy/legacy-right.webp"
                alt="Master Craftsman"
                fill
                className="object-cover "
              />
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
