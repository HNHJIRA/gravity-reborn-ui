import { features } from "@/mock/feature-data";
import { FeatureCard } from "../ui/cards/feature-card";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";

export default function HomeFeatures() {
  return (
    <SectionWrapper>
      <ContainerWrapper className="space-y-8">
        <div className="text-center">
          <HeadingText title="Our" highlight="Best Feature" align="center" />
          <div className="w-24 h-1 bg-gradient-gold mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              image={feature.image}
              title={feature.title}
              number={feature.number}
              desc={feature.desc}
            />
          ))}
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
