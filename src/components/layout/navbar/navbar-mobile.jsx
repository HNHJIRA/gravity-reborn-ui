import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarMenu, websiteInfo } from "@/mock/navigation-menu";
import { NavbarMobileItem } from "./navbar-mobile-item";

export function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="inline-flex items-center justify-center p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-primary hover:border-primary transition-all duration-300 shadow-xl"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] border-r border-white/10 bg-black/95 text-white p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-white/10">
            <SheetTitle className="text-left">
              <Link href={websiteInfo.link} className="block w-fit">
                <Image
                  src={websiteInfo.logo}
                  alt={websiteInfo.alt}
                  width={120}
                  height={120}
                  priority
                />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 py-6 px-4 overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {navbarMenu.map((item) => (
                <SheetClose asChild key={item.label}>
                  <NavbarMobileItem item={item} />
                </SheetClose>
              ))}
            </nav>
          </div>
          <div className="p-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center uppercase tracking-widest">
              © {new Date().getFullYear()} Victor Design
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
