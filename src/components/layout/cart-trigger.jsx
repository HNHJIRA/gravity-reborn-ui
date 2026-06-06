import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartTrigger() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-6 right-24 z-50 font-inter">
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-primary/45 text-primary shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:border-primary hover:scale-105 transition-all duration-300 relative"
        title="Open Atelier Cart"
      >
        <ShoppingBag size={22} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-gold text-black text-[9px] font-extrabold shadow-md animate-in zoom-in-50 duration-200">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
