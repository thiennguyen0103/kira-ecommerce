import { Product, ProductQuery } from "@/@types/product";
import ApiClient from "@/configs/api-client";

export const productService = {
  getProductList: async (query?: ProductQuery) => {
    const response = ApiClient.get<DataList<Product>>("/product", query);
    return response;
  },
  getProductBySlug: async (slug: string) => {
    const response = ApiClient.get<Product>(`/product/${slug}`);
    return response;
  },
};
