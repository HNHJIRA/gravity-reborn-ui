import { Check } from "lucide-react";
import { Card } from "../card";
import { HeadingText } from "../text/heading-text";
import { EyebrowText } from "../text/eye-brow-text";
import { ParagraphText } from "../text/paragraph-text";

export function EmbroideryCard({ title, sub, active, onClick }) {
  return (
    <Card
      onClick={onClick}
      className={`p-0 border-2 flex flex-col items-start gap-4 rounded-none cursor-pointer ${active ? "border-primary" : "border-zinc-900"}`}
    >
      <div className="w-full aspect-video bg-zinc-900/50 rounded flex items-center justify-center border border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${active ? "bg-gradient-gold" : "bg-zinc-700"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between w-full items-center">
          <HeadingText title={title} size="sm" />
          {active && (
            <div className="w-6 h-6 bg-gradient-gold rounded-full flex items-center justify-center text-black">
              <Check size={14} strokeWidth={3} />
            </div>
          )}
        </div>
        <EyebrowText text={sub} className="text-xs text-white" />
        <ParagraphText text="Subtle threadwork along collar, cuffs, and  Clean lines with whispered luxury." />
        <div className="w-full h-px bg-zinc-900 my-2" />
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <ParagraphText text="Coverage" className="text-xs" size="sm" />
            <ParagraphText text="5–10%" className="text-xs" size="sm" />
          </div>
          <div className="flex flex-col gap-2">
            <ParagraphText text="Craft Time:" className="text-xs" size="sm" />
            <ParagraphText text="300+ Hours" className="text-xs" size="sm" />
          </div>
        </div>
      </div>
    </Card>
  );
}
