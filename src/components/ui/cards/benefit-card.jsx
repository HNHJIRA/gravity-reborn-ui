import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export function BenefitCard({ icon, title, desc }) {
  return (
    <div className="border border-white/20 p-8 flex md:flex-row flex-col gap-6">
      <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="space-y-3">
        <HeadingText title={title} size="sm" />
        <ParagraphText text={desc} size="sm" />
      </div>
    </div>
  );
}
