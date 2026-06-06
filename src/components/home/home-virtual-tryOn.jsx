import Image from "next/image";
import { Button } from "../ui/button";
import { Upload, Wand2, Eye, Camera, RefreshCcw, Download } from "lucide-react";
import { StepInfoCard } from "../ui/cards/step-info-card";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";

export default function HomeVirtualTryOn() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="text-center space-y-4 mb-10">
          <EyebrowText text="Powered by AI" align="center" />
          <HeadingText title="Virtual" highlight="Try-On" align="center" />
          <ParagraphText
            text="Experience our revolutionary AI-powered virtual fitting room. See how an
            piece looks on you before making a decision."
            size="md"
            className="max-w-lg mx-auto text-center"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="border-2 border-red-600 rounded-xl p-3">
            <div className="relative grid grid-cols-1 border-2 border-primary rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <Image
                src="/images/home/virtual-try/virtual-try1.webp"
                alt="Virtual Try-On"
                width={400}
                height={600}
                className="object-cover object-top w-full md:h-[300px] h-[200px]"
                loading="lazy"
              />
              <Image
                src="/images/home/virtual-try/virtual-try2.webp"
                alt="Virtual Try-On"
                width={400}
                height={600}
                className="object-cover object-top w-full md:h-[300px] h-[200px]"
                loading="lazy"
              />
              <div className="flex items-center gap-4 absolute bottom-5 left-5 z-10">
                <div className="p-3 text-primary border border-primary/20 bg-muted cursor-pointer">
                  <RefreshCcw size={20} />
                </div>
                <div className="p-3 text-primary border border-primary/20 bg-muted cursor-pointer">
                  <Download size={20} />
                </div>
              </div>

              <div className="flex items-center gap-4 absolute top-5 left-5 z-10">
                <Button
                  variant="gold"
                  size="md"
                  className="px-6 h-10 text-sm rounded-none"
                >
                  Before
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="px-6 h-10 text-sm rounded-none"
                >
                  After
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <HeadingText
              title="See Yourself in"
              highlight="Royal Attire"
              size="sm"
            />
            <div className="space-y-6">
              <StepInfoCard
                Icon={Upload}
                title="Upload Your Photo"
                description="Simple full-body photo from your phone"
              />
              <StepInfoCard
                Icon={Wand2}
                title="AI Magic"
                description="Our AI creates a realistic visualization"
              />
              <StepInfoCard
                Icon={Eye}
                title="Make Your Choice"
                description="Compare outfits and find your perfect match"
              />
            </div>
            <Button
              variant="gold"
              size="md"
              className="px-10 h-12 text-sm w-full"
              bgImage="/images/disco.webp"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Virtual Try-On
            </Button>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
