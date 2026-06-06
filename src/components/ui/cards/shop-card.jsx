"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "../card";
import { ParagraphText } from "../text/paragraph-text";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function ShopCard({ item }) {
  const { addToCart } = useCart();
  const [activeColor, setActiveColor] = useState({
    name: "Midnight Blue",
    hex: "#002347"
  });

  const swatches = [
    { name: "Midnight Blue", hex: "#002347" },
    { name: "Champagne Gold", hex: "#D4AF37" },
    { name: "Royal Cream", hex: "#FAF9F6" },
    { name: "Regal Maroon", hex: "#5C0612" }
  ];

  const handlePurchase = (e) => {
    e.stopPropagation();
    addToCart(item, activeColor);
  };

  return (
    <Card className="bg-transparent border-none group cursor-pointer py-0">
      <Link href={`/shop-collection/${item.id}`} className="block">
        <CardContent className="p-0 relative overflow-hidden border border-primary/40 group-hover:border-primary transition-all duration-300">
          <div className="absolute top-4 left-4 z-10 bg-gradient-gold text-black text-[10px] font-bold px-3 py-1 tracking-tighter">
            {item.tag}
          </div>
          
          {/* Macro Zoom Lens Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-full border border-primary/60 bg-black/60 backdrop-blur-md text-primary animate-in zoom-in-50 duration-350">
              <ZoomIn size={20} />
            </div>
          </div>

          <div className="relative aspect-3/4 bg-zinc-900 overflow-hidden">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start p-0 gap-2 mt-3">
        <Link href={`/shop-collection/${item.id}`} className="block w-full">
          <div className="flex justify-between w-full">
            <ParagraphText
              text={item.title}
              className="text-white font-medium tracking-wide text-xs"
            />
            <ParagraphText
              text={item.price}
              className="text-gradient-gold font-bold tracking-wide text-xs"
            />
          </div>
        </Link>
        <div className="flex justify-between w-full items-center">
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Royal Heritage
          </p>
          <span className="text-[9px] text-primary/80 uppercase tracking-widest font-semibold font-mono">
            {activeColor.name}
          </span>
        </div>
        
        {/* Color Swatch Toggles */}
        <div className="flex gap-1.5 mt-1 pb-1">
          {swatches.map((swatch, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveColor(swatch);
              }}
              style={{ backgroundColor: swatch.hex }}
              className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                activeColor.name === swatch.name
                  ? "border-primary scale-125 ring-2 ring-primary/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              title={swatch.name}
            />
          ))}
        </div>
        
        <p className="text-[9px] text-muted-foreground italic mb-1">
          Pure Silk with Zardosi
        </p>

        {/* Dynamic E-Commerce Purchase Trigger Button */}
        <button
          onClick={handlePurchase}
          className="w-full bg-gradient-gold text-black font-bold text-[10px] tracking-widest py-3 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)]"
        >
          <ShoppingBag size={12} strokeWidth={2.5} />
          <span>Add To Cart</span>
        </button>
      </CardFooter>
    </Card>
  );
}
