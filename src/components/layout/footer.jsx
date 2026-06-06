import { Link } from "@tanstack/react-router";
import { footerMenu, socialIcons, websiteInfo } from "@/mock/navigation-menu";
import { ParagraphText } from "../ui/text/paragraph-text";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { Separator } from "../ui/separator";
import { FooterSocialIcons } from "./footer/footer-social-icons";
import { FooterItems } from "./footer/footer-items";

export default function Footer() {
  return (
    <>
      <footer className="py-16">
        <ContainerWrapper>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
            <div className="space-y-10">
              <Link to={websiteInfo.link} className="shrink-0">
                <img
                  src={websiteInfo.logo}
                  alt={websiteInfo.alt}
                  width={150}
                  height={150}
                  priority
                />
              </Link>

              <ParagraphText text={websiteInfo.description} />
              <FooterSocialIcons data={socialIcons} />
            </div>
            <FooterItems data={footerMenu.collection} title="Collections" />
            <FooterItems data={footerMenu.services} title="Services" />
            <FooterItems data={footerMenu.company} title="Company" />
          </div>
          <Separator className="my-10 bg-muted-foreground" />
          <div className="text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center">
            <ParagraphText text="&copy; 2026 VictorDesign. All rights reserved." />
            <div className="flex gap-6">
              <Link to="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </ContainerWrapper>
      </footer>
    </>
  );
}
