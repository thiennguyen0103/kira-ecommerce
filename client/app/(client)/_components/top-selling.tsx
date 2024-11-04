"use server";

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
import { productService } from "@/services/product.service";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";

const TopSelling = async () => {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["get-jobs"],
    queryFn: async () => {
      try {
        const response = await productService.getProductList({
          sortBy: "ctime",
        });
        return response.data;
      } catch (error) {}
    },
  });

  return (
    <Section title="Sản phẩm mới">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        autoplay={true}
        autoplayInterval={3000}
      >
        <CarouselContent>
          {data?.data.map((product) => (
            <CarouselItem
              key={product.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
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

export default TopSelling;
