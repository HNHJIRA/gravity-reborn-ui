import { navbarMenu } from "@/mock/navigation-menu";
import { NavbarDesktopItem } from "./navbar-desktop-item";

export function NavbarDesktop() {
  return (
    <div className="flex items-center gap-4 border border-primary/40 px-8 rounded-full backdrop-blur-md py-4">
      {navbarMenu.map((item, index) => (
        <NavbarDesktopItem
          key={item.label}
          item={item}
          isLast={index === navbarMenu.length - 1}
        />
      ))}
    </div>
  );
}
