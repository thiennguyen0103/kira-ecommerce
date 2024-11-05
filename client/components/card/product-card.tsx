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
    <div className="relative rounded-xl bg-[#fafafa]">
      {/* Badge */}
      <Badge className="absolute left-2 top-2 bg-red-500 font-bold text-white">
        Hot
      </Badge>
      {/* Image thumb */}
      <div className="flex h-[300px] items-center justify-center">
        <Image
          src="https://theme.hstatic.net/1000197303/1001046599/14/slideshow_1.jpg?v=9956"
          alt="banner"
          height={1080}
          width={1920}
          className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
        />
      </div>
      {/* Product details */}
      <div className="h-[270px] p-[30px]">
        {/* Category */}
        <span className="mb-4 block text-xs font-bold uppercase text-[#ccc]">
          {product?.subcategory.name}
        </span>
        {/* Product name */}
        <h4>
          <Link
            href={"/"}
            className="mb-4 line-clamp-2 text-ellipsis font-bold uppercase text-[#363636] duration-300 hover:text-primary"
          >
            {product?.name}
          </Link>
        </h4>
        <p className="line-clamp-2 text-ellipsis text-sm text-muted-foreground">
          {product?.description}
        </p>
        {/* Product detail bottom */}
        <div className="flex flex-col gap-2 border-t-[#eee] pt-4">
          <div className="flex flex-col gap-1 text-[18px]">
            {/* <small className="text-[80%] font-semibold text-red-500 line-through">
              {product?.price ? convertVnd(product.price) : null}
            </small> */}
            <small className="text-[18px] font-bold text-primary">
              {product?.price ? convertVnd(product.price) : null}
            </small>
          </div>
          <div className="flex items-center justify-end gap-4">
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
                    <Icons.cart className="cursor-pointer text-[#e1e1e1] duration-300 hover:text-primary" />
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
    </div>
  );
};

export default ProductCard;
