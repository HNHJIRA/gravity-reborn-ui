import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { faqData } from "@/mock/faq-data";

export default function HomeFaq() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-4">
            <HeadingText title="Frequently Asked" highlight="Questions" />
            <ParagraphText
              text="Trusted in more than 100 countries and 4 million customers."
              size="xl"
              className="text-white"
            />
          </div>
          <div className="lg:w-1/2">
            <Accordion
              type="single"
              collapsible
              defaultValue="billing"
              className="max-w-lg"
            >
              {faqData.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
