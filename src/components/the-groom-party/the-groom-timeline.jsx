"use client";
import { HeadingText } from "../ui/text/heading-text";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { ParagraphText } from "../ui/text/paragraph-text";
import { TimelineItem } from "../ui/items/time-line-item";
import { timelineData } from "@/mock/grooms-party";

export default function TheGroomTimeLine() {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <div className="flex flex-col items-center space-y-10">
            <div className="space-y-2">
              <EyebrowText text="The Process" align="center" />
              <HeadingText
                title="Planning Made"
                highlight="Easy"
                align="center"
              />
              <ParagraphText
                text="Four simple steps to a perfectly styled groom's party."
                className="text-white"
              />
            </div>
            <div className="max-w-xl mx-auto relative flex flex-col gap-20">
              <div className="absolute left-[50%] top-0 bottom-0 w-px bg-zinc-800" />
              {timelineData.map((item) => (
                <TimelineItem
                  key={item.id}
                  side={item.side}
                  num={item.num}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
