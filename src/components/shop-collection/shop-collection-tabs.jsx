import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import ShopCollectionContent from "./shop-collection-content";

export default function ShopCollectionTabs() {
  const [activeCategory, setActiveCategory] = useState("ALL PIECES");
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

  const dynamicCategories = useMemo(() => {
    const cats = new Set(products.map(p => {
      // Create pluralized / formatted category name like "SHERWANIS"
      const c = p.category?.toUpperCase() || "";
      if (c.includes("LEHENGA") || c.includes("GHARARA")) return "BRIDAL LEHENGAS";
      if (c.includes("WESTERN")) return "WESTERN SUITS";
      if (c.includes("SHERWANI")) return "SHERWANIS";
      if (c.includes("ACCESSORY")) return "ACCESSORIES";
      return c ? c + "S" : "OTHERS";
    }));
    return ["ALL PIECES", ...Array.from(cats)].filter(c => c !== "OTHERS" || cats.size > 0);
  }, [products]);

  // If there are no products, just show ALL PIECES so it doesn't break the UI
  const categories = dynamicCategories.length > 1 ? dynamicCategories : ["ALL PIECES"];

  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <Tabs
            defaultValue="ALL PIECES"
            onValueChange={setActiveCategory}
            className="w-full flex flex-col items-center"
          >
            <TabsList className="bg-transparent w-full max-w-4xl flex justify-start md:justify-center gap-3 md:gap-6 overflow-x-auto overflow-y-hidden px-4 no-scrollbar">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="whitespace-nowrap data-[state=active]:bg-gradient-gold data-[state=active]:text-black px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs tracking-widest rounded-none transition-all duration-300"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full px-4 md:px-0">
              <ShopCollectionContent 
                activeCategory={activeCategory} 
                products={products} 
                loading={loading} 
                error={error} 
              />
            </div>
          </Tabs>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
