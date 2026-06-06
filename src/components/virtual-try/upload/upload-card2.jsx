import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import Image from "next/image";

const UploadCard2 = ({ garments, selectedGarment, onSelectGarment }) => {
  return (
    <>
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full text-xs text-primary ">
            2
          </span>
          <HeadingText
            title="Select an Outfit"
            size="sm"
            className="text-2xl!"
          />
        </div>

        {garments.length === 0 ? (
          <div className="aspect-4/5 border border-zinc-800 flex items-center justify-center p-8 text-center">
            <ParagraphText text="No garments available yet." size="sm" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {garments.map((item) => {
              const isSelected = selectedGarment?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectGarment(item)}
                  className={`relative group overflow-hidden cursor-pointer aspect-square border-2 transition-all duration-300 ${
                    isSelected ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className={`object-cover transition-all duration-500 ${isSelected ? "opacity-100 scale-105" : "opacity-60 group-hover:scale-110"}`}
                    />
                  </div>
                  <div className="absolute inset-0 p-2 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <ParagraphText
                      text={item.title}
                      size="lg"
                      className="text-white font-cormorant leading-tight"
                    />
                    <ParagraphText
                      text={item.category}
                      size="sm"
                      className="text-primary text-[10px] uppercase tracking-widest"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-black" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadCard2;
