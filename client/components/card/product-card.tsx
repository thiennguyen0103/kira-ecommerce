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
      {/* <div className="absolute left-0 top-5 bg-red-500 px-2.5 py-1 text-sm font-bold text-white">
        Hot
      </div> */}
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
      <div className="p-[30px]">
        {/* Category */}
        <span className="mb-[18px] block text-xs font-bold uppercase text-[#ccc]">
          Áo Thun
        </span>
        {/* Product name */}
        <h4>
          <Link
            href={"/"}
            className="mb-[18px] line-clamp-2 text-ellipsis font-bold uppercase text-[#363636] duration-300 hover:text-primary"
          >
            Áo thun phong cách
          </Link>
        </h4>
        <p className="line-clamp-3 text-ellipsis">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam labore
          doloremque, dicta debitis quis facilis fugit! Numquam, tenetur libero?
          Repellendus eum ut obcaecati temporibus, illum numquam libero sit
          molestiae rerum?
        </p>
        {/* Product detail bottom */}
        <div className="flex flex-col gap-2 border-t-[#eee] pt-5">
          <div className="flex flex-col gap-1 text-[18px]">
            <small className="text-[80%] font-semibold text-red-500 line-through">
              {convertVnd(200000)}
            </small>
            <small className="text-[18px] font-bold text-primary">
              {convertVnd(180000)}
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
