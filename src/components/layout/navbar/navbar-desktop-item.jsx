import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarDesktopItem({ item, isLast }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex flex-col items-center">
        <Link
          href={item.href}
          className={`relative text-sm transition-all duration-300 text-nowrap
            ${isActive ? "text-primary" : "text-white hover:text-primary"} group`}
        >
          {item.label}
          {isActive ? (
            <span className="absolute left-1/2 -bottom-2 h-1.5 w-1.5 rounded-full bg-primary -translate-x-1/2" />
          ) : (
            <span
              className={`
                absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300
                group-hover:w-full
              `}
            />
          )}
        </Link>
      </div>
      {!isLast && <span className="h-4 w-px bg-white"></span>}
    </div>
  );
}
