"use client";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser } = useAuthStore();
  const router = useRouter();

  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await authService.me();
        setUser(response.data);
        if (!response.data) {
          router.push("/login");
        }
        return response.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  return <>{children}</>;
}
