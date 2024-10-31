import { StatusEnum } from "@/enums/status-enum";

type Order = {
  id: string;
  totalAmount: number;
  status: StatusEnum;
  user: User;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

type OrderItem = {
  id: string;
  product: Product;
  price: number;
  quantity: number;
};
