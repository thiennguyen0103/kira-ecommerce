import { create } from "zustand";

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

type AuthAction = {
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user,
    }),
}));
