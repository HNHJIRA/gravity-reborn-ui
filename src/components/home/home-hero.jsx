import { ArrowRight } from "lucide-react";
import BgOverlay from "../ui/overlay/bg-overlay";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import HomeCarousel from "./home-carousel";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";

export default function HomeHero() {
  return (
    <SectionWrapper className="h-screen md:py-0">
      <BgOverlay
        imageUrl="/images/home/bg-home.webp"
        overlayClass="bg-black/20"
      />
      <div className="relative z-10 h-full flex items-center">
        <ContainerWrapper>
          <div className="max-w-sm space-y-6 mt-20">
            <HeadingText
              highlight="Where Heritage Meets Elegance"
              className="font-agatho!"
            />
            <ParagraphText
              text="Discover the pinnacle of South Asian wedding fashion. Each piece, a masterwork of tradition and contemporary sophistication."
              className="text-white font-nexa"
              size="xl"
            />
            <RadioGroup
              defaultValue="explore"
              className="flex md:flex-row flex-col gap-4"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <RadioGroupItem
                  value="explore"
                  id="explore"
                  className="h-6 w-6"
                />
                <Label htmlFor="explore" className="font-light text-md">
                  Explore Collections
                </Label>
              </div>
              <div className="flex items-center gap-3 cursor-pointer">
                <RadioGroupItem value="book" id="book" className="h-6 w-6" />
                <Label htmlFor="book" className="font-light text-md">
                  Book Consultation
                </Label>
              </div>
            </RadioGroup>
            <Separator className="bg-muted-foreground w-full" />
            <div className="flex justify-center">
              <Button
                variant="gold"
                size="md"
                className="rounded-full px-10 h-12 text-md"
              >
                Discover Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-10 right-20 md:block hidden">
            <HomeCarousel />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:block hidden">
            <div className="flex items-center">
              <div className="w-24 h-px bg-gradient-gold"></div>
              <img
                src="/images/home/triangle.webp"
                alt="Triangle Image"
                width={30}
                height={30}
                loading="lazy"
              />
              <div className="w-24 h-px bg-gradient-gold"></div>
            </div>
            <ParagraphText
              text="avail our offer"
              className="uppercase text-center"
            />
          </div>
        </ContainerWrapper>
      </div>
    </SectionWrapper>
  );
}
