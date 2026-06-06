import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export function TimelineItem({ side, num, title, desc }) {
  return (
    <div
      className={`flex w-full ${side === "right" ? "flex-row-reverse" : ""} relative items-center`}
    >
      <div
        className={`w-2/3 space-y-2 ${side === "left" ? "text-right pr-16 md:pr-32" : "text-left pl-16 md:pl-32"}`}
      >
        <HeadingText
          highlight={num}
          size="lg"
          className={`${side === "left" ? "text-right" : "text-left"}`}
        />
        <HeadingText title={title} size="sm" />
        <ParagraphText text={desc} className="text-white" size="sm" />
      </div>
      <div className="absolute left-[50%] -translate-x-1/2 w-3 h-3 border border-primary bg-transparent rotate-45 z-10" />
    </div>
  );
}
