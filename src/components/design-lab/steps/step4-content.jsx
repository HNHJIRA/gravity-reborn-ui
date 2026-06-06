import { StepperContent } from "@/components/reui/stepper";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { useState, useEffect } from "react";
import { Sparkles, AlertCircle, Play, Film } from "lucide-react";

export default function Step4Content() {
  const [chest, setChest] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [sherwaniLength, setSherwaniLength] = useState("");
  
  const [aiWarning, setAiWarning] = useState("");
  const [activeVideo, setActiveVideo] = useState("chest"); // chest, shoulder, sleeve

  useEffect(() => {
    const c = parseFloat(chest);
    const s = parseFloat(sleeve);
    
    if (!isNaN(c) && !isNaN(s)) {
      if (c === 40 && s === 30) {
        setAiWarning("That sleeve length seems unusual for your frame—shall we double-check together?");
      } else if (s > c * 0.7) {
        setAiWarning("Your sleeve size is statistically very long for this chest measurement. Please verify.");
      } else if (s < c * 0.4 && s > 0) {
        setAiWarning("Your sleeve size seems unusually short relative to your chest size. Please double-check.");
      } else {
        setAiWarning("");
      }
    } else {
      setAiWarning("");
    }
  }, [chest, sleeve]);

  const guides = {
    chest: {
      title: "Chest Measurement",
      desc: "Measure around the fullest part of your chest, keeping the tape horizontal.",
      videoPlaceholder: "Chest Measurement Loop (Silent 10s Guide)",
    },
    shoulder: {
      title: "Shoulder Width",
      desc: "Measure from the edge of one shoulder bone, across the back, to the edge of the other shoulder bone.",
      videoPlaceholder: "Shoulder Measurement Loop (Silent 10s Guide)",
    },
    sleeve: {
      title: "Sleeve Length",
      desc: "Measure from the shoulder seam down to your wrist bone.",
      videoPlaceholder: "Sleeve Length Loop (Silent 10s Guide)",
    },
    length: {
      title: "Sherwani Length",
      desc: "Measure from the base of the neck down to just below the knee (differs from standard suit).",
      videoPlaceholder: "Sherwani Length Loop (Silent 10s Guide)",
    }
  };

  return (
    <>
      <StepperContent
        value={4}
        className="flex flex-col items-center space-y-10 w-full"
      >
        <div className="space-y-2 text-center">
          <EyebrowText text="Step Four" align="center" />
          <HeadingText highlight="Digital Tailor & Measurements" align="center" />
          <ParagraphText
            text="Provide your precise dimensions for custom-fit tailoring"
            className="text-white"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Column: Input Form */}
          <div className="space-y-6 bg-zinc-900/60 p-6 rounded-2xl border border-primary/20 backdrop-blur-md">
            <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4 flex items-center gap-2">
              <Sparkles size={16} /> Enter Measurements (Inches)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase">Chest</label>
                <input
                  type="number"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  onFocus={() => setActiveVideo("chest")}
                  placeholder="e.g. 40"
                  className="w-full bg-black/60 border border-primary/20 focus:border-primary focus:outline-none rounded-lg px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase">Shoulder</label>
                <input
                  type="number"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                  onFocus={() => setActiveVideo("shoulder")}
                  placeholder="e.g. 18"
                  className="w-full bg-black/60 border border-primary/20 focus:border-primary focus:outline-none rounded-lg px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase">Sleeve Length</label>
                <input
                  type="number"
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  onFocus={() => setActiveVideo("sleeve")}
                  placeholder="e.g. 30"
                  className="w-full bg-black/60 border border-primary/20 focus:border-primary focus:outline-none rounded-lg px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase">Garment Length</label>
                <input
                  type="number"
                  value={sherwaniLength}
                  onChange={(e) => setSherwaniLength(e.target.value)}
                  onFocus={() => setActiveVideo("length")}
                  placeholder="e.g. 42"
                  className="w-full bg-black/60 border border-primary/20 focus:border-primary focus:outline-none rounded-lg px-3 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            {/* AI Validation Alert Popup */}
            {aiWarning && (
              <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 text-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-red-400">Atelier AI Validation</p>
                  <p className="text-xs leading-relaxed">{aiWarning}</p>
                </div>
              </div>
            )}
            
            <div className="border-t border-primary/10 pt-4">
              <p className="text-[9px] text-zinc-500 italic">
                * Note: Our production team manually reviews all bespoke configurations before fabric cutting.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Video Guides */}
          <div className="flex flex-col justify-between bg-black/40 p-6 rounded-2xl border border-primary/10">
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white uppercase mb-2 flex items-center gap-2">
                <Film size={16} className="text-primary" /> Visual Guide
              </h3>
              <p className="text-xs text-zinc-400 mb-6">{guides[activeVideo].desc}</p>
            </div>

            {/* Video Placeholder Container */}
            <div className="relative aspect-video w-full rounded-xl bg-zinc-950 border border-primary/20 flex flex-col items-center justify-center overflow-hidden group">
              {/* Dynamic Scanning Lines / Radial Overlay */}
              <div className="absolute inset-0 bg-radial-gradient-black opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Spinning/Pulse indicator */}
              <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center text-primary bg-black/60 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                <Play size={18} fill="currentColor" className="ml-0.5 animate-pulse" />
              </div>
              
              <span className="absolute bottom-4 left-4 text-[10px] text-primary tracking-widest uppercase z-10 font-medium">
                {guides[activeVideo].videoPlaceholder}
              </span>
            </div>

            {/* Switch Guide Tabs */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {Object.keys(guides).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveVideo(key)}
                  className={`text-[9px] py-2 rounded border uppercase tracking-wider transition-all ${
                    activeVideo === key
                      ? "bg-primary border-primary text-black font-semibold"
                      : "bg-transparent border-primary/20 hover:border-primary/50 text-zinc-400 hover:text-white"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </StepperContent>
    </>
  );
}
