import { Button } from "../ui/button";
import { InfoBadgeCard } from "../ui/cards/info-badge-card";
import { ParagraphText } from "../ui/text/paragraph-text";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { HeadingText } from "../ui/text/heading-text";
import { EyebrowText } from "../ui/text/eye-brow-text";
import { scheduleData } from "@/mock/schedule-data";

export default function HomeSchedule() {
  return (
    <SectionWrapper>
      <div
        className="absolute inset-0 bg-cover bg-top opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("/images/home/schedule/bg-schedule.webp")',
        }}
      />
      <div className="container mx-auto px-6 relative z-10 space-y-10">
        <div className="text-center space-y-6">
          <EyebrowText text="Begin Your Journey" align="center" />
          <HeadingText
            title="Schedule Your Private"
            highlight="Consultation"
            align="center"
          />
          <ParagraphText
            text="Experience the Maharaja difference with a complimentary one-on-one session
            with our style consultants. Let us help you find the perfect ensemble for your
            special day."
            size="md"
            className="max-w-lg mx-auto text-center"
          />
        </div>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 max-w-4xl mx-auto">
          {scheduleData.map((item) => {
            const IconComponent = item.Icon;
            return (
              <InfoBadgeCard
                key={item.id}
                Icon={IconComponent}
                value={item.value}
                label={item.label}
              />
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button variant="gold" size="md" className="px-6 h-12 text-sm">
            Book an Appointment
          </Button>
          <Button variant="secondary" size="md" className="px-6 h-12 text-sm">
            Virtual Consultation
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
