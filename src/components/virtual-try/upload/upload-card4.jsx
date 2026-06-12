import { Video, Sparkles, Loader2, Play, Pause } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateWalkVideo } from "@/lib/walkvideo.functions";

// Per-frame duration (ms). 8 frames × 800ms = ~6.4s loop.
const FRAME_MS = 800;
// Crossfade duration (ms) between frames.
const FADE_MS = 350;

const UploadCard4 = ({ resultImage }) => {
  const [frames, setFrames] = useState([]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const walkFn = useServerFn(generateWalkVideo);
  const timerRef = useRef(null);

  // Drive the walk cycle
  useEffect(() => {
    if (!playing || frames.length < 2) return;
    timerRef.current = setInterval(() => {
      setFrameIdx((i) => {
        setPrevIdx(i);
        return (i + 1) % frames.length;
      });
    }, FRAME_MS);
    return () => clearInterval(timerRef.current);
  }, [playing, frames]);

  const handleGenerate = async () => {
    if (!resultImage) return;
    setGenerating(true);
    setError(null);
    setFrames([]);
    setFrameIdx(0);
    setPrevIdx(0);
    try {
      const res = await walkFn({ data: { image_url: resultImage } });
      if (res.success) {
        setFrames(res.frames);
        setPlaying(true);
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

  const hasVideo = frames.length > 0;
  const totalSec = ((frames.length * FRAME_MS) / 1000).toFixed(1);

  // Subtle ken-burns camera push tied to frame index for cinematic feel
  const kenBurnsScale = 1.04 + (frameIdx % 2 === 0 ? 0.02 : 0);
  const kenBurnsTranslate = `${(frameIdx % 4) - 1.5}%`;

  return (
    <div className="lg:col-span-12 space-y-6 mt-12">
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full text-xs text-primary">
          4
        </span>
        <HeadingText title="Walkaround Video" size="sm" className="text-2xl!" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 relative aspect-4/5 border border-primary bg-black overflow-hidden flex items-center justify-center">
          {hasVideo ? (
            <>
              {/* Previous frame (fading out) */}
              <img
                key={`prev-${prevIdx}`}
                src={frames[prevIdx]}
                alt="walkaround prev"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: 0,
                  transition: `opacity ${FADE_MS}ms ease-in-out`,
                }}
              />
              {/* Current frame (fading in with subtle camera push) */}
              <img
                key={`cur-${frameIdx}`}
                src={frames[frameIdx]}
                alt="walkaround"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: 1,
                  transform: `scale(${kenBurnsScale}) translateX(${kenBurnsTranslate})`,
                  transition: `opacity ${FADE_MS}ms ease-in-out, transform ${FRAME_MS}ms ease-out`,
                }}
              />
              {/* Cinematic letterbox bars */}
              <div className="absolute inset-x-0 top-0 h-6 bg-black/90 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-6 bg-black/90 pointer-events-none" />
            </>
          ) : resultImage ? (
            <img src={resultImage} alt="preview" className="w-full h-full object-cover opacity-60" />
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <Video className="w-10 h-10 text-primary" />
              <ParagraphText
                text="Complete step 3 first to unlock your walkaround video."
                className="font-cormorant text-white"
                align="center"
              />
            </div>
          )}

          {generating && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 z-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-white text-sm font-mono uppercase tracking-widest">
                Rendering walkaround…
              </p>
              <p className="text-zinc-400 text-[10px]">
                Generating 8 cinematic angles (≈ 30–60s)
              </p>
            </div>
          )}

          {hasVideo && !generating && (
            <>
              <div className="absolute bottom-8 left-2 px-2 py-1 bg-black/70 text-primary text-[10px] font-mono uppercase tracking-widest z-10">
                ● REC  {totalSec}s loop
              </div>
              <div className="absolute bottom-8 right-2 px-2 py-1 bg-black/70 text-primary text-[10px] font-mono uppercase tracking-widest z-10">
                Shot {frameIdx + 1} / {frames.length}
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <ParagraphText
            text="Watch yourself walk, pose and turn in your new outfit. The camera orbits 360° around you — front, side, back and side again — for a cinematic 6-second runway loop."
            className="font-cormorant text-white text-lg"
          />

          <div className="flex flex-wrap gap-3">
            {hasVideo && (
              <Button
                variant="secondary"
                size="md"
                className="h-12 flex items-center gap-2"
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
                {playing ? "Pause" : "Play"}
              </Button>
            )}

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
                  {hasVideo ? "Regenerate Walkaround" : "Generate Walkaround Video"}
                </>
              )}
            </Button>
          </div>

          {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono leading-relaxed">
            Powered by Lovable AI (Gemini image). 8 walk frames stitched into a cinematic loop with crossfade + camera push. For a true filmed walking video, connect a video model like Fal.ai Veo or Runway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCard4;
