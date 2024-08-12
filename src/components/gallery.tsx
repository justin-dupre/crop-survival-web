"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export type IImage = {
  url: string;
};
interface GalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <Carousel
      className="w-[75vw] max-w-lg"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={`${image.url}-${index}`}>
            <div className="flex items-center justify-center p-1">
              <Image
                src={image.url}
                alt="Image"
                width={0}
                height={0}
                sizes="(max-width: 100%)"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                className="aspect-video rounded-md object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="invisible md:visible">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default Gallery;
