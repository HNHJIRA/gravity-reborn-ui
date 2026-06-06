import React, { useState } from "react";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { ParagraphText } from "../ui/text/paragraph-text";
import { Heart, Crown, Gem, Sparkles, Award, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function HomeFilterByEvent() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const events = [
    {
      id: "nikah",
      title: "Muslim Nikah",
      desc: "Pure silk Cream Sherwanis and matching stoles designed with intricate gold threadwork.",
      icon: <Heart size={24} />,
      tag: "Cream & Pastel Tones",
    },
    {
      id: "baraat",
      title: "Hindu Baraat",
      desc: "Heavy Zardosi hand-embroidered silhouettes and regal red/gold Groom's ensembles.",
      icon: <Crown size={24} />,
      tag: "Ornate Zardosi Gold",
    },
    {
      id: "anand",
      title: "Sikh Anand Karaj",
      desc: "Double-breasted Velvet Sherwanis, rich turbans, and custom-embroidered sashes.",
      icon: <Gem size={24} />,
      tag: "Royal Velvet & Brocade",
    },
    {
      id: "bengali",
      title: "Bengali Reception",
      desc: "Contemporary Prince Suits, sleek bandhgalas, and traditional pure silk Punjabi couture.",
      icon: <Sparkles size={24} />,
      tag: "Prince Suits & Silks",
    },
    {
      id: "christian",
      title: "Christian Wedding",
      desc: "Bespoke three-piece Tuxedos tailored from premium Italian wool and premium satin trims.",
      icon: <Award size={24} />,
      tag: "Italian Tuxedos & Suits",
    },
  ];

  return (
    <SectionWrapper className="bg-zinc-950/40 border-y border-primary/10">
      <ContainerWrapper className="space-y-12">
        <div className="text-center space-y-3">
          <p className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">
            Curated Heritage Couture
          </p>
          <HeadingText title="Filter By" highlight="Wedding Event" align="center" />
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto mt-4"></div>
          <ParagraphText
            text="Discover garments precisely tailored for the traditions of your special day."
            className="text-zinc-400 max-w-lg mx-auto"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative rounded-2xl border border-primary/20 bg-zinc-900/40 p-6 flex flex-col justify-between h-72 transition-all duration-500 hover:-translate-y-2 hover:border-primary/80 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] group backdrop-blur-sm overflow-hidden"
            >
              {/* Gold light burst animation on hover */}
              <div className="absolute -inset-px bg-gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              <div className="space-y-4 z-10">
                <div className="w-12 h-12 rounded-xl border border-primary/30 flex items-center justify-center bg-black/60 text-primary group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                  {ev.icon}
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-primary uppercase block">
                    {ev.tag}
                  </span>
                  <h4 className="text-sm font-bold tracking-wide text-white font-cormorant group-hover:text-primary transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {ev.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 z-10">
                <Link
                  href={`/shop-collection?event=${ev.id}`}
                  className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-primary hover:text-white transition-colors"
                >
                  Explore Collection
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
