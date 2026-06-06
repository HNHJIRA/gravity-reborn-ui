import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function HomeCarousel() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="grid grid-cols-2 gap-4 p-2">
              <Image
                src="/images/home/carousel/carousel1.webp"
                alt="Carousel Image 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
              />
              <Image
                src="/images/home/carousel/carousel2.webp"
                alt="Carousel Image 2"
                width={300}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
