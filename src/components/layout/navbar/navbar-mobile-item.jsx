import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";

export function NavbarMobileItem({ item }) {
  const pathname = useLocation().pathname;
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`text-sm transition-all duration-300 block px-4 py-3 rounded-md ${
        isActive
          ? "bg-white/10 text-primary border-l-2 border-primary"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {item.label}
    </Link>
  );
}
