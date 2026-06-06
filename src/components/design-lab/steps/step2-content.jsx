import { StepperContent } from "@/components/reui/stepper";
import { FabricCard } from "@/components/ui/cards/fabric-card";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { fabrics } from "@/mock/design-lab";
import { useState } from "react";

export default function Step2Content() {
  const [selection, setSelection] = useState({});
  return (
    <>
      <StepperContent
        value={2}
        className="flex flex-col items-center space-y-10"
      >
        <div className="space-y-2">
          <EyebrowText text="Step Two" align="center" />
          <HeadingText highlight="Select Your Fabric" align="center" />
          <ParagraphText
            text="Feel the difference — each fabric tells its own story"
            className="text-white"
            align="center"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {fabrics.map((f) => (
            <FabricCard
              key={f.id}
              active={selection.id === f.id}
              onClick={() => setSelection({ ...selection, id: f.id })}
              {...f}
            />
          ))}
        </div>
      </StepperContent>
    </>
  );
}
