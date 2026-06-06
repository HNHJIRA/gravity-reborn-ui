import Link from "next/link";
import Image from "next/image";
import { websiteInfo } from "@/mock/navigation-menu";

export function NavbarLogo() {
  return (
    <Link href={websiteInfo.link} className="shrink-0 relative z-50">
      <Image
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
