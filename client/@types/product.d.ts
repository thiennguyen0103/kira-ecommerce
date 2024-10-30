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

type ProductQuery = {
  search?: string;
};
