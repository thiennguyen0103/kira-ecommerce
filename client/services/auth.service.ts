import { AuthResponse, LoginPayload, RegisterPayload } from "@/@types/auth";
import ApiClient from "@/configs/api-client";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = ApiClient.post<AuthResponse>(
      "/v1/auth/email/login",
      payload,
    );

    return response;
  },
  register: async (payload: RegisterPayload) => {
    const response = ApiClient.post<AuthResponse>(
      "/v1/auth/email/register",
      payload,
    );

    return response;
  },
};
