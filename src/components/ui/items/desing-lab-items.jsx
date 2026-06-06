import React from "react";
import { ParagraphText } from "../text/paragraph-text";
import { HeadingText } from "../text/heading-text";

export function DesingLabItems({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="p-4 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer">
        <Icon size={20} />
      </div>
      <div>
        <HeadingText highlight={title} className="text-2xl!" />
        <ParagraphText text={desc} className="text-white" size="md" />
      </div>
    </div>
  );
}
