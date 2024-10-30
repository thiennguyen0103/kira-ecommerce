"use client";

import ProductCard from "@/components/card/product-card";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const NewArrivals = () => {
  return (
    <Section title="Sản phẩm mới">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button
          variant="outline"
          className="w-full rounded-full px-14 sm:w-fit"
        >
          <Link href={"/"}>View All</Link>
        </Button>
      </div>
    </Section>
  );
};

export default NewArrivals;
