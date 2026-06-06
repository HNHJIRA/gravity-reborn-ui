import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { NavbarDesktop } from "./navbar/navbar-desktop";
import { NavbarLogo } from "./navbar/navbar-logo";
import { NavbarMobile } from "./navbar/navbar-mobile";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-40">
        <ContainerWrapper>
          <div className="flex items-center justify-between">
            <NavbarLogo />
            {/* Mobile Navigation Header Items */}
            <div className="fixed top-6 right-6 z-50 md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center justify-center p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-primary hover:border-primary transition-all duration-300 shadow-xl relative"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-gold text-black text-[8px] font-extrabold shadow-md animate-in zoom-in-50 duration-200">
                    {cartCount}
                  </span>
                )}
              </button>
              <NavbarMobile />
            </div>
          </div>
        </ContainerWrapper>
      </nav>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block w-fit">
        <NavbarDesktop />
      </div>
    </>
  );
}
