import { partyInfoData, services } from "@/mock/grooms-party";
import { GroomsParyItems } from "../ui/items/grooms-pary-items";
import { InfoBadgeCard } from "../ui/cards/info-badge-card";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";

export default function HomeGroomsParty() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative h-[400px]">
            <div
              className="absolute inset-0 bg-cover shadow-2xl border border-white/10"
              style={{
                backgroundImage:
                  'url("/images/home/groom-party/groom-party-left.webp")',
              }}
            />
            <div className="absolute md:bottom-6 px-6 bg-gold w-full">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                {partyInfoData.map((item) => {
                  const IconComponent = item.Icon;
                  return (
                    <InfoBadgeCard
                      key={item.id}
                      Icon={IconComponent}
                      value={item.value}
                      label={item.label}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            <EyebrowText text="Coordinated Elegance" />
            <HeadingText title="Groom's" highlight="Party" />
            <ParagraphText
              text="Outfit your entire wedding party in coordinated luxury. From the
              groom to the groomsmen, we ensure every member looks
              distinguished while maintaining a cohesive aesthetic."
              size="md"
            />
            <div className="grid grid-cols-1 gap-4">
              {services.map((service, idx) => (
                <GroomsParyItems
                  key={idx}
                  title={service.title}
                  desc={service.desc}
                />
              ))}
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
