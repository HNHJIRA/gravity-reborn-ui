import { RotateCw, Video, Sparkles, Loader2 } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateWalkVideo } from "@/lib/walkvideo.functions";

const UploadCard4 = ({ resultImage }) => {
  const [spinning, setSpinning] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const walkFn = useServerFn(generateWalkVideo);

  const handleGenerate = async () => {
    if (!resultImage) return;
    setGenerating(true);
    setError(null);
    setVideoUrl(null);
    try {
      const res = await walkFn({ data: { image_url: resultImage } });
      if (res.success) {
        setVideoUrl(res.video_url);
      } else {
        setError(res.error || "Failed to generate walk video.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Network error generating walk video.");
    } finally {
      setGenerating(false);
    }
  };

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
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          ) : resultImage ? (
            <img
              src={resultImage}
              alt="360 preview"
              className={`w-full h-full object-cover ${
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
          {generating && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-white text-sm font-mono uppercase tracking-widest">
                Rendering walk video…
              </p>
              <p className="text-zinc-400 text-[10px]">This can take 1–2 minutes</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <ParagraphText
            text="See your look from every angle. Generate a short clip of you walking while the camera orbits 360° around the outfit — front, side, and back."
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
                  {videoUrl ? "Regenerate Walk Video" : "Generate Walk Video"}
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-red-400 font-mono">{error}</p>
          )}

          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            Powered by Fal.ai Kling video. Uses credits from your Fal account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCard4;
