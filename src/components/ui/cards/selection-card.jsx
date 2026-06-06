import { Card } from "../card";
import { Check } from "lucide-react";
import { EyebrowText } from "../text/eye-brow-text";
import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export function SelectionCard({ title, sub, desc, img, active, onClick }) {
  return (
    <Card
      onClick={onClick}
      className={`relative group h-[450px] py-0 overflow-hidden cursor-pointer rounded-none border-2 ${active ? "border-primary" : "border-transparent"}`}
    >
      <div className="relative w-full h-full">
        <img
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
      {active && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-gold rounded-full flex items-center justify-center text-black">
          <Check size={14} strokeWidth={3} />
        </div>
      )}
      <div className="absolute bottom-6 left-6 right-6 space-y-2">
        <EyebrowText text={sub} className="text-white text-[10px]" />
        <HeadingText title={title} size="sm" />
        <ParagraphText text={desc} size="sm" />
      </div>
    </Card>
  );
}
