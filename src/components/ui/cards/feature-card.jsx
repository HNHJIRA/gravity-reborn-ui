import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export function FeatureCard({ image, number, title, desc }) {
  return (
    <>
      <div className="relative h-[360px] border border-white/20 cursor-pointer overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="flex flex-col h-full justify-center px-6 relative z-10 transition-opacity duration-500 group-hover:opacity-0">
          <span className="absolute top-0 right-0 text-8xl font-medium text-muted-foreground">
            {number}
          </span>
          <div className="space-y-6">
            <HeadingText title={title} size="sm" />
            <ParagraphText text={desc} className="max-w-xs" />
          </div>
        </div>
      </div>
    </>
  );
}
