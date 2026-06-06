import React from "react";
import { ParagraphText } from "../text/paragraph-text";
import { HeadingText } from "../text/heading-text";

export function StepInfoCard({ Icon, title, description }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border border-white/10 p-4">
      <div className="bg-primary/20 p-3">
        <Icon className="text-primary" size={20} />
      </div>
      <div className="space-y-1">
        <HeadingText title={title} className="text-2xl!" />
        <ParagraphText text={description} size="md" />
      </div>
    </div>
  );
}
