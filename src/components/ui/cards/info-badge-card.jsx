import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export function InfoBadgeCard({ Icon, value, label }) {
  return (
    <div className="bg-[#0A0A0A80] w-full p-4 space-y-2 flex flex-col justify-center items-center border border-primary/20 backdrop-blur-md ">
      <Icon className="text-primary text-center" />
      <HeadingText title={value} className="text-xl!" />
      <ParagraphText text={label} size="sm" className="text-nowrap" />
    </div>
  );
}
