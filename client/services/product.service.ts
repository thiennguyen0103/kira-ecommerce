import ApiClient from "@/configs/api-client";

export const productService = {
  getProductList: async (query: ProductQuery) => {
    const response = ApiClient.get<Product[]>("/product", query);
    return response;
  },
};
