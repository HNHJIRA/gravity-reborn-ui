"use client";
import { HeadingText } from "../ui/text/heading-text";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { benefitsData } from "@/mock/grooms-party";
import { BenefitCard } from "../ui/cards/benefit-card";

export default function TheGroomBenefits() {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <div className="flex flex-col items-center space-y-10">
            <div className="space-y-2">
              <EyebrowText text="Privileges" align="center" />
              <HeadingText title="Group" highlight="Benefits" align="center" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefitsData.map((item) => {
                const Icon = item.icon;
                return (
                  <BenefitCard
                    key={item.id}
                    icon={<Icon size={20} />}
                    title={item.title}
                    desc={item.desc}
                  />
                );
              })}
            </div>
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
