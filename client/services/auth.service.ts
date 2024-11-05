import { Auth, LoginPayload, RegisterPayload } from "@/@types/auth";
import ApiClient from "@/configs/api-client";
import { deleteCookie } from "cookies-next";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = ApiClient.post<Auth>("/auth/login", payload);
    return response;
  },
  register: async (payload: RegisterPayload) => {
    const response = ApiClient.post<Auth>("/auth/register", payload);
    return response;
  },
  me: async () => {
    const response = ApiClient.get<User>("/auth/me");
    return response;
  },
  logout: async () => {
    const response = await ApiClient.post("/auth/logout").then(() => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    });
    return response;
  },
};
