import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { HeadingText } from "../ui/text/heading-text";
import { ParagraphText } from "../ui/text/paragraph-text";
import { Button } from "../ui/button";
import VirtualTryIconCard from "./virtual-try-icon-card";

const ReactCompareImage = lazy(() => import("react-compare-image"));

const VirtualTryHero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-20">
          <div className="space-y-8">
            <EyebrowText text="AI-Powered Experience" />
            <HeadingText title="Virtual" highlight="Try-On" size="lg" />
            <ParagraphText
              text="Experience the art of couture transformation. Upload your portrait and discover how our heritage pieces elevate your presence."
              className="text-white"
            />
            <Button
              variant="gold"
              className="px-10 h-12 rounded-none flex items-center gap-2"
              bgImage="/images/disco.webp"
            >
              Begin Your Transformation
              <ArrowRight size={14} />
            </Button>
          </div>
          <div className="relative w-full max-w-[400px]">
            {mounted ? (
              <Suspense fallback={<img src="/images/home/virtual-try/virtual-try-right.webp" alt="" className="w-full" />}>
                <ReactCompareImage
                  leftImage="/images/home/virtual-try/virtual-try-right.webp"
                  rightImage="/images/home/virtual-try/virtual-try-right.webp"
                  sliderLineColor="#d4af37"
                  leftImageCss={{ filter: "grayscale(100%)" }}
                />
              </Suspense>
            ) : (
              <img src="/images/home/virtual-try/virtual-try-right.webp" alt="" className="w-full" />
            )}
            <span className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] tracking-tighter uppercase">
              Before
            </span>
            <span className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] tracking-tighter uppercase">
              After
            </span>
          </div>
        </div>
        <VirtualTryIconCard />
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export default VirtualTryHero;
