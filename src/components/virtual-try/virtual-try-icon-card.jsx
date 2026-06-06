import { InfoBadgeCard } from "../ui/cards/info-badge-card";
import { featuresData } from "@/mock/virtual-try-data";

const VirtualTryIconCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuresData.map((item) => {
          const IconComponent = item.Icon;
          return (
            <InfoBadgeCard
              key={item.id}
              Icon={IconComponent}
              value={item.title}
              label={item.desc}
            />
          );
        })}
      </div>
    </>
  );
};

export default VirtualTryIconCard;
