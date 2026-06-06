"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ParagraphText } from "../ui/text/paragraph-text";
import { ShopCard } from "../ui/cards/shop-card";
import { SlidersHorizontal, ShoppingBag } from "lucide-react";

export default function ShopCollectionContent({ activeCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/orders/products");
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Fetch products error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Category normalizer matching frontend tabs with backend database categories
  const matchesCategory = (productCategory, activeTab) => {
    if (!productCategory) return false;
    if (activeTab === "ALL PIECES") return true;
    
    const normTab = activeTab.toLowerCase().replace(/s$/, ""); // e.g. "sherwanis" -> "sherwani"
    const normProd = productCategory.toLowerCase();

    if (normTab === "bridal lehenga") {
      return normProd.includes("lehenga") || normProd.includes("gharara");
    }
    if (normTab === "western suit") {
      return normProd.includes("western");
    }
    return normProd.includes(normTab);
  };

  const filteredProducts = products.filter((p) =>
    matchesCategory(p.category, activeCategory)
  );

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center border-y border-white/10 py-4 my-6">
          <ParagraphText text="Loading pieces..." className="text-white animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-[#0a0a0f] border border-white/5 aspect-3/4 flex flex-col justify-end p-6 rounded-none relative overflow-hidden"
              style={{ minHeight: "400px" }}
            >
              <div className="absolute top-4 left-4 bg-white/5 w-16 h-5 rounded"></div>
              <div className="h-4 bg-white/10 w-2/3 mb-2 rounded"></div>
              <div className="h-3 bg-white/5 w-1/3 rounded"></div>
              <div className="h-10 bg-white/10 w-full mt-4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center text-red-500 mb-4">
          <SlidersHorizontal size={20} />
        </div>
        <ParagraphText text={`Error connection: ${error}`} className="text-red-400 font-semibold" />
        <p className="text-muted-foreground text-xs mt-2">Could not sync catalog from live server.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center border-y border-white/10 py-4 my-6">
        <ParagraphText
          text={`${filteredProducts.length} ${filteredProducts.length === 1 ? 'piece' : 'pieces'}`}
          className="text-white font-medium"
        />
        <div className="flex items-center gap-2 cursor-pointer">
          <SlidersHorizontal size={20} color="#A3A3A3" />
          <ParagraphText text="Newest" className="text-white" />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 border border-white/5 bg-[#08080c]/80 backdrop-blur-md text-center max-w-xl mx-auto my-12 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary/70 mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <ShoppingBag size={24} />
          </div>
          <h3 className="text-white font-medium text-base tracking-widest mb-3 uppercase">
            No Couture Pieces Available
          </h3>
          <p className="text-muted-foreground text-[11px] leading-relaxed max-w-xs mb-1">
            Our digital showroom is currently being curated. 
          </p>
          <p className="text-primary/70 text-[10px] tracking-widest uppercase italic">
            Please add exquisite custom pieces through the Admin Panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ShopCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
