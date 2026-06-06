import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { ParagraphText } from "../text/paragraph-text";
import { HeadingText } from "../text/heading-text";

export function ArticlesCard({ img, cat, date, read, title }) {
  return (
    <>
      <div className="group space-y-4">
        <div className="relative overflow-hidden aspect-video border border-zinc-900 group">
          <Image
            src={img}
            alt={cat}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span className="absolute top-3 left-3 bg-black/60 border border-primary text-[8px] px-2 py-1 tracking-widest">
            {cat}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <ParagraphText text={date} size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <ParagraphText text={`${read} read`} size="sm" />
          </div>
        </div>
        <HeadingText title={title} className="text-xl!" />
        <ParagraphText text="Master the art of blending traditional heritage with  contemporary flair for the modern era." />
        <div className="w-10 h-px bg-primary" />
      </div>
    </>
  );
}
