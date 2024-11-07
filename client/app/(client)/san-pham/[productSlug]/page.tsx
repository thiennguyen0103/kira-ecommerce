"use server";

import ProductGallery from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Rating from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { convertVnd } from "@/lib/utils";
import { productService } from "@/services/product.service";
import { QueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon } from "lucide-react";
import LikeProducts from "../../_components/like-products";
import SimilarProducts from "../../_components/similar-products";

type ProductDetailProps = {
  params: {
    productSlug: string;
  };
};

const ProductDetail = async ({ params }: ProductDetailProps) => {
  const { productSlug } = params;
  const productImages = [
    { src: "/imgs/checkered-shirt.png", alt: "Test" },
    { src: "/imgs/skinny-jean.png", alt: "Test" },
    { src: "/imgs/striped-t-shirt.png", alt: "Test" },
    { src: "/imgs/t-shirt-tap.png", alt: "Test" },
    { src: "/imgs/t-shirt-tap.png", alt: "Test" },
  ];

  const queryClient = new QueryClient();

  const product = await queryClient.fetchQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      try {
        const response = await productService.getProductBySlug(productSlug);
        return response.data;
      } catch (error) {
        return null;
      }
    },
  });

  return (
    <>
      <div className="mb-8 space-y-4 md:mb-16">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:max-w-[600px]">
            <ProductGallery />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold uppercase md:text-4xl">
                {product?.name}
              </h1>
              <div className="flex gap-2">
                <Rating rating={product?.rating || 0} variant="yellow" />
                <div className="text-sm">
                  {product?.rating}/
                  <span className="text-muted-foreground">5</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-primary md:text-3xl">
                  {product?.price ? convertVnd(product?.price) : null}
                </div>
                <div className="h-full max-h-4 text-sm font-semibold text-red-500 line-through">
                  {product?.price ? convertVnd(product?.price) : null}
                </div>
                <Badge variant="destructive">-40%</Badge>
              </div>
              <div className="text-muted-foreground">
                {product?.description}
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <div className="flex">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-br-none rounded-tr-none"
                >
                  <MinusIcon />
                </Button>
                <Input
                  type="text"
                  inputMode="numeric"
                  defaultValue={1}
                  min={0}
                  className="w-16 rounded-none border-l-0 border-r-0 text-center focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-bl-none rounded-tl-none"
                >
                  <PlusIcon />
                </Button>
              </div>
              <Button className="flex-1">Thêm vào giỏ hàng</Button>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Implement comment UI */}
      <Separator />
      <SimilarProducts />
      <Separator />
      <LikeProducts />
    </>
  );
};

export default ProductDetail;
