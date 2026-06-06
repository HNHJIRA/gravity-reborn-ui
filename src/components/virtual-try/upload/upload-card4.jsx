import { RotateCw, Video, Sparkles, Loader2 } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateWalkVideo } from "@/lib/walkvideo.functions";

const UploadCard4 = ({ resultImage }) => {
  const [spinning, setSpinning] = useState(false);
  const [frames, setFrames] = useState([]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const walkFn = useServerFn(generateWalkVideo);

  // Cycle through frames for a walkaround illusion
  useEffect(() => {
    if (frames.length < 2) return;
    const id = setInterval(() => {
      setFrameIdx((i) => (i + 1) % frames.length);
    }, 700);
    return () => clearInterval(id);
  }, [frames]);

  const handleGenerate = async () => {
    if (!resultImage) return;
    setGenerating(true);
    setError(null);
    setFrames([]);
    setFrameIdx(0);
    try {
      const res = await walkFn({ data: { image_url: resultImage } });
      if (res.success) {
        setFrames(res.frames);
      } else {
        setError(res.error || "Failed to generate walkaround.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Network error generating walkaround.");
    } finally {
      setGenerating(false);
    }
  };

  const displayImage = frames.length > 0 ? frames[frameIdx] : resultImage;

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
          {displayImage ? (
            <img
              src={displayImage}
              alt="360 preview"
              className={`w-full h-full object-cover ${
                spinning && frames.length === 0 ? "animate-[spin_4s_linear_infinite]" : ""
              }`}
              style={spinning && frames.length === 0 ? { transformOrigin: "center" } : undefined}
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
          {generating && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-white text-sm font-mono uppercase tracking-widest">
                Rendering walkaround…
              </p>
              <p className="text-zinc-400 text-[10px]">Generating front / side / back angles</p>
            </div>
          )}
          {frames.length > 0 && !generating && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-primary text-[10px] font-mono uppercase tracking-widest">
              Angle {frameIdx + 1} / {frames.length}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <ParagraphText
            text="See your look from every angle. Generate front, side and back views of yourself in this outfit, played back as a looping 360° walkaround."
            className="font-cormorant text-white text-lg"
          />

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="md"
              className="h-12 flex items-center gap-2"
              disabled={!resultImage || generating}
              onClick={() => setSpinning((s) => !s)}
            >
              <RotateCw size={16} />
              {spinning ? "Stop Spin" : "Quick 360° Preview"}
            </Button>

            <Button
              variant="gold"
              size="md"
              className="h-12 flex items-center gap-2"
              disabled={!resultImage || generating}
              onClick={handleGenerate}
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {frames.length > 0 ? "Regenerate Walkaround" : "Generate Walkaround"}
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-400 font-mono">{error}</p>
          )}

          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            Powered by Lovable AI. Uses your monthly AI credits. For true walking video, connect Fal.ai later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCard4;
