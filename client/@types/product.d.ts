import { OrderEnum } from "@/enums/order.enum";

type Product = {
  id: stirng;
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
  rating: number;
  subcategory: Subcategory;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type ProductSortBy = "pop" | "ctime" | "sales" | "price";

type ProductQuery = {
  q?: string;
  c?: string;
  sortBy?: ProductSortBy;
  order?: OrderEnum;
} & PageOptions;
