import ApiClient from "@/configs/api-client";

export const categoryService = {
  getCategories: async () => {
    const response = ApiClient.get<Category[]>("/category");
    return response;
  },
};
