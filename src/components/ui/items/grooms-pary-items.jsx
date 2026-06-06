import React from "react";
import { ParagraphText } from "../text/paragraph-text";
import { HeadingText } from "../text/heading-text";

export function GroomsParyItems({ title, desc }) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-4 text-primary border border-primary/20 rounded-full bg-muted">
          <div className="w-3 h-3 rounded-full bg-gradient-gold" />
        </div>
        <div>
          <HeadingText highlight={title} className="text-2xl!" />
          <ParagraphText text={desc} size="md" />
        </div>
      </div>
    </>
  );
}
