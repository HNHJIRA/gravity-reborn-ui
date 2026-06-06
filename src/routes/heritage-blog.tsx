import { createFileRoute } from "@tanstack/react-router";
import HeritageBlogArticle from "@/components/heritage-blog/heritage-blog-article";
import HeritageBlogFeatured from "@/components/heritage-blog/heritage-blog-featured";
import HomeSchedule from "@/components/home/home-schedule";
import BgBanner from "@/components/ui/banner/bg-banner";

export const Route = createFileRoute("/heritage-blog")({
  head: () => ({
    meta: [
      { title: "Heritage Blog — Royal Attire" },
      { name: "description", content: "Stories of craft, culture and timeless elegance." },
    ],
  }),
  component: HeritageBlog,
});

function HeritageBlog() {
  return (
    <>
      <BgBanner
        imageUrl="/images/banner/banner-shop.webp"
        eyebrow="EXCLUSIVE EXPERIENCE"
        title="Heritage "
        highlight="Bloge"
        description="Stories Of Craft, Culture Timeless Elegance"
      />
      <HeritageBlogFeatured />
      <HeritageBlogArticle />
      <HomeSchedule />
    </>
  );
}
