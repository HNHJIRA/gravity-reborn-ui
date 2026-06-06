import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { HeadingText } from "../ui/text/heading-text";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ArticlesCard } from "../ui/cards/articles-card";
import { articles, articlesTabs } from "@/mock/heritage-blog";

const HeritageBlogArticle = () => {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper className="space-y-6">
          <div className="text-center space-y-2">
            <EyebrowText text="Latest Articles" align="center" />
            <HeadingText title="Stories" highlight="Insights" align="center" />
            <div className="flex justify-center gap-4 px-4">
              <Tabs
                defaultValue="ALL"
                className="w-full flex flex-col items-center"
              >
                <TabsList className="bg-transparent w-full max-w-2xl flex justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto overflow-y-hidden no-scrollbar">
                  {articlesTabs.map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      className="whitespace-nowrap data-[state=active]:bg-gradient-gold data-[state=active]:text-black px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs tracking-widest rounded-none transition-all duration-300"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.map((art, i) => (
              <ArticlesCard
                key={i}
                img={art.img}
                cat={art.cat}
                date={art.date}
                read={art.read}
                title={art.title}
              />
            ))}
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default HeritageBlogArticle;
