"use client";
import { silhouettes } from "@/mock/design-lab";
import { SelectionCard } from "../ui/cards/selection-card";
import { ParagraphText } from "../ui/text/paragraph-text";
import { HeadingText } from "../ui/text/heading-text";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";

export default function TheGroomCard() {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <div className="flex flex-col items-center space-y-10">
            <div className="space-y-2 md:max-w-xl">
              <HeadingText highlight="Coordinated Styling" align="center" />
              <ParagraphText
                text="Every member of your party, styled in harmony. From matching fabrics
                to complementary silhouettes — perfection in every detail."
                className="text-white"
                align="center"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {silhouettes.map((s) => (
                <SelectionCard
                  key={s.id}
                  active={false}
                  onClick={() => {}}
                  {...s}
                />
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
