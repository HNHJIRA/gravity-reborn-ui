import { Link } from "@tanstack/react-router";
import { websiteInfo } from "@/mock/navigation-menu";

export function NavbarLogo() {
  return (
    <Link to={websiteInfo.link} className="shrink-0 relative z-50">
      <img
        src={websiteInfo.logo}
        alt={websiteInfo.alt}
        width={150}
        height={150}
        priority
        className="w-32 md:w-40"
      />
    </Link>
  );
}
