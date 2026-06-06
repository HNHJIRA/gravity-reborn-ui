import { Eye, Loader2, Download, AlertTriangle } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UploadCard3 = ({ resultImage, generating, error, onTryOn, canTryOn }) => {
  return (
    <>
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full text-xs text-primary">
            3
          </span>
          <HeadingText title="Live Preview" size="sm" className="text-2xl!" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-4/5 border border-primary flex flex-col items-center justify-center p-8 text-center group overflow-hidden bg-black/40">
            {generating ? (
              <div className="flex flex-col items-center gap-4 z-10">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <ParagraphText
                  text="AI is stitching your garment..."
                  className="font-cormorant text-primary text-xl"
                  align="center"
                />
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">This may take a few seconds</p>
              </div>
            ) : resultImage ? (
              <img src={resultImage} alt="Virtual Try On Result" className="absolute inset-0 w-full h-full object-cover" />
            ) : error ? (
              <div className="flex flex-col items-center gap-3 z-10 p-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />
                <ParagraphText
                  text="Transformation Failed"
                  className="font-cormorant text-red-400 text-xl"
                  align="center"
                />
                <p className="text-xs text-zinc-400">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 z-10">
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center primary">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <ParagraphText
                  text="Upload your portrait and select an outfit to see the live preview"
                  className="font-cormorant text-white"
                  align="center"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="md"
              className="h-12 w-full flex items-center justify-center"
              onClick={onTryOn}
              disabled={!canTryOn || generating}
            >
              {generating ? "Generating..." : "Try On Now"}
            </Button>

            {resultImage ? (
              <a
                href={resultImage}
                download="virtual-try-on.jpg"
                target="_blank"
                rel="noreferrer"
                className="h-12 w-full flex items-center justify-center bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors gap-2 rounded"
              >
                <Download size={16} />
                Download
              </a>
            ) : (
              <Button
                variant="gold"
                size="md"
                className="h-12 w-full opacity-50 cursor-not-allowed"
                bgImage="/images/disco.webp"
                disabled
              >
                Download
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCard3;
