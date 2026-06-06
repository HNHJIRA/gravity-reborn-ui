import { Calendar, Clock } from "lucide-react";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { HeadingText } from "../ui/text/heading-text";
import { ParagraphText } from "../ui/text/paragraph-text";
import { Link } from "@tanstack/react-router";

const HeritageBlogFeatured = () => {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <EyebrowText text="Featured Story" align="center" className="mb-10" />
          <div className="flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/2 relative group min-h-[400px]">
              <img
                src="/images/home/crafting-dream/dream2.webp"
                alt="Saree"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 md:p-16 flex flex-col justify-center space-y-6">
              <span className="inline-block border border-primary px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-primary w-fit">
                Craftsmanship
              </span>
              <HeadingText
                title="The Art of Zardozi: A Royal Legacy in Every Stitch"
                size="sm"
              />
              <div className="flex items-center gap-2 md:gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <ParagraphText text="February 15, 2026" size="sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <ParagraphText text="8 min read" size="sm" />
                </div>
              </div>
              <ParagraphText
                text="Discover the centuries-old craft of Zardozi embroidery, where
                master artisans weave gold and silver threads into breathtaking
                patterns that once adorned the robes of emperors."
              />
              <Link
                href="#"
                className="text-primary hover:text-muted-foreground transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                Read Full Story &rarr;
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default HeritageBlogFeatured;
