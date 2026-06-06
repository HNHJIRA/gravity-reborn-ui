import { StepperContent } from "@/components/reui/stepper";
import { SelectionCard } from "@/components/ui/cards/selection-card";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { silhouettes } from "@/mock/design-lab";
import { useState } from "react";

export default function Step1Content() {
  const [selection, setSelection] = useState({});
  const [eventContext, setEventContext] = useState("");

  const events = [
    { id: "nikah", label: "Muslim Nikah" },
    { id: "baraat", label: "Hindu Baraat" },
    { id: "anand", label: "Sikh Anand Karaj" },
    { id: "bengali", label: "Bengali Reception" },
    { id: "christian", label: "Christian Wedding" },
  ];

  return (
    <>
      <StepperContent
        value={1}
        className="flex flex-col items-center space-y-10"
      >
        <div className="space-y-2">
          <EyebrowText text="Step One" align="center" />
          <HeadingText highlight="Choose Your Silhouette" align="center" />
          <ParagraphText
            text="Select the foundation of your bespoke garment"
            className="text-white"
            align="center"
          />
        </div>

        {/* Event Context Selection */}
        <div className="w-full max-w-2xl bg-zinc-900/40 p-6 rounded-2xl border border-primary/20 backdrop-blur-md space-y-4">
          <p className="text-[10px] tracking-[0.25em] text-primary uppercase text-center font-bold">
            Select Your Wedding Event Context
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setEventContext(ev.id)}
                className={`text-xs px-4 py-2.5 rounded-full border transition-all duration-300 ${
                  eventContext === ev.id
                    ? "bg-primary border-primary text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-transparent border-primary/20 hover:border-primary/50 text-zinc-300 hover:text-white"
                }`}
              >
                {ev.label}
              </button>
            ))}
          </div>
          {eventContext && (
            <p className="text-[10px] text-zinc-500 text-center italic animate-in fade-in duration-300">
              * Tailor advice logic is now optimized for {events.find(e => e.id === eventContext)?.label}.
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {silhouettes.map((s) => (
            <SelectionCard
              key={s.id}
              active={selection.id === s.id}
              onClick={() => setSelection({ ...selection, id: s.id })}
              {...s}
            />
          ))}
        </div>
      </StepperContent>
    </>
  );
}
