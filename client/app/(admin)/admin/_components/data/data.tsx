import { Order } from "@/@types/order";
import { Icons } from "@/components/icons";
import { StatusEnum } from "@/enums/status-enum";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const orderStatus = [
  {
    label: "Đã thanh toán",
    value: StatusEnum.Success,
    icon: Icons.success,
  },
  {
    label: "Thất bại",
    value: StatusEnum.Failed,
    icon: Icons.failed,
  },
  {
    label: "Chờ thanh toán",
    value: StatusEnum.Pending,
    icon: Icons.awaiting,
  },
];

export const data: Order[] = [
  {
    id: "order_001",
    totalAmount: 1200000,
    status: StatusEnum.Success,
    user: {
      id: "user_001",
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://example.com/avatar/johndoe.png",
      isActive: true,
      role: {
        id: "role_001",
        name: "Customer",
      },
      createdAt: "2024-10-31T03:05:06.624Z",
      updatedAt: "2024-10-31T03:05:06.624Z",
      deletedAt: null,
    },
    items: [
      {
        id: "item_001",
        product: {
          id: "product_001",
          name: "Product A",
          description: "High-quality product A",
          image: "https://example.com/products/product_a.png",
          slug: "product-a",
          price: 300000,
          rating: 4.5,
          subcategory: {
            id: "subcat_001",
            name: "Category A",
            description: "Description for category A",
            image: "https://example.com/categories/cat_a.png",
            slug: "category-a",
          },
          isDelete: false,
          createdAt: "2024-10-31T03:05:06.624Z",
          updatedAt: "2024-10-31T03:05:06.624Z",
          deletedAt: null,
        },
        price: 300000,
        quantity: 4,
      },
    ],
    createdAt: "2024-10-31T03:05:06.624Z",
    updatedAt: "2024-10-31T03:05:06.624Z",
  },
  {
    id: "order_002",
    totalAmount: 500000,
    status: StatusEnum.Pending,
    user: {
      id: "user_002",
      name: "Jane Smith",
      email: "janesmith@example.com",
      image: "https://example.com/avatar/janesmith.png",
      isActive: true,
      role: {
        id: "role_002",
        name: "Customer",
      },
      createdAt: "2024-10-31T03:05:06.624Z",
      updatedAt: "2024-10-31T03:05:06.624Z",
      deletedAt: null,
    },
    items: [
      {
        id: "item_002",
        product: {
          id: "product_002",
          name: "Product B",
          description: "High-quality product B",
          image: "https://example.com/products/product_b.png",
          slug: "product-b",
          price: 250000,
          rating: 4.0,
          subcategory: {
            id: "subcat_002",
            name: "Category B",
            description: "Description for category B",
            image: "https://example.com/categories/cat_b.png",
            slug: "category-b",
          },
          isDelete: false,
          createdAt: "2024-10-31T03:05:06.624Z",
          updatedAt: "2024-10-31T03:05:06.624Z",
          deletedAt: null,
        },
        price: 250000,
        quantity: 2,
      },
    ],
    createdAt: "2024-10-31T03:05:06.624Z",
    updatedAt: "2024-10-31T03:05:06.624Z",
  },
];
