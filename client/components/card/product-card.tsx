import { Product } from "@/@types/product";
import { convertVnd } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type ProductCardProps = {
  product?: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/san-pham/${product?.slug}`}
      className="relative block rounded-xl bg-[#fafafa]"
    >
      {/* Badge */}
      <Badge className="absolute left-2 top-2 bg-red-500 font-bold text-white">
        Hot
      </Badge>
      {/* Image thumb */}
      <div className="flex h-[200px] w-full items-center justify-center">
        <Image
          src="https://theme.hstatic.net/1000197303/1001046599/14/slideshow_1.jpg?v=9956"
          alt="banner"
          height={1080}
          width={1920}
          className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
        />
      </div>
      {/* Product details */}
      <div className="flex flex-col justify-between gap-3 p-4">
        <div className="space-y-2">
          {/* Category */}
          <span className="block text-xs font-bold uppercase text-muted-foreground">
            {product?.subcategory.name}
          </span>
          {/* Product name */}
          <h4 className="line-clamp-2 h-10 text-ellipsis font-bold uppercase leading-5 duration-300 hover:text-primary">
            {product?.name}
          </h4>
        </div>
        {/* Product detail bottom */}
        <div>
          <div className="flex flex-col">
            <small className="h-full max-h-4 text-xs font-semibold text-red-500 line-through">
              {product?.price ? convertVnd(product.price) : null}
            </small>
            <small className="text-lg font-bold text-primary">
              {product?.price ? convertVnd(product.price) : null}
            </small>
          </div>
          <div className="flex items-center justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Icons.heart className="block cursor-pointer text-[#e1e1e1] duration-300 hover:text-red-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yêu thích</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Icons.cart className="h-8! w-8! cursor-pointer text-[#e1e1e1] duration-300 hover:text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Thêm vào giỏ hàng</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
