import { StepperContent } from "@/components/reui/stepper";
import { EmbroideryCard } from "@/components/ui/cards/embroidery-card";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { useState } from "react";

export default function Step3Content() {
  const [selection, setSelection] = useState({});
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("You can upload a maximum of 3 inspiration photos.");
      return;
    }
    
    const newImages = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <StepperContent
        value={3}
        className="flex flex-col items-center space-y-10"
      >
        <div className="space-y-2">
          <EyebrowText text="Step Three" align="center" />
          <HeadingText highlight="Embroidery Level" align="center" />
          <ParagraphText
            text="Choose your preferred embroidery density and upload designs for reference"
            className="text-white"
            align="center"
          />
        </div>
        
        {/* Embroidery Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <EmbroideryCard
            title="Minimal"
            sub="UNDERSTATED REFINEMENT"
            active={selection.id === "minimal"}
            onClick={() => setSelection({ ...selection, id: "minimal" })}
          />
          <EmbroideryCard
            title="Medium"
            sub="BALANCED OPULENCE"
            active={selection.id === "medium"}
            onClick={() => setSelection({ ...selection, id: "medium" })}
          />
          <EmbroideryCard
            title="Heavy"
            sub="GRAND REGALIA"
            active={selection.id === "heavy"}
            onClick={() => setSelection({ ...selection, id: "heavy" })}
          />
        </div>

        {/* Upload Inspiration Section */}
        <div className="w-full max-w-2xl bg-zinc-900/40 p-6 rounded-2xl border border-primary/20 backdrop-blur-md space-y-6">
          <div className="text-center space-y-1">
            <h4 className="text-xs font-bold tracking-widest text-primary uppercase">
              Upload Inspiration Photos
            </h4>
            <p className="text-[10px] text-zinc-400">
              Provide up to 3 reference images for our master tailors (max 3 files)
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border border-dashed border-primary/30 rounded-xl p-8 bg-black/40 hover:border-primary/60 transition-colors cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={images.length >= 3}
            />
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <span className="text-xs font-medium text-primary">Click to select files</span>
              <span className="text-[9px]">JPEG, PNG (up to 10MB)</span>
            </div>
          </div>

          {/* Selected Images List */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 pt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg border border-primary/20 bg-zinc-950 overflow-hidden group">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/80 hover:bg-red-950 hover:text-red-400 text-zinc-400 p-1.5 rounded-full transition-colors z-10"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 truncate text-[9px] text-zinc-400 group-hover:text-white">
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </StepperContent>
    </>
  );
}
