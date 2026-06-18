import { RotateCw, Video, Sparkles } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const UploadCard4 = ({ resultImage }) => {
  const [spinning, setSpinning] = useState(false);

  return (
    <div className="lg:col-span-12 space-y-6 mt-12">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full text-xs text-primary">
          4
        </span>
        <HeadingText title="360° Walkthrough" size="sm" className="text-2xl!" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 relative aspect-4/5 border border-primary bg-black/40 overflow-hidden flex items-center justify-center">
          {resultImage ? (
            <img
              src={resultImage}
              alt="360 preview"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                spinning ? "animate-[spin_4s_linear_infinite]" : ""
              }`}
              style={spinning ? { transformOrigin: "center" } : undefined}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <Video className="w-10 h-10 text-primary" />
              <ParagraphText
                text="Complete step 3 first to unlock your 360° walkthrough."
                className="font-cormorant text-white"
                align="center"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <ParagraphText
            text="See your look from every angle. Generate a short 360° turn and a few steps so you can preview how the outfit moves with you."
            className="font-cormorant text-white text-lg"
          />

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="md"
              className="h-12 flex items-center gap-2"
              disabled={!resultImage}
              onClick={() => setSpinning((s) => !s)}
            >
              <RotateCw size={16} />
              {spinning ? "Stop Spin" : "Preview 360° Spin"}
            </Button>

            <Button
              variant="gold"
              size="md"
              className="h-12 flex items-center gap-2 opacity-60 cursor-not-allowed"
              disabled
            >
              <Sparkles size={16} />
              Generate Walk Video (coming soon)
            </Button>
          </div>

          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            Note: live walk-video generation requires a paid video model (e.g.
            Fal / Replicate). The spin above is a quick preview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCard4;
